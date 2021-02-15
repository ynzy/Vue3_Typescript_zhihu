import { ColumnProps, ImageProps, UserProps } from '@/store'

/**
 * 生成裁剪oss图片
 * @param data
 * @param width
 * @param height
 * @param format
 */
export function generateFitUrl(data: ImageProps, width: number, height: number, format = ['m_pad']) {
  if (data && data.url) {
    const formatStr = format.reduce((prev, current) => {
      return current + ',' + prev
    }, '')
    data.fitUrl = data.url + `?x-oss-process=image/resize,${formatStr}h_${height},w_${width}`
  }
}

interface CheckCondition {
  format?: String[] // 格式
  size?: number // 大小
}
type ErrorType = 'size' | 'format' | null
/**
 * 上传图片前的检查
 * @param file 文件
 * @param condition 条件
 */
export function beforeUploadCheck(file: File, condition: CheckCondition) {
  const { format, size } = condition
  console.log(file)
  const isValIdFormat = format ? format.includes(file.type) : true
  const isValidSize = size ? file.size / 1024 / 1024 < size : true
  let error: ErrorType = null
  if (!isValIdFormat) {
    error = 'format'
  }
  if (!isValidSize) {
    error = 'size'
  }
  return {
    passed: isValIdFormat && isValidSize,
    error
  }
}

/**
 * 添加头像
 * @param data
 * @param width
 * @param height
 */
export function addColumnAvatar(data: ColumnProps | UserProps, width: number, height: number) {
  if (data.avatar) {
    generateFitUrl(data.avatar, width, height)
  } else {
    const parseCol = data as ColumnProps
    data.avatar = {
      fitUrl: require(parseCol.title ? '@/assets/column.jpg' : '@/assets/avatar.jpg')
    }
  }
}

/**
 * 对象转数组
 * @param obj
 */
// 添加泛型
export const objToArr = <T>(obj: { [key: string]: T }) => {
  return Object.keys(obj).map(key => obj[key])
}

/**
 * 数组转对象
 * @param arr
 */
// 添加泛型T
// <T extends {_id?:string}> 约束泛型，类型推导，保证有一个_id属性
export const arrToObj = <T extends { _id?: string }>(arr: Array<T>) => {
  return arr.reduce((prve, current) => {
    if (current._id) {
      prve[current._id] = current
    }
    return prve
  }, {} as { [key: string]: T }) // 类型断言，我知道它是个什么类型
}

/* interface TestProps {
  _id: string
  name: string
}

const testData: TestProps[] = [
  { _id: '1', name: 'a' },
  { _id: '2', name: 'b' }
]

const testData2: { [key: string]: TestProps } = {
  1: { _id: '1', name: 'a' },
  2: { _id: '2', name: 'b' }
}

const result = arrToObj(testData)
console.log(result)
const result2 = objToArr(testData2)
console.log(result2) */
