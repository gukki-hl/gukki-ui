<template>
  <el-input-number
    v-bind="$attrs"
    v-model="val"
    style="width: 100%"
    @blur="props.blur ? props.blur($event) : false"
    @focus="props.focus ? props.focus($event) : false"
    @change="(a: any, b: any) => (props.change ? props.change(a, b) : false)"
  ></el-input-number>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
const emit = defineEmits(['updata:modelValue'])
const props = defineProps({
  modelValue: {
    type: Number,
    default: () => Number
  },
  blur: {
    type: Function,
    default: () => () => {}
  },
  focus: {
    type: Function,
    default: () => () => {}
  },
  change: {
    type: Function,
    default: () => () => {}
  }
})
const val = computed({
  get() {
    return props.modelValue
  },
  set(newVal) {
    emit('updata:modelValue', newVal)
  }
})
</script>

<style lang="scss" scoped></style>
