<template>
  <div class="container" style="width: 90%; margin: 0 auto; padding-bottom: 30px">
    <vue3-gukki-from
      :formData="formData"
      :formColumns="formColumns"
      :fromRules="fromRules"
      label-width="120px"
      ref="baseForm"
    >
      <template v-slot:baseTitle>
        <h1>基于 Element-plus 封装的表单组件</h1>
      </template>
      <!-- 操作按钮 -->
      <template v-slot:Actions>
        <div style="text-align: center">
          <el-button type="primary" @click="onSubmit(baseForm)">提交</el-button>
          <el-button @click="handlerRest">重置</el-button>
        </div>
      </template>
    </vue3-gukki-from>
  </div>
</template>

<script lang="ts" setup>
import { reactive, onMounted, ref } from 'vue'
import { ElMessage, type FormInstance, type FormRules } from 'element-plus'
import type { FormColumnsType, FormDataType } from './type/index.ts'
import {
  jobsList,
  departmentList,
  provinces,
  cityGdList,
  cityHnList,
  predefineColors,
  areaOpts,
  predefineTrees,
  permissionsItem
} from './data.ts'
import useEmail from './hooks/email/useEmail.ts'
import { useTreeTraversal } from './hooks/tree/useTreeTraversal'
const { childKeys, traverseTree } = useTreeTraversal()
import { useTreeVirtualTraversal } from './hooks/tree/useTreeVirtualTraversal'
const { treeV2Data } = useTreeVirtualTraversal()
import { useTransferData } from './hooks/transfer/useTransfer'
const { transferData } = useTransferData()

const baseForm = ref<FormInstance | null>(null)
console.log('base', baseForm.value)


// 显式指定返回的对象类型
type UseEmailReturnType = {
  querySearch: (queryString: string, cb: (results: { value: string }[]) => void) => void
}
// 使用显式指定的类型
const { querySearch }: UseEmailReturnType = useEmail()

//省市联动  根据省份设置城市选项
// 定义一个类型安全的映射对象：
const cityOptions: { [key: string]: { value: string; label: string }[] } = {
  guangdong: cityGdList,
  hunan: cityHnList
}

function changeCity(val: string | number) {
  formData.city = ''
  const cityColumns = formColumns.find((el) => el.prop === 'city')
  if (cityColumns) {
    cityColumns.options = cityOptions[val]
  }
}

// 勾选权限菜单
function checkRoles(node: string | number, data: string | number) {
  console.log("勾选权限菜单",node, data)
}

// 虚拟列表模拟数据
const initials = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j']
const selectV2Options = Array.from({ length: 1000 }).map((_, idx) => ({
  value: `Option ${idx + 1}`,
  label: `${initials[idx % 10]}${idx}`
}))
const onSubmit = async (formEl: FormInstance | undefined) => {
  console.log("formEl是這個",formEl);
  
  if (!formEl) return
  formEl.formRef.validate((valid: boolean) => {
    if (!valid) return
    console.log(formData);
    ElMessage({
      message: "请到控制台查看数据",
      type: "success",
    });
  })
}

const handlerRest = () => {
  if (baseForm.value) {
    baseForm.value.formRef.resetFields()
    formData.permissionsMenu = permissionsItem
    const permissionsMenuColumn = formColumns.find((el) => el.prop === 'permissionsMenu')
    if (permissionsMenuColumn) {
      permissionsMenuColumn.defaultCheckedKeys = childKeys.value
    }
  }
}
const formData = reactive<FormDataType>({
  userName: '王四',
  email: '843348394@qq.com',
  age: 18,
  jobs: 'FrontEndEngineer',
  department: ['hr', 'manager'],
  province: 'guangdong',
  city: 'zhanjiang',
  birthday: '2022-01-01',
  birthTime: new Date(2022, 12, 31, 9, 40, 32),
  getupTime: '09:00',
  sex: '0',
  officeArea: ['guangdong'],
  openService: false,
  loveColor: 'rgba(250, 212, 0, 1)',
  scoresRange: [20, 80],
  rate: 5,
  hometown: ['guangdong', 'shenzhen'],
  virtualList: [],
  treeSelect: ['home', 'log'],
  permissionsMenu: permissionsItem,
  treeSelectV2: [],
  transfer: [5],
  remark: '为中华之崛起而读书'
})

//表单配置项
const formColumns = reactive<FormColumnsType[]>([
  {
    slotName: 'baseTitle'
  },
  {
    slotName: 'Actions'
  },
  {
    xType: 'Input',
    label: '姓名',
    prop: 'userName',
    clearable: true,
    span: 8
  },
  {
    xType: 'Autocomplete',
    label: '邮箱',
    prop: 'email',
    span: 8,
    //获取输入建议的方法
    'fetch-suggestions': querySearch
  },

  {
    xType: 'InputNumber',
    label: '年龄',
    prop: 'age',
    min: 1,
    max: 120,
    'controls-position': 'right',
    step: 2,
    span: 8
  },
  {
    xType: 'Select',
    label: '岗位',
    prop: 'jobs',
    span: 8,
    options: jobsList
  },
  {
    xType: 'Select',
    label: '部门',
    prop: 'department',
    span: 8,
    // 是否可以清空选项
    clearable: true,
    placeholder: '请选择部门',
    valueFiled: 'id',
    labelFiled: 'name',
    effect: 'light',
    // 是否多选
    multiple: true,
    // 多选时是否将选中值按文字的形式展示
    'collapse-tags': true,
    options: departmentList
  },
  {
    xType: 'Select',
    label: '地区',
    prop: 'province',
    span: 5,
    options: provinces,
    change: changeCity
  },
  {
    xType: 'Select',
    prop: 'city',
    label: '-',
    span: 3,
    formItemOpts: {
      labelWidth: '30px'
    },
    options: []
  },
  {
    xType: 'DatePicker',
    label: '出生日期',
    type: 'date',
    prop: 'birthday',
    span: 8
  },
  {
    xType: 'TimePicker',
    label: '出生时间',
    prop: 'birthTime',
    placeholder: '请选择时间',
    span: 8
  },
  {
    xType: 'TimeSelect',
    label: '起床时间',
    prop: 'getupTime',
    placeholder: '请选择时间',
    start: '08:30',
    step: '00:15',
    end: '18:30',
    span: 8
  },
  {
    xType: 'Radio',
    label: '性别',
    prop: 'sex',
    span: 8,
    options: [
      {
        value: '0',
        label: '男'
      },
      {
        value: '1',
        label: '女'
      }
    ]
  },
  {
    xType: 'Checkbox',
    label: '办公地区',
    prop: 'officeArea',
    span: 8,
    options: provinces
  },
  {
    xType: 'Switch',
    label: '开启服务',
    prop: 'openService',
    span: 8,
    'active-color': '#13ce66',
    'inactive-color': '#ff4949',
    'active-text': '是',
    'inactive-text': '否',
    'inline-prompt': true
  },
  {
    xType: 'ColorPicker',
    label: '喜欢的颜色',
    prop: 'loveColor',
    'show-alpha': true,
    predefine: predefineColors,
    span: 8
  },
  {
    xType: 'Slider',
    label: '分数范围',
    prop: 'scoresRange',
    range: true,
    'show-stops': true,
    max: 100,
    step: 10,
    span: 8
  },
  {
    xType: 'Rate',
    label: '评分',
    prop: 'rate',
    'show-text': true,
    texts: ['非常不好', '不好', '一般', '好', '非常好'],
    colors: ['#99A9BF', '#F7BA2A', '#FF9900'],
    span: 8
  },
  {
    xType: 'Cascader',
    label: '家乡',
    prop: 'hometown',
    options: areaOpts,
    props: {
      //次级菜单的展开方式
      expandTrigger: 'hover'
    },
    span: 8
  },
  {
    xType: 'SelectV2',
    label: '虚拟列表',
    prop: 'virtualList',
    span: 8,
    filterable: true,
    multiple: true,
    placeholder: '请选择',
    'multiple-limit': 3,
    options: selectV2Options
  },
  {
    xType: 'TreeSelect',
    label: '树形选择',
    prop: 'treeSelect',
    placeholder: '请选择',
    multiple: true,
    data: predefineTrees,
    'show-checkbox': true,
    'node-key': 'id',
    span: 8
  },
  {
    xType: 'Tree',
    label: '树形控件',
    prop: 'permissionsMenu',
    data: predefineTrees,
    'show-checkbox': true,
    'node-key': 'id',
    check: checkRoles,
    span: 8,
    defaultCheckedKeys: []
  },
  {
    xType: 'TreeV2',
    label: '虚拟树形控件',
    prop: 'treeSelectV2',
    data: treeV2Data,
    'show-checkbox': true,
    'node-key': 'id',
    span: 8
  },
  {
    xType: 'Transfer',
    label: '穿梭框',
    prop: 'transfer',
    // 是否可搜索
    filterable: true,
    'left-default-checked': [2, 3],
    'right-default-checked': [1],
    titles: ['Source', 'Target'],
    'button-texts': ['To left', 'To right'],
    format: {
      noChecked: '${total}',
      hasChecked: '${checked}/${total}'
    },
    data: transferData.value, // 在这里解除引用
    style: 'display: flex',
    span: 24
  },
  {
    xType: 'Input',
    label: '备注',
    prop: 'remark',
    clearable: true,
    type: 'textarea',
    rows: 4,
    maxlength: 200,
    'show-word-limit': true,
    span: 24
  }
])
//表单验证规则
const fromRules = reactive<FormRules>({
  userName: [
    { required: true, message: '请输入名字', trigger: 'blur' },
    { min: 2, max: 5, message: '名字长度在2-5个字', trigger: 'blur' }
  ],
  email: [
    {
      type: 'email',
      message: '请输入正确的邮箱格式',
      trigger: ['blur', 'change']
    }
  ],
  department: [
    {
      required: true,
      message: '请选择部门',
      trigger: 'change'
    }
  ]
})

onMounted(() => {
  // 初始化  省级联动
  const cityColumns = formColumns.find((el) => el.prop === 'city')
  if (cityColumns) {
    cityColumns.options = cityOptions[formData.province]
  }
  // 权限菜单回显
  traverseTree(formData.permissionsMenu)
  // 在这里初始化树形控件的默认选中项
  //选中有子节点的父节点
  //  permissionsMenu
  const permissionsMenuColumn = formColumns.find((el) => el.prop === 'permissionsMenu')

  if (permissionsMenuColumn) {
    permissionsMenuColumn.defaultCheckedKeys = childKeys.value
  }
})
</script>

<style lang="scss" scoped>
:deep .el-transfer__buttons {
  display: flex;
  align-items: center;
}

:deep .el-rate__item {
  display: flex;
}
</style>
