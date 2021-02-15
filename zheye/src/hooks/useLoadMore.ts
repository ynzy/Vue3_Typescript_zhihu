import { useStore } from 'vuex'
import { ref, computed, ComputedRef } from 'vue'

interface LoadParams {
  currentPage: number
  pageSize: number
}

export const useLoadMore = (
  actionName: string,
  total: ComputedRef<number>,
  params: LoadParams = { currentPage: 2, pageSize: 5 }
) => {
  const store = useStore()
  const currentPage = ref(params.currentPage) //当前页，响应式动态变化
  // 请求参数，如果要获得最新值，不能直接获得值，需要获取响应式对象，才能动态获取值
  const requestParams = computed(() => ({
    currentPage: currentPage.value,
    pageSize: params.pageSize
  }))
  // 加载更多
  const loadMorePage = () => {
    store.dispatch(actionName, requestParams.value).then(() => {
      currentPage.value++
    })
  }
  // 是否到最后一页
  const isLastPage = computed(() => {
    return Math.ceil(total.value / params.pageSize) < currentPage.value
  })
  return {
    currentPage,
    loadMorePage,
    isLastPage
  }
}
