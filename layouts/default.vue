<template><div><a class="skip" href="#main">{{ $i18n.locale==='ar'?'انتقل إلى المحتوى':'Skip to content' }}</a><LayoutHeader/><main id="main"><slot/></main><LayoutFooter/><LayoutCookieConsent/><UiStickyMobileActionBar/><a class="floating-wa" :href="whatsapp()" aria-label="WhatsApp" @click="track('whatsapp_click')">↗ <span>WhatsApp</span></a></div></template>
<script setup lang="ts">import {whatsapp,track} from '~/utils/business'
</script>
