<script setup lang="ts">
import posts from '~/content/blog.json'
const route=useRoute();const {ar,c}=useCopy();const lp=useLocalePath()
const post=posts.find(p=>p.slug===route.params.slug&&p.status==='published')
if(!post)throw createError({statusCode:404,statusMessage:'Article not found'})
usePageSeo(post.title.ar,post.title.en)
const related=posts.filter(p=>p.status==='published'&&p.slug!==post.slug)
useHead(()=>({script:[{type:'application/ld+json',innerHTML:JSON.stringify({'@context':'https://schema.org','@type':'Article',headline:post.title[ar.value?'ar':'en'],datePublished:post.date,author:{'@type':'Organization',name:'Clas Trading Co.'},publisher:{'@type':'Organization',name:'Clas Trading Co.'},inLanguage:ar.value?'ar-SA':'en-SA',mainEntityOfPage:'https://clastradingcompany.com'+route.path})}]}))

</script>
<template>
<div class="container section page-content">
<UiBreadcrumbs :title="post.title[ar?'ar':'en']"/>
<header class="page-intro"><NuxtLink class="eyebrow" :to="lp('/blog')">{{c('المدونة','Journal')}}</NuxtLink><h1>{{post.title[ar?'ar':'en']}}</h1><p>{{post.author}} · <time :datetime="post.date">{{post.date}}</time> · {{post.readingTime}} {{c('دقائق قراءة','min read')}}</p></header>
<article class="prose"><section v-for="section in post.body[ar?'ar':'en']" :key="section.heading"><h2>{{section.heading}}</h2><p>{{section.text}}</p></section></article>
<section class="section"><UiSectionHeader :title="c('مقالات ذات صلة','Related reading')"/><div class="blog-grid"><article v-for="item in related" :key="item.slug" class="blog-card"><h2><NuxtLink :to="lp('/blog/'+item.slug)">{{item.title[ar?'ar':'en']}}</NuxtLink></h2><NuxtLink class="text-link" :to="lp('/blog/'+item.slug)">{{c('اقرأ المقال','Read article')}}</NuxtLink></article></div></section>
</div>
</template>
