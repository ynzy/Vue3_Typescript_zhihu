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
