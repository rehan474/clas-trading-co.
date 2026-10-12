<script setup lang="ts">
import { business, track } from '~/utils/business'
const { ar, c } = useCopy()
const source = computed(() => `https://maps.google.com/maps?q=${business.lat},${business.lng}&z=17&hl=${ar.value ? 'ar' : 'en'}&output=embed`)
</script>
<template>
  <div class="office-map">
    <iframe :src="source" :title="c('موقع شركة كلاس التجارية في باب شريف، جدة','Clas Trading Co. location in Bab Sharif, Jeddah')" width="640" height="460" loading="lazy" referrerpolicy="no-referrer-when-downgrade" />
    <a class="office-map-link" :href="business.maps" target="_blank" rel="noopener noreferrer" @click="track('directions_click')"><UiIcon name="map"/><span>{{c('افتح الموقع في Google Maps','Open location in Google Maps')}}</span></a>
  </div>
</template>
