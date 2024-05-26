// packages / index.js

import Gukki_FormPuls from './src'

// 以数组的结构保存组件，便于遍历
// 将导入的组件放入一个数组 components 中，便于后续遍历注册。
const components = [Gukki_FormPuls]
// 定义 install 方法
const install = (app: any) => {
  if ((install as any).installed) return
  ;(install as any).installed = true
  // 遍历并注册全局组件
  components.map((component) => {
    // 遍历 components 数组，并使用 Vue.component 方法将每个组件注册为全局组件。
    app.component(component.name, component)
  })
}

// 这段代码用于在直接通过 <script> 标签引入插件时自动安装。
// 它检查 window 对象是否存在，并且 window.Vue 是否存在，
// 如果存在就调用 install 方法。
if (typeof window !== 'undefined' && (window as any).Vue) {
  install((window as any).Vue)
}

export default {
  // 导出的对象必须具备一个 install 方法
  install,
  // 组件列表
  ...components
}
// 导出一个包含 install 方法和组件列表的对象。
//这样可以在 Vue 项目中通过 Vue.use 方法安装插件。
