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
import { defineComponent, onMounted, onUnmounted, ref, watch } from 'vue'
import useClickOutside from '@/hooks/useClickOutside'
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
    const isClickOutside = useClickOutside(dropdownRef)
    // 监听isClickOutside的变化，才能渲染视图
    watch(isClickOutside, () => {
      // 如果点击的是外面，并且isOpen是打开的，置为false
      if (isClickOutside.value && isOpen.value) {
        isOpen.value = false
      }
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
