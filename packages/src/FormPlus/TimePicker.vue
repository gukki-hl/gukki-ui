<template>
  <el-time-picker
    v-model="val"
    v-bind="$attrs"
    style="width: 100%"
    @change="props.change ? props.change($event) : false"
    @blur="props.blur ? props.blur($event) : false"
    @focus="props.focus ? props.focus($event) : false"
    @visible-change="props.visibleChange ? props.visibleChange($event) : false"
  ></el-time-picker>
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue'
const emit = defineEmits(['update:modelValue'])
const props = defineProps({
  modelValue: {
    type: [Array, String, Date],
    default: () => ''
  },
  change: {
    type: Function,
    default: () => () => {}
  },
  blur: {
    type: Function,
    default: () => () => {}
  },
  focus: {
    type: Function,
    default: () => () => {}
  },
  visibleChange: {
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

// 通过emit将值传递给父组件
emit('update:modelValue', val)
</script>

<style lang="scss" scoped></style>
