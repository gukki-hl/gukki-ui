<template>
  <el-select
    v-model="val"
    v-bind="$attrs"
    style="width: 100%"
    @change="props.change ? props.change($event) : false"
    @visible-change="props.visibleChange ? props.visibleChange($event) : false"
    @remove-tag="props.removeTag ? props.removeTag($event) : false"
    @clear="props.clear ? props.clear() : false"
    @blur="props.blur ? props.blur($event) : false"
    @focus="props.focus ? props.focus($event) : false"
  >
    <el-option
      v-for="item in options"
      :key="item[valueFiled]"
      :label="item[labelFiled]"
      :value="item[valueFiled]"
    ></el-option>
  </el-select>
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue'
const emit = defineEmits(['update:modelVale'])
const props = defineProps({
  modelValue: {
    type: [String, Array],
    default: () => ''
  },
  options: {
    type: Array,
    default: () => []
  },
  valueFiled: {
    type: String,
    default: 'value'
  },
  labelFiled: {
    type: String,
    default: 'label'
  },
  change: {
    type: Function,
    default: () => () => {}
  },
  visibleChange: {
    type: Function,
    default: () => () => {}
  },
  removeTag: {
    type: Function,
    default: () => () => {}
  },
  clear: {
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
const val = ref(props.modelValue)

watch(
  () => props.modelValue,
  (newValue) => {
    val.value = newValue
    emit('update:modelVale', newValue)
  }
)
</script>

<style lang="scss" scoped></style>
