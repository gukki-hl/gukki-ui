<template>
  <el-checkbox-group
    v-model="val"
    v-bind="$attrs"
    style="width: 100%"
    @change="props.change ? props.change($event) : false"
  >
    <template v-if="props.type === 'button'">
      <el-checkbox-button
        v-for="item in options"
        :key="item[valueFiled]"
        :label="item[valueFiled]"
        >{{ item[labelFiled] }}</el-checkbox-button
      >
    </template>
    <template v-else>
      <el-checkbox
        v-for="item in options"
        :key="item[valueFiled]"
        :label="item[valueFiled]"
        :border="props.type === 'border'"
        >{{ item[labelFiled] }}</el-checkbox
      >
    </template>
  </el-checkbox-group>
</template>

<script lang="ts" setup>
import { ref, watch, onMounted } from 'vue'

interface Option {
  [key: string]: any
  value: string | number | boolean
  label: string
}

const emit = defineEmits(['update:modelValue'])
const props = defineProps({
    // 现在 modelValue 的类型是一个数组 (string | number | boolean)[]，
    // 因为 el-checkbox-group 的值应该是一个数组。
  modelValue: {
    type: Array as () => (string | number | boolean)[],
    default: () => []
  },
  options: {
    type: Array as () => Option[],
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
  type: {
    type: String,
    default: ''
  },
  change: {
    type: Function,
    default: () => () => {}
  }
})
const val = ref<(string | number | boolean)[]>(props.modelValue)


// 初始化时将 v-model 的默认值设置为 options.value[0]
// 如果 props.modelValue 为空且 props.options 有值，val.value 应该是一个包含 props.options[0][props.valueFiled] 的数组。
onMounted(() => {
  if (props.modelValue.length === 0 && props.options.length > 0) {
    val.value = [props.options[0][props.valueFiled]]
    emit('update:modelValue', val.value)
  }
})
// 监听父组件的值
// 监听内部值变化并通过 emit 将值传递给父组件

// 监听父组件的值
watch(
  () => props.modelValue,
  (newVal) => {
    val.value = newVal
  }
)

// 监听 val 的变化，并通过 emit 将值传递给父组件
watch(val, (newVal) => {
  emit('update:modelValue', newVal)
})

</script>

<style lang="scss" scoped></style>
