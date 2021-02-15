import request from '@/utils/request'
import { awaitWrap } from '@/utils/index.ts'
import { IGetCid, ICreatePost } from './index'

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
 * 新建一篇文章
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
