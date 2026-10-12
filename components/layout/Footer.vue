<script setup lang="ts">
import { business, track } from '~/utils/business'
const { c } = useCopy()
const lp = useLocalePath()
const links = computed(() => [
  ['collections', c('المجموعات', 'Collections')],
  ['brands', c('علاماتنا', 'Our brands')],
  ['about', c('من نحن', 'About us')],
  ['visit', c('زورونا', 'Visit us')],
  ['contact', c('تواصل معنا', 'Contact')]
])
</script>
<template>
  <footer class="site-footer">
    <div class="container">
      <div class="footer-main">
        <div class="footer-identity">
          <NuxtLink :to="lp('/')" class="footer-logo"><img src="/brand/logo-parent-burgundy.svg" width="144" height="72" :alt="c('شركة كلاس التجارية', 'Clas Trading Co.')" loading="lazy"/></NuxtLink>
          <h2>{{c('صغارهم. فرصتك الكبيرة.', 'Little outfits. Big possibilities.')}}</h2>
          <p>{{c('ملابس أطفال بالجملة منذ ٢٠١٨. ثلاث علامات خاصة بنا، من جدة إلى جميع أنحاء المملكة.', 'Children’s clothing wholesale since 2018. Three brands of our own, from Jeddah to businesses across Saudi Arabia.')}}</p>
        </div>
        <div class="footer-office">
          <h3>{{c('مكتبنا في جدة', 'Our Jeddah office')}}</h3>
          <address>{{c('البلد، باب شريف', 'Al-Balad, Bab Sharif')}}<br/>{{c('جدة، المملكة العربية السعودية', 'Jeddah, Saudi Arabia')}}<span class="footer-short-address">{{c('العنوان المختصر', 'Short address')}} <b dir="ltr">JACA6636</b></span></address>
          <a class="footer-direction" :href="business.maps" target="_blank" rel="noopener noreferrer" @click="track('directions_click')"><UiIcon name="map"/>{{c('الاتجاهات إلى المكتب', 'Get directions')}}</a>
        </div>
        <div class="footer-contact">
          <h3>{{c('تواصل معنا', 'Contact us')}}</h3>
          <a class="footer-detail" :href="'tel:+'+business.digits" @click="track('call_click')"><UiIcon name="phone"/><span><small>{{c('الهاتف', 'Phone')}}</small><b dir="ltr">{{business.phone}}</b></span></a>
          <a class="footer-detail" :href="'mailto:'+business.email"><UiIcon name="email"/><span><small>{{c('البريد الإلكتروني', 'Email')}}</small><b dir="ltr">{{business.email}}</b></span></a>
        </div>
        <div class="footer-social-hours">
          <h3>{{c('ساعات العمل', 'Office hours')}}</h3>
          <p class="footer-hours">{{c('السبت – الخميس', 'Saturday – Thursday')}}<strong>{{c('١٠ صباحاً – ٨ مساءً', '10 AM – 8 PM')}}</strong><span>{{c('الجمعة مغلق', 'Closed Friday')}}</span></p>
          <a class="footer-instagram" :href="business.instagram" target="_blank" rel="noopener noreferrer" :aria-label="c('تابع كلاس على إنستغرام', 'Follow Clas on Instagram')"><UiIcon name="instagram"/><span dir="ltr">@clastradingco</span></a>
        </div>
      </div>
      <nav class="footer-navigation" :aria-label="c('روابط أسفل الصفحة', 'Footer navigation')"><NuxtLink v-for="[path,label] in links" :key="path" :to="lp('/'+path)">{{label}}</NuxtLink><NuxtLink :to="lp('/faq')">{{c('الأسئلة الشائعة', 'FAQ')}}</NuxtLink></nav>
      <div class="footer-legal"><span>{{c('© 2026 شركة كلاس التجارية. جميع الحقوق محفوظة.', '© 2026 Clas Trading Co. All rights reserved.')}}</span><NuxtLink :to="lp('/privacy')">{{c('سياسة الخصوصية', 'Privacy policy')}}</NuxtLink></div>
    </div>
  </footer>
</template>
