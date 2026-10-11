export type AnalyticsConsent = 'accepted' | 'declined' | null
export const useConsent = () => {
  const consent = useState<AnalyticsConsent>('analytics-consent', () => null)
  const ready = useState('analytics-consent-ready', () => false)
  const initialize = () => {
    if (!import.meta.client || ready.value) return
    try {
      const stored = localStorage.getItem('clas-analytics-consent')
      if (stored === 'accepted' || stored === 'declined') consent.value = stored
    } catch { /* Browsers may disable storage. Consent remains session-only. */ }
    ready.value = true
  }
  const setConsent = (value: Exclude<AnalyticsConsent, null>) => {
    consent.value = value
    if (import.meta.client) {
      try { localStorage.setItem('clas-analytics-consent', value) } catch { /* session-only */ }
      window.dispatchEvent(new CustomEvent('clas:consent', { detail: value }))
    }
  }
  return { consent, ready, initialize, accept: () => setConsent('accepted'), decline: () => setConsent('declined'), setConsent }
}
