<template>
  <el-autocomplete
    v-bind="$attrs"
    v-model="val"
    style="width: 100%"
    @select="props.select ? props.select($event) : false"
    @change="props.change ? props.change($event) : false"
  />
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue'
const emit = defineEmits(['update:modelValue'])
const props = defineProps({
  modelValue: {
    type: String,
    default: () => ''
  },
  select: {
    type: Function,
    default: () => () => {}
  },
  change: {
    type: Function,
    default: () => () => {}
  }
})
const val = ref(props.modelValue)
//监听父组件的值
watch(
  () => props.modelValue,
  () => {
    val.value = props.modelValue
  }
)
//通过emit将值传递给父组件
emit('update:modelValue', val)
</script>

<style lang="scss" scoped></style>
