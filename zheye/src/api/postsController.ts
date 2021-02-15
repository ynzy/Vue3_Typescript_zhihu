import request from '@/utils/request'
import { awaitWrap } from '@/utils/index.ts'
import { paging, IGetCid, ICreatePost } from './index'

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
      url: `/posts/${params.cid}`,
      method: 'get',
      loading: false
    })
  )
}
/**
 * 新建一篇文章
 * @param {} title
 * @param {} content
 * @param {} image
 * @param {} column
 * @param {} author
 */
export const post = (data: ICreatePost) => {
  return awaitWrap(
    request({
      url: `/posts`,
      method: 'post',
      data,
      loading: false
    })
  )
}
