<script setup lang="ts">
import products from '~/content/products.json'
const props=defineProps<{brand:any}>()
const {ar,c}=useCopy();const lp=useLocalePath()
const image=computed(()=>products.find(p=>p.brand===props.brand.slug&&p.image)?.image)
</script>
<template><NuxtLink :to="lp('/brands/'+brand.slug)" class="brand-editorial reveal"><div class="brand-editorial-photo" :style="{background:brand.color}"><img v-if="image" :src="image" :alt="c('تشكيلات '+brand.name,brand.name+' clothing collection')" width="620" height="760" loading="lazy"/><div v-else class="brand-typographic" aria-hidden="true">{{brand.name}}</div><span class="brand-photo-label">{{brand.slug==='lamees'?c('إحدى علامات كلاس','PART OF THE CLAS FAMILY'):c('تشكيلة توضيحية','ILLUSTRATIVE COLLECTION')}}</span></div><div class="brand-editorial-copy"><img class="brand-editorial-logo" :src="brand.logo" :alt="brand.name" width="220" height="90" loading="lazy"/><h3>{{brand.tagline[ar?'ar':'en']}}</h3><p>{{c('مولود · S–M–L · ٢–٥ سنوات · ٦–١٢ سنة','Born Baby · S–M–L · 2–5 years · 6–12 years')}}</p><span class="brand-explore">{{c('اكتشف العلامة','Explore the brand')}}</span></div></NuxtLink></template>
