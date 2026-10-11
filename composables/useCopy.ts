export function useCopy(){const {locale}=useI18n();const ar=computed(()=>locale.value==='ar');const c=(a:string,e:string)=>ar.value?a:e;return {ar,c}}
