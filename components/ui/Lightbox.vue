<script setup lang="ts">
const props=defineProps<{src:string;alt:string;open:boolean}>();const emit=defineEmits(['close']);const dialog=ref<HTMLDialogElement>();const {c}=useCopy();watch(()=>props.open,async value=>{await nextTick();if(value)dialog.value?.showModal();else dialog.value?.close()});

</script><template><dialog ref="dialog" class="lightbox-dialog" @cancel="$emit('close')" @click="($event.target===dialog)&&$emit('close')"><button class="button" @click="$emit('close')">{{c('إغلاق ×','Close ×')}}</button><img :src="src" :alt="alt"/></dialog></template>