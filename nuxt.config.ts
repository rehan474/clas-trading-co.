export default defineNuxtConfig({
 compatibilityDate:'2025-05-01', devtools:{enabled:false},
 modules:['@nuxtjs/i18n','@nuxtjs/tailwindcss','@pinia/nuxt','@nuxt/content','@nuxt/image','@nuxtjs/seo','nuxt-security','@vueuse/motion/nuxt'],
 css:['~/assets/css/main.css'],
 vue:{compilerOptions:{isCustomElement:(tag)=>tag.startsWith('Tres')&&tag!=='TresCanvas'}},
 content:{experimental:{sqliteConnector:'native'}},
 site:{url:'https://clastradingcompany.com',name:'Clas Trading Co.',defaultLocale:'ar-SA'},
 i18n:{baseUrl:'https://clastradingcompany.com',defaultLocale:'ar',strategy:'prefix',detectBrowserLanguage:false,langDir:'.',locales:[{code:'ar',language:'ar-SA',file:'ar.json',dir:'rtl'},{code:'en',language:'en-SA',file:'en.json',dir:'ltr'}]},
 runtimeConfig:{resendApiKey:'',turnstileSecretKey:'',turnstileHostname:'',contactTo:'clasintl676@gmail.com',contactFrom:'',public:{turnstileSiteKey:'',ga4Id:'',clarityId:''}},
 app:{head:{link:[{rel:'icon',href:'/brand/favicon.svg'},{rel:'preconnect',href:'https://fonts.googleapis.com'},{rel:'preconnect',href:'https://fonts.gstatic.com',crossorigin:''},{rel:'stylesheet',href:'https://fonts.googleapis.com/css2?family=IBM+Plex+Sans+Arabic:wght@400;500;600;700&family=Nunito:wght@400;500;600;700;800&family=Poppins:wght@400;500;600;700&display=swap'}]},pageTransition:{name:'page',mode:'out-in'}},
 routeRules:{'/':{redirect:'/ar'},'/api/**':{prerender:false}},
 nitro:{prerender:{crawlLinks:true,failOnError:true,routes:['/ar','/en']}},
 image:{format:['avif','webp']},
 security:{headers:{contentSecurityPolicy:{'default-src':["'self'"],'img-src':["'self'",'data:','https:'],'script-src':["'self'","'unsafe-inline'",'https://challenges.cloudflare.com','https://www.googletagmanager.com','https://www.clarity.ms'],'style-src':["'self'","'unsafe-inline'",'https://fonts.googleapis.com'],'font-src':["'self'",'https://fonts.gstatic.com'],'connect-src':["'self'",'https://*.google-analytics.com','https://*.clarity.ms'],'frame-src':['https://maps.google.com','https://www.google.com','https://challenges.cloudflare.com'],'worker-src':["'self'",'blob:']},permissionsPolicy:{camera:[],microphone:[],geolocation:[]}}},
 ogImage:{enabled:false}, linkChecker:{enabled:false}, typescript:{strict:true}
})
