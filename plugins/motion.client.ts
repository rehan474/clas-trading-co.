export default defineNuxtPlugin(async(nuxtApp)=>{
 if(matchMedia('(prefers-reduced-motion: reduce)').matches||(navigator as any).connection?.saveData)return
 const [{default:Lenis},{gsap},{ScrollTrigger}]=await Promise.all([import('lenis'),import('gsap'),import('gsap/ScrollTrigger')]);gsap.registerPlugin(ScrollTrigger)
 const lenis=new Lenis({duration:1.1,smoothWheel:true,anchors:true});lenis.on('scroll',ScrollTrigger.update);const tick=(time:number)=>lenis.raf(time*1000);gsap.ticker.add(tick);gsap.ticker.lagSmoothing(0)
 let context:ReturnType<typeof gsap.context>|undefined
 const animate=()=>{context?.revert();context=gsap.context(()=>{gsap.utils.toArray<HTMLElement>('.reveal').forEach(el=>gsap.from(el,{opacity:0,y:25,rotateX:3,duration:.75,ease:'power2.out',scrollTrigger:{trigger:el,start:'top 94%',once:true}}))});ScrollTrigger.refresh()}
 nuxtApp.hook('page:finish',()=>{if(!nuxtApp.isHydrating){lenis.resize();animate()}});nuxtApp.hook('app:mounted',()=>{animate()})
 nuxtApp.vueApp.onUnmount(()=>{context?.revert();gsap.ticker.remove(tick);lenis.destroy()})
})
