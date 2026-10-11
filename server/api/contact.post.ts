import { z } from 'zod'

const submission = z.object({
  name: z.string().trim().min(2).max(100),
  phone: z.string().trim().min(7).max(30).regex(/^[+\d\s()-]+$/),
  email: z.union([z.literal(''), z.string().trim().email().max(254)]).optional(),
  subject: z.enum(['product', 'visit', 'wholesale', 'other']),
  message: z.string().trim().min(10).max(4000),
  website: z.string().max(200).optional().default(''),
  turnstileToken: z.string().min(1).max(2048),
  locale: z.enum(['ar', 'en']).default('ar'),
})
// Instance-local protection. Use a shared Redis/WAF limit before scaling horizontally.
const requests = new Map<string, { count: number; reset: number }>()
const escapeHtml = (value: string) => value.replace(/[&<>"']/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[char]!))

export default defineEventHandler(async (event) => {
  setResponseHeader(event, 'Cache-Control', 'no-store')
  const config = useRuntimeConfig()
  if (!config.resendApiKey || !config.turnstileSecretKey || !config.contactFrom) {
    throw createError({ statusCode: 503, statusMessage: 'Contact service is not configured. Please use WhatsApp.' })
  }
  const ip = getRequestIP(event, { xForwardedFor: false }) || 'unknown'
  const now = Date.now()
  if (requests.size > 10000) {
    for (const [key, value] of requests) if (value.reset < now) requests.delete(key)
    if (requests.size > 10000) throw createError({ statusCode: 503, statusMessage: 'Please try again later.' })
  }
  let bucket = requests.get(ip)
  if (!bucket || bucket.reset < now) bucket = { count: 0, reset: now + 15 * 60 * 1000 }
  bucket.count++
  requests.set(ip, bucket)
  if (bucket.count > 5) {
    setResponseHeader(event, 'Retry-After', Math.ceil((bucket.reset - now) / 1000))
    throw createError({ statusCode: 429, statusMessage: 'Too many requests. Please try again later.' })
  }
  const raw = await readBody(event)
  const result = submission.safeParse(raw)
  if (!result.success) throw createError({ statusCode: 400, statusMessage: 'Please check the contact fields.' })
  const data = result.data
  if (data.website) throw createError({ statusCode: 400, statusMessage: 'Unable to submit this request.' })
  let verification: { success: boolean; hostname?: string }
  try {
    verification = await $fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
      method: 'POST', body: new URLSearchParams({ secret: String(config.turnstileSecretKey), response: data.turnstileToken }), timeout: 10000,
    })
  } catch {
    throw createError({ statusCode: 503, statusMessage: 'Verification is temporarily unavailable.' })
  }
  if (!verification.success || (config.turnstileHostname && verification.hostname !== config.turnstileHostname)) {
    throw createError({ statusCode: 400, statusMessage: 'Please complete the verification again.' })
  }
  const details = [ ['Name', data.name], ['Phone', data.phone], ['Email', data.email || 'Not provided'], ['Subject', data.subject], ['Language', data.locale], ['Message', data.message] ]
  try {
    await $fetch('https://api.resend.com/emails', {
      method: 'POST', timeout: 15000,
      headers: { Authorization: `Bearer ${config.resendApiKey}` },
      body: {
        from: String(config.contactFrom), to: [String(config.contactTo || 'clasintl676@gmail.com')],
        ...(data.email ? { reply_to: data.email } : {}),
        subject: `Clas Trading Co. — ${data.subject} enquiry`,
        text: details.map(([key, value]) => `${key}: ${value}`).join('\n\n'),
        html: details.map(([key, value]) => `<p><strong>${key}:</strong><br>${escapeHtml(value).replace(/\n/g, '<br>')}</p>`).join(''),
      },
    })
  } catch {
    throw createError({ statusCode: 502, statusMessage: 'Message delivery failed. Please use WhatsApp or try again.' })
  }
  return { success: true }
})
