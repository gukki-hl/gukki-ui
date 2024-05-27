export interface FormColumnsType {
  slotName?: string
  xType?: string
  label?: string
  prop?: string
  props?: object
  span?: number
  offset?: number
  clearable?: boolean
  defaultCheckedKeys?: string[]
  'fetch-suggestions'?: (queryString: string, cb: (results: { value: string }[]) => void) => void
  min?: number
  max?: number
  'controls-position'?: string
  placeholder?: string
  valueFiled?: string
  labelFiled?: string
  effect?: string
  multiple?: boolean
  data?: any[]
  check?: (node: string | number, data: string | number) => void
  'show-checkbox'?: boolean
  'node-key'?: string
  range?: boolean
  'show-stops'?: boolean
  'collapse-tags'?: boolean
  'show-text'?: boolean
  'multiple-limit'?: number
  filterable?: boolean
  texts?: string[]
  colors?: string[]
  options?: any[]
  change?: (val: string | number) => void //添加 change 函数类型
  formItemOpts?: {
    labelWidth?: string
  }
  type?: string
  start?: string
  step?: string | number
  end?: string
  'active-color'?: string
  'inactive-color'?: string
  'active-text'?: string
  'inactive-text'?: string
  'inline-prompt'?: boolean
  'show-alpha'?: boolean
  predefine?: any[]
  rows?: number // 新增属性
  maxlength?: number // 新增属性
  'show-word-limit'?: boolean // 新增属性
  'left-default-checked'?: number[]
  'right-default-checked'?:number[]
  titles?:string[]
  'button-texts'?:string[]
  format?:object
  style?:string
  
}

export interface FormDataType {
  [key: string]: any
}
export interface FormRulessType {
  [key: string]: any
}
