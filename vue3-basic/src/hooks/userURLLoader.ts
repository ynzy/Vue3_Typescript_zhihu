import { ref } from 'vue';
import axios from 'axios'

function userURLLoader<T>(url: string) {
  //* 一开始没有数据是null,加载完成之后是一个泛型T
  const result = ref<T | null>(null)
  const loading = ref(true)
  const loaded = ref(false)
  const error = ref(null)

  axios.get(url).then((rawData) => {
    loading.value = false
    loaded.value = true
    result.value = rawData.data
  }).catch(e => {
    error.value = e
    loading.value = false
  })
  return {
    result,
    loading,
    error,
    loaded,
  }
}

export default userURLLoader