import request from '@/utils/request'
import { awaitWrap } from '@/utils/index.ts'

interface paging {
  currentPage: string | number // 当前页
  pageSize: string | number // 每页条数
}

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
      loading: false
    })
  )
}
