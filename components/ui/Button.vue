<script setup lang="ts">withDefaults(defineProps<{to?:string;href?:string;variant?:string}>(),{variant:'primary'})
</script>
<template><NuxtLink v-if="to" :to="to" :class="['button','button-'+variant]"><slot/></NuxtLink><a v-else-if="href" :href="href" :class="['button','button-'+variant]"><slot/></a><button v-else :class="['button','button-'+variant]"><slot/></button></template>
