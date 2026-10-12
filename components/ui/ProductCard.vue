<script setup lang="ts">
const props = defineProps<{ product: any }>()
const { ar, c } = useCopy()
const lp = useLocalePath()
const selected = ref(0)
const images = computed<string[]>(() => props.product.gallery?.length ? props.product.gallery : [props.product.image].filter(Boolean))
</script>

<template>
  <article class="product-card reveal">
    <NuxtLink :to="lp('/collections/' + product.slug)" class="product-image" :class="{ 'has-model-photo': selected === 0 && product.modelImage }">
      <NuxtImg v-if="images.length" format="webp" :src="images[selected]" :alt="product.name[ar ? 'ar' : 'en'] + ' — ' + (selected === 0 && product.modelImage ? c('الإطلالة', 'Outfit view') : c('تفاصيل القطعة', 'Garment view'))" width="620" height="790" sizes="sm:45vw md:30vw lg:25vw" loading="lazy" />
    </NuxtLink>
    <div v-if="images.length > 1" class="product-image-dots" role="group" :aria-label="c('صور ' + product.name.ar, product.name.en + ' images')">
      <button v-for="(src, i) in images" :key="src" type="button" :class="{ active: selected === i }" :aria-pressed="selected === i" :aria-label="c('عرض الصورة ' + (i + 1), 'Show image ' + (i + 1))" @click="selected = i"><span /></button>
    </div>
    <h3><NuxtLink :to="lp('/collections/' + product.slug)">{{ product.name[ar ? 'ar' : 'en'] }}</NuxtLink></h3>
  </article>
</template>
