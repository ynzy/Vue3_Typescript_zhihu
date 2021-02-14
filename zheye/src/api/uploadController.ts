import request from '@/utils/request'
import { awaitWrap } from '@/utils/index.ts'
import { ILogin } from './index'

/**
 * 上传文件
 * @param {} file
 */

export const upload = (url: string, data: FormData) => {
  return awaitWrap(
    request({
      url, //: `/upload`
      method: 'post',
      data,
      headers: {
        'Content-Type': 'multipart/form-data'
      },
      loading: true
    })
  )
}
