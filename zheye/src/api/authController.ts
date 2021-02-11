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
/**
 * 注册
 * @param {} email
 * @param {} password
 * @param {} nickName
 */

export const register = (data: ILogin) => {
  return awaitWrap(
    request({
      url: `/users`,
      method: 'post',
      data,
      loading: true
    })
  )
}

/**
 * 获取当前用户信息
 */
export const getCurrentUser = () => {
  return awaitWrap(
    request({
      url: `/user/current`,
      method: 'get',
      loading: false
    })
  )
}
