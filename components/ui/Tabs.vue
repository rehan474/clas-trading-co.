<script setup lang="ts">defineProps<{items:string[];modelValue:string}>();defineEmits(['update:modelValue'])
</script><template><div class="tabs" role="group"><button v-for="item in items" :key="item" :aria-pressed="modelValue===item" :class="{active:modelValue===item}" @click="$emit('update:modelValue',item)">{{item}}</button></div></template>
