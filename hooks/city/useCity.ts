// import app from '@/App.vue'
// const { formColumns, formData } = toRefs(app)

// import { cityGdList, cityHnList } from '@/data'

// import { toRefs, reactive } from 'vue'


// export default function useChangeCity() {
//   function changeCity(val: string | number) {
//     // 使用 reactive 创建一个 formData 的响应式副本
//     const updateFormData = reactive({ ...formData.value })
//     // formData.value.city = ''
//     // 更新副本中的城市值
//     updateFormData.city = ''
//     // 使用 Vue.set 或者赋值语法确保更新被追踪
//     formColumns.value.find((el: any) => el.prop === 'city').options = {
//       guangdong: cityGdList,
//       hunan: cityHnList
//     }[val]
//     // 将更新后的 formData 赋值回原始的 formData
//     Object.assign(formData, updateFormData)
//   }
//   return { changeCity }
// }
