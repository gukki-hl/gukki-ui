<template>
  <el-time-select
    v-model="Val"
    v-bind="$attrs"
    style="width: 100%"
    @change="props.change ? props.change($event) : false"
    @blur="props.blur ? props.blur($event) : false"
    @focus="props.focus ? props.focus($event) : false"
  ></el-time-select>
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue'
const emit = defineEmits(['update:modelValue'])
const props = defineProps({
  modelValue: {
    type: String,
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
  }
})

const Val = ref(props.modelValue)
//监听父组件的值
watch(
  () => props.modelValue,
  () => {
    Val.value = props.modelValue
  }
)

// 通过emit将值传递给父组件
emit('update:modelValue', Val)
</script>
