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
