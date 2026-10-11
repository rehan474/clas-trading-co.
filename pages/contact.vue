<script setup lang="ts">
import { business, whatsapp, track } from '~/utils/business'
const { c } = useCopy()
const { locale } = useI18n()
const localePath = useLocalePath()
usePageSeo('تواصل معنا لطلبات الجملة', 'Contact us for wholesale orders')
const key = String(useRuntimeConfig().public.turnstileSiteKey || '')
const form = reactive({ name: '', phone: '', email: '', subject: 'wholesale', message: '', website: '' })
const token = ref(''), pending = ref(false), error = ref(''), success = ref(false)
const challenge = ref<HTMLElement>()
let widget: string | undefined
let script: HTMLScriptElement | undefined
let destroyed = false
const turnstile = () => (window as unknown as { turnstile?: { render: (el: HTMLElement, options: Record<string, unknown>) => string; remove: (id: string) => void; reset: (id: string) => void } }).turnstile
onMounted(() => {
  if (!key) return
  const render = () => {
    if (destroyed || !challenge.value || !turnstile()) return
    widget = turnstile()!.render(challenge.value, { sitekey: key, language: locale.value, callback: (value: string) => { token.value = value }, 'expired-callback': () => { token.value = '' }, 'error-callback': () => { token.value = ''; error.value = c('تعذر تحميل التحقق. استخدم واتساب أو حاول مجدداً.', 'Verification could not load. Use WhatsApp or try again.') } })
  }
  if (turnstile()) render()
  else {
    script = document.createElement('script')
    script.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit'
    script.async = true
    script.onload = render
    script.onerror = () => { error.value = c('تعذر تحميل التحقق. تواصل معنا عبر واتساب.', 'Verification could not load. Please contact us on WhatsApp.') }
    document.head.appendChild(script)
  }
})
onBeforeUnmount(() => { destroyed = true; if (widget) turnstile()?.remove(widget); script?.remove() })
async function submit() {
  error.value = ''; success.value = false
  if (!token.value) { error.value = c('أكمل التحقق أولاً.', 'Please complete verification first.'); return }
  pending.value = true
  try {
    await $fetch('/api/contact', { method: 'POST', body: { ...form, turnstileToken: token.value, locale: locale.value } })
    success.value = true
    form.message = ''
    track('form_submit')
  } catch {
    error.value = c('لم يتم إرسال الرسالة. تحقق من البيانات أو تواصل معنا عبر واتساب.', 'Your message was not sent. Check your details or contact us on WhatsApp.')
  } finally {
    pending.value = false; token.value = ''; if (widget) turnstile()?.reset(widget)
  }
}

</script>
<template><div class="container section" style="padding-top:0"><UiBreadcrumbs :title="c('تواصل معنا','Contact')"/><div class="page-intro"><span class="eyebrow">{{c('للتجار وطلبات الجملة','FOR RETAILERS & BULK ORDERS')}}</span><h1>{{c('لنبدأ طلبك القادم.','Let’s plan your next order.')}}</h1><p>{{c('أرسل الفئات والكميات المطلوبة، وسنساعدك في التشكيلة وعرض السعر. الأسعار خاصة حسب الطلب.','Tell us the categories and quantities you need. We’ll help with the selection and a private wholesale quote.')}}</p></div><UiToast :message="success?c('تم إرسال رسالتك بنجاح','Your enquiry was sent successfully'):''"/><div class="contact-grid"><div><p v-if="!key" class="notice" role="status">{{c('نموذج البريد غير متاح حالياً حتى يتم إعداد خدمة الإرسال والتحقق. للاستفسار تواصل عبر واتساب أو البريد أدناه.','The email form is unavailable until delivery and verification are configured. Please enquire through WhatsApp or the email below.')}}</p><form v-else @submit.prevent="submit"><div class="form-grid"><label for="name">{{c('الاسم','Name')}}<input id="name" v-model="form.name" name="name" autocomplete="name" required minlength="2" maxlength="100"/></label><label for="phone">{{c('الهاتف / واتساب','Phone / WhatsApp')}}<input id="phone" v-model="form.phone" name="phone" type="tel" autocomplete="tel" required minlength="7" maxlength="30" pattern="[+0-9 ()\-]+" dir="ltr"/></label><label for="email">{{c('البريد الإلكتروني (اختياري)','Email (optional)')}}<input id="email" v-model="form.email" name="email" type="email" autocomplete="email" maxlength="254" dir="ltr"/></label><label for="subject">{{c('الموضوع','Subject')}}<select id="subject" v-model="form.subject" name="subject"><option value="wholesale">{{c('طلب جملة','Wholesale enquiry')}}</option><option value="product">{{c('استفسار عن منتج','Product enquiry')}}</option><option value="visit">{{c('زيارة المكتب','Office visit')}}</option><option value="other">{{c('أخرى','Other')}}</option></select></label><label for="message" class="full">{{c('الرسالة','Message')}}<textarea id="message" v-model="form.message" name="message" required minlength="10" maxlength="4000" rows="6"/></label><label class="honeypot" aria-hidden="true">Website<input v-model="form.website" name="website" tabindex="-1" autocomplete="off"/></label><div ref="challenge" class="full"/><p class="full" style="font-size:13px">{{c('تستخدم بياناتك للرد على استفسارك فقط. يرجى عدم إرسال بيانات حساسة.','We use your details to respond to your enquiry. Please do not send sensitive information.')}} <NuxtLink :to="localePath('/privacy')" class="text-link">{{c('سياسة الخصوصية','Privacy policy')}}</NuxtLink></p><p v-if="error" class="full form-error" role="alert">{{error}}</p><p v-if="success" class="full notice" role="status">{{c('تم إرسال رسالتك بنجاح. شكراً لتواصلك معنا.','Your message was sent successfully. Thank you for getting in touch.')}}</p><button class="button button-primary" :disabled="pending || !token">{{pending ? c('جارٍ الإرسال…','Sending…') : c('إرسال الاستفسار','Send enquiry')}}</button></div></form></div><aside class="contact-aside"><h2>{{c('تواصل مباشرة','Let’s talk')}}</h2><a :href="whatsapp()" class="button button-whatsapp" @click="track('whatsapp_click')">{{c('واتساب لطلبات الجملة','WhatsApp for wholesale')}} ↗</a><a href="tel:+966553100383" dir="ltr" @click="track('call_click')">+966 55 310 0383</a><a href="mailto:clasintl676@gmail.com">clasintl676@gmail.com</a><a href="https://www.instagram.com/clastradingco/" target="_blank" rel="noopener">@clastradingco ↗</a><p>{{c('البلد، باب شريف، جدة — JACA6636','Al-Balad, Bab Sharif, Jeddah — JACA6636')}}</p><p>{{c('السبت – الخميس: ١٠ صباحاً – ٨ مساءً. الجمعة مغلق.','Saturday–Thursday: 10 AM–8 PM. Closed Friday.')}}</p><a :href="business.maps" class="text-link" @click="track('directions_click')">{{c('الاتجاهات إلى المكتب','Directions to the office')}} ↗</a><p>{{c('مرحباً بالزيارة دون موعد لعرض العينات. نوفر التوصيل لجميع أنحاء السعودية والاستلام من جدة.','Walk in to view samples without an appointment. Delivery across Saudi Arabia and collection in Jeddah are available.')}}</p></aside></div></div></template>
