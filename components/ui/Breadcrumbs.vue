<script setup lang="ts">defineProps<{title:string}>();const lp=useLocalePath();const {c}=useCopy()
</script><template><div class="breadcrumbs"><NuxtLink :to="lp('/')">{{c('الرئيسية','Home')}}</NuxtLink><span>/</span><span>{{title}}</span></div></template>
