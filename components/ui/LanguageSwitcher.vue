<script setup lang="ts">const switchLocale=useSwitchLocalePath();const {ar}=useCopy()
</script>
<template><NuxtLink class="language" :to="switchLocale(ar?'en':'ar')" :aria-label="ar?'Switch to English':'التبديل إلى العربية'">{{ar?'EN':'العربية'}}</NuxtLink></template>
