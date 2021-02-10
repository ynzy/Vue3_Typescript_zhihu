import request from '@/utils/request'
import { awaitWrap } from '@/utils/index.ts'
import { paging, IGetCid } from './index'

/**
 * 获取专栏列表
 * @param {} currentPage
 * @param {} pageSize
 */
/* export const getColumns = (params: paging) => {
  return awaitWrap(
    request({
      url: '/columns',
      method: 'get',
      params,
      loading: false
    })
  )
} */
/**
 * 获得一个专栏详情
 * @param {} cid
 */
export const getColumn = (params: IGetCid) => {
  return awaitWrap(
    request({
      url: `/api/posts/${params.cid}`,
      method: 'get',
      loading: false
    })
  )
}
