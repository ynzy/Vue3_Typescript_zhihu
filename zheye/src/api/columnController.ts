import request from '@/utils/request'
import { awaitWrap } from '@/utils/index.ts'
import { paging, IGetCid, IgetPosts } from './index'

/**
 * 获取专栏列表
 * @param {} currentPage
 * @param {} pageSize
 */
export const getColumns = (params: paging) => {
  return awaitWrap(
    request({
      url: '/columns',
      method: 'get',
      params,
      loading: true
    })
  )
}
/**
 * 获取专栏列表
 * @param {} currentPage
 * @param {} pageSize
 */

export const getColumnPosts = (params: IgetPosts) => {
  let { cid, ...newParams } = params
  return awaitWrap(
    request({
      url: `/columns/${cid}/posts`,
      method: 'get',
      params: newParams,
      loading: true
    })
  )
}
/**
 * 获得一个专栏详情
 * @param {} cid
 */

export const getColumn = ({ cid }: IGetCid) => {
  return awaitWrap(
    request({
      url: `/columns/${cid}`,
      method: 'get',
      loading: true
    })
  )
}
