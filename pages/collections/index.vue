<script setup lang="ts">
import products from '~/content/products.json'
const { c } = useCopy()
usePageSeo('المجموعات بالجملة', 'Wholesale collections')
</script>
<template>
  <div class="container section page-content">
    <UiBreadcrumbs :title="c('المجموعات','Collections')" />
    <div class="page-intro">
      <span class="eyebrow">{{c('لأرفف محلك القادمة','FOR YOUR NEXT SEASON')}}</span>
      <h1>{{c('اكتشف المجموعات.','Discover the collections.')}}</h1>
      <p>{{c('ملابس أطفال بالجملة بفئات مولود، S–M–L، ٢–٥ سنوات و٦–١٢ سنة. الأسعار والتوفر والتعبئة عند الاستفسار.','Children’s clothing wholesale, Born Baby, S–M–L, 2–5 years and 6–12 years. Enquire for pricing, availability and packing.')}}</p>
    </div>
    <div class="product-grid"><UiProductCard v-for="p in products" :key="p.slug" :product="p" /></div>
  </div>
</template>
