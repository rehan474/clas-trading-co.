<script setup lang="ts">
defineProps<{name: 'whatsapp' | 'instagram' | 'phone' | 'email' | 'map'}>()
</script>
<template><svg class="ui-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">
<template v-if="name==='whatsapp'"><path d="M20.5 11.7a8.5 8.5 0 0 1-12.6 7.5L3 20.5l1.3-4.8A8.5 8.5 0 1 1 20.5 11.7Z"/><path d="M8.1 7.2c.3-.2.7-.2.9.2l1 2c.1.3 0 .5-.3.8l-.6.7c.7 1.5 1.9 2.7 3.5 3.4l.8-1c.2-.3.5-.3.8-.2l2 1c.3.1.4.4.3.7-.2 1.3-1.1 2-2.3 1.9-3.8-.4-7.4-3.9-7.8-7.1-.1-1 .6-2 1.7-2.4Z"/></template>
<template v-else-if="name==='instagram'"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r=".7" fill="currentColor" stroke="none"/></template>
<path v-else-if="name==='phone'" d="m8 3 3 5-2 2c1.2 2.3 2.7 3.8 5 5l2-2 5 3c0 3-1.5 5-4 5C10 20 4 14 3 7c0-2.5 2-4 5-4Z"/>
<template v-else-if="name==='email'"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m4 6 8 6 8-6"/></template>
<template v-else><path d="M19 10c0 5-7 11-7 11S5 15 5 10a7 7 0 1 1 14 0Z"/><circle cx="12" cy="10" r="2.5"/></template>
</svg></template>
