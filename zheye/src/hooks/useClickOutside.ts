import { onMounted, onUnmounted, ref, Ref } from 'vue'

const useClickOutside = (elementRef: Ref<null | HTMLElement>) => {
  const isClickOutside = ref(false) // 是否点击了外面

  // 判断是否包含当前节点，如果包含当前节点isClickOutside为fasle，否则为true
  // node.contains(otherNode) 是否包含otherNode节点
  // 因为e.target可能为null，contains里面要传的是节点，所有断言成HTMLElement
  const handler = (e: MouseEvent) => {
    if (elementRef.value) {
      if (elementRef.value.contains(e.target as HTMLElement)) {
        isClickOutside.value = false
      } else {
        isClickOutside.value = true
      }
    }
  }
  onMounted(() => {
    document.addEventListener('click', handler)
  })
  onUnmounted(() => {
    document.removeEventListener('click', handler)
  })

  return isClickOutside
}

export default useClickOutside
