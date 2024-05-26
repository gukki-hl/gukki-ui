import { ref } from 'vue'

//穿梭框数据 -->
interface Option {
  key: number
  label: string
  disabled: boolean
}

export function useTransferData() {
  const generateData = (): Option[] => {
    const data: Option[] = []
    for (let i = 1; i <= 15; i++) {
      data.push({
        key: i,
        label: `列表 ${i}`,
        disabled: i % 4 === 0
      })
    }
    return data
  }
  const transferData = ref(generateData())

  return { transferData, generateData }
}
