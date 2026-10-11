<script setup lang="ts">defineProps<{message:string}>()
</script><template><div v-if="message" class="toast" role="status">{{message}}</div></template>
