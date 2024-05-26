<template>
  <el-form :model="props.formData" :rules="props.fromRules" v-bind="$attrs" ref="formRef">
    <el-row>
      <el-col
        v-for="(columns, index) in props.formColumns"
        :key="index"
        :span="columns.span"
        :offset="columns.offset"
      >
        <template v-if="columns.slotName">
          <slot :name="columns.slotName"></slot>
        </template>
        <el-form-item :label="columns.label" :prop="columns.prop" v-bind="columns.formItemOpts">
          <component
            :is="componentsTypes[columns.xType]"
            v-bind="columns"
            v-model="props.formData[columns.prop] as string"
          ></component>
        </el-form-item>
      </el-col>
    </el-row>
  </el-form>
</template>

<script lang="ts">
export default {
  name: 'vue3-gukki-from'
}
</script>

<script lang="ts" setup>
import { defineProps, markRaw, onMounted, reactive, ref, type PropType } from 'vue'
import type { FormColumnsType, FormDataType, FormRulessType } from '../../../type'
import Input from './Input.vue'
import Autocomplete from './Autocomplete.vue' //// Autocomplete 自动补全输入框
import InputNumber from './InputNumber.vue' //数字输入框
import Select from './Select.vue'
import Switch from './Switch.vue' // Switch 开关
import DatePicker from './DatePicker.vue' //出生日期
import TimePicker from './TimePicker.vue' //出生时间
import TimeSelect from './TimeSelect.vue' //起床时间
import Radio from './Radio.vue'
import Checkbox from './Checkbox.vue'
import ColorPicker from './ColorPicker.vue'
import Slider from './Slider.vue'
import Rate from './Rate.vue'
import Cascader from './Cascader.vue'
import SelectV2 from './SelectV2.vue'
import TreeSelect from './TreeSelect.vue'
import Tree from './Tree.vue'
import TreeV2 from './TreeV2.vue'
import Transfer from './Transfer.vue'
import type { FormInstance } from 'element-plus'
const props = defineProps({
  //表单数据源
  formData: {
    type: Object as PropType<FormDataType>,
    default: () => reactive({})
  },
  //表单配置项
  formColumns: {
    type: Array as PropType<FormColumnsType[]>,
    default: () => []
  },
  //表单规则验证
  fromRules: {
    type: Object as PropType<FormRulessType>,
    default: () => {}
  }
})

//定义动态组件
const componentsTypes = markRaw({
  Input,
  Switch,
  Autocomplete,
  InputNumber,
  Select,
  DatePicker,
  TimePicker,
  TimeSelect,
  Radio,
  Checkbox,
  ColorPicker,
  Slider,
  Rate,
  Cascader,
  SelectV2,
  TreeSelect,
  Tree,
  TreeV2,
  Transfer
})

const formRef = ref<FormInstance>()

onMounted(() => {
  console.log(formRef.value)
})

defineExpose({ formRef })
</script>

<style lang="scss" scoped></style>
