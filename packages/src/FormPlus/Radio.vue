<template>
  <el-radio-group
    v-model="val"
    v-bind="$attrs"
    style="width: 100%"
    @change="props.change ? props.change($event) : false"
  >
    <template v-if="props.type === 'button'">
      <el-radio-button v-for="item in options" :key="item[valueFiled]" :label="item[valueFiled]"
        >{{ item[labelFiled] }}
      </el-radio-button>
    </template>
    <template v-else>
      <el-radio
        v-for="item in options"
        :key="item[valueFiled]"
        :label="item[valueFiled]"
        :border="props.type === 'border'"
        >{{ item[labelFiled] }}</el-radio
      >
    </template>
  </el-radio-group>
</template>

<script lang="ts" setup>
import { onMounted, ref, watch } from 'vue'

interface Option {
  [key: string]: any
  value: string | number | boolean
  label: string
}

const emit = defineEmits(['update:modelValue'])
const props = defineProps({
  modelValue: {
    type: [Number, String, Boolean],
    default: () => ''
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
const val = ref(props.modelValue)
// 初始化时将 v-model 的默认值设置为 options.value[0]
onMounted(() => {
  if (!props.modelValue && props.options.length > 0) {
    val.value = props.options[0][props.valueFiled]
    emit('update:modelValue', val.value)
  }
})
//监听父组件的值
watch(() => props.modelValue, () => {
  val.value = props.modelValue
})

// 通过emit将值传递给父组件
emit("update:modelValue", val)
</script>

<style lang="scss" scoped></style>
