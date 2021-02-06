<!-- Dropdown -->
<template>
  <div class="dropdown" ref="dropdownRef">
    <!-- prevent 阻止默认行为 -->
    <a href="#" class="btn btn-outline-light my-2 dropdown-toggle" @click.prevent="toggleOpen">{{ title }} </a>
    <ul class="dropdown-menu" :style="{ display: 'block' }" v-if="isOpen">
      <slot />
    </ul>
  </div>
</template>
<script lang="ts">
import { defineComponent, onMounted, onUnmounted, ref } from 'vue'
export default defineComponent({
  name: 'Dropdown',
  components: {},
  props: {
    title: {
      type: String,
      require: true
    }
  },
  setup() {
    const isOpen = ref(false)
    const dropdownRef = ref<null | HTMLElement>(null)
    const toggleOpen = () => {
      isOpen.value = !isOpen.value
    }
    const handler = (e: MouseEvent) => {
      if (dropdownRef.value) {
        console.log(dropdownRef.value)
        // 判断是否包含当前节点， isOpen是否是打开的
        // node.contains(otherNode) 是否包含otherNode节点
        // 因为e.target可能为null，contains里面要传的是节点，所有断言成HTMLElement
        if (!dropdownRef.value.contains(e.target as HTMLElement) && isOpen.value) {
          isOpen.value = false
        }
      }
    }
    onMounted(() => {
      document.addEventListener('click', handler)
    })
    onUnmounted(() => {
      document.removeEventListener('click', handler)
    })
    return {
      isOpen,
      toggleOpen,
      // 返回和 ref 同名的响应式对象，就可以拿到对应的 dom 节点
      dropdownRef //! 这里的命名和dom元素上ref的命名要一样,这样就可以直接取到dom元素了
    }
  }
})
</script>
<style lang="scss" scoped></style>
