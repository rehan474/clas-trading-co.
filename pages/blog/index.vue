<script setup lang="ts">
import posts from '~/content/blog.json'
const {ar,c}=useCopy();const lp=useLocalePath()
usePageSeo('المدونة','Journal')
const published=posts.filter(p=>p.status==='published')
const planned=posts.filter(p=>p.status==='planned')

</script>
<template>
<div class="container section">
<UiBreadcrumbs :title="c('المدونة','Journal')"/>
<div class="page-intro"><span class="eyebrow">{{c('أفكار لتجار الجملة','Ideas for wholesale buyers')}}</span><h1>{{c('دليل التشكيلات الصغيرة','A journal for little collections')}}</h1><p>{{c('إرشادات عملية للتخطيط للمقاسات والخامات والتشكيلات، من فريق كلاس التجارية.','Practical guidance on sizes, fabrics and assortment planning from Clas Trading Co.')}}</p></div>
<div class="blog-grid">
<article v-for="(post,i) in published" :key="post.slug" class="blog-card">
<NuxtLink :to="lp('/blog/'+post.slug)"><img :src="['/images/products/clean-white-eyelet-bodysuit.webp','/images/products/clean-cream-bow-set.webp','/images/products/clean-peach-moon-bodysuit.webp'][i%3]" :alt="post.title[ar?'ar':'en']" width="620" height="400" loading="lazy" style="width:100%;height:230px;object-fit:cover;border-radius:18px;margin-block-end:24px"/></NuxtLink><span class="eyebrow">0{{i+1}} · {{c('دليل الشراء','Buying guide')}}</span>
<h2><NuxtLink :to="lp('/blog/'+post.slug)">{{post.title[ar?'ar':'en']}}</NuxtLink></h2>
<p>{{post.excerpt?.[ar?'ar':'en']}}</p>
<p><time :datetime="post.date">{{post.date}}</time> · {{post.readingTime}} {{c('دقائق قراءة','min read')}}</p>
<NuxtLink class="text-link" :to="lp('/blog/'+post.slug)">{{c('اقرأ المقال','Read article')}} <span aria-hidden="true"></span></NuxtLink>
</article>
</div>
<section class="section"><UiSectionHeader :title="c('قريباً في المدونة','Coming to the journal')" :text="c('موضوعات قيد الإعداد.','Topics we are preparing.')"/><ul><li v-for="post in planned" :key="post.slug">{{post.title[ar?'ar':'en']}}</li></ul></section>
</div>
</template>
