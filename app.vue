<script setup lang="ts">
const {locale}=useI18n();useHead(()=>({htmlAttrs:{lang:locale.value==='ar'?'ar-SA':'en-SA',dir:locale.value==='ar'?'rtl':'ltr'}}))

</script>
<template><NuxtLayout><NuxtPage /></NuxtLayout></template>
