import request from '@/utils/request'
import { awaitWrap } from '@/utils/index.ts'
import { paging, IGetCid, ICreatePost } from './index'

/**
 * 获得单个文章信息
 * @param {} cid
 */
export const getPost = (params: IGetCid) => {
  return awaitWrap(
    request({
      url: `/posts/${params.cid}`,
      method: 'get',
      loading: false
    })
  )
}
/**
 * 更新单个文章信息
 * @param {} title
 * @param {} content
 * @param {} image
 * @param {} column
 * @param {} author
 */
export const updatePost = (data: any) => {
  let { id, payload } = data
  return awaitWrap(
    request({
      url: `/posts/${id}`,
      method: 'patch',
      data: payload,
      loading: false
    })
  )
}
/**
 * 获得单个文章信息
 * @param {} cid
 */
export const post = (params: IGetCid) => {
  return awaitWrap(
    request({
      url: `/posts/${params.cid}`,
      method: 'get',
      loading: false
    })
  )
}
/**
 * 删除单个文章信息
 * @param {} cid
 */
export const deletePost = (params: IGetCid) => {
  return awaitWrap(
    request({
      url: `/posts/${params.cid}`,
      method: 'delete',
      loading: true
    })
  )
}
