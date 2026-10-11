<script setup lang="ts">defineProps<{items:any[]}>();const {ar}=useCopy()
</script><template><div class="accordion"><details v-for="(item,i) in items" :key="i"><summary>{{item.question[ar?'ar':'en']}}<span>+</span></summary><p>{{item.answer[ar?'ar':'en']}}</p></details></div></template>
