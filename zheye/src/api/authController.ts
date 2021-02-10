import request from '@/utils/request'
import { awaitWrap } from '@/utils/index.ts'
import { ILogin } from './index'

/**
 * 登录
 * @param {} email
 * @param {} password
 */

export const login = (data: ILogin) => {
  return awaitWrap(
    request({
      url: `/user/login`,
      method: 'post',
      data,
      loading: true
    })
  )
}
