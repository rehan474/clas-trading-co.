declare global {
  interface Window { dataLayer?: unknown[]; gtag?: (...args: unknown[]) => void; clarity?: ((...args: unknown[]) => void) & { q?: unknown[][] } }
}
export default defineNuxtPlugin((nuxtApp) => {
  const config = useRuntimeConfig().public
  const { consent, initialize } = useConsent()
  nuxtApp.hook('app:mounted', initialize)
  let loaded = false
  const addScript = (src: string) => {
    const script = document.createElement('script')
    script.async = true
    script.src = src
    document.head.appendChild(script)
  }
  const enable = () => {
    if (loaded || consent.value !== 'accepted') return
    loaded = true
    const gaId = String(config.ga4Id || '')
    const clarityId = String(config.clarityId || '')
    if (/^G-[A-Z0-9]+$/.test(gaId)) {
      window.dataLayer = window.dataLayer || []
      window.gtag = (...args) => window.dataLayer!.push(args)
      window.gtag('js', new Date())
      window.gtag('consent', 'default', { analytics_storage: 'granted', ad_storage: 'denied', ad_user_data: 'denied', ad_personalization: 'denied' })
      window.gtag('config', gaId, { send_page_view: false })
      addScript(`https://www.googletagmanager.com/gtag/js?id=${gaId}`)
    }
    if (/^[a-z0-9]+$/i.test(clarityId)) {
      const queue = ((...args: unknown[]) => { queue.q!.push(args) }) as NonNullable<Window['clarity']>
      queue.q = []
      window.clarity = window.clarity || queue
      addScript(`https://www.clarity.ms/tag/${clarityId}`)
    }
  }
  enable()
  watch(consent, (value, oldValue) => {
    if (value === 'accepted') enable()
    // Reload removes running vendor scripts after withdrawing consent.
    if (value === 'declined' && oldValue === 'accepted' && loaded) window.location.reload()
  })
  const track = (name: string, properties: Record<string, string | number> = {}) => {
    if (consent.value !== 'accepted') return
    window.gtag?.('event', name, properties)
    window.clarity?.('event', name)
  }
  const router = useRouter()
  router.afterEach((to) => track('page_view', { page_path: to.fullPath }))
  return { provide: { track } }
})
