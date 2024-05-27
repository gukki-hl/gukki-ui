/** 
 app.component 是 Vue 提供的方法，用于注册全局组件。
// Gukki_FormPuls.name 获取组件的名称，这样可以动态获取组件的名称，而不是硬编码。
// Gukki_FormPuls 是要注册的组件本身
*/
import GukkiForm from './FormPlus/main.vue'

GukkiForm.install = (app: any) => {
  app.component(GukkiForm.name, GukkiForm)
}

//默认导出
export default GukkiForm

// 优点
// 简化使用：全局注册后，可以在任何地方直接使用组件，而不需要每次都单独导入。
// 代码复用：通过 install 方法，组件可以方便地在多个项目中复用。
// 统一管理：全局注册的组件便于管理和维护，特别是在大型项目中。
