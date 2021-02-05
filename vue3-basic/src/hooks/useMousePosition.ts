import { ref, onMounted, onUnmounted } from 'vue'

function useMouseTracker() {
  const x = ref(0)
  const y = ref(0)
  const updateMouse = (e: MouseEvent) => {
    x.value = e.pageX
    y.value = e.pageY
  }
  onMounted(() => {
    document.addEventListener('click', updateMouse) // 这是一个副作用，需要销毁删除
  })
  onUnmounted(() => {
    document.removeEventListener('click', updateMouse)
  })
  return { x, y }
}

export default useMouseTracker