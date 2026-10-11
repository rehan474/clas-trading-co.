<script setup lang="ts">defineProps<{eyebrow?:string;title:string;text?:string}>()
</script><template><div class="section-heading"><span v-if="eyebrow" class="eyebrow">{{eyebrow}}</span><h2>{{title}}</h2><p v-if="text">{{text}}</p><slot/></div></template>
