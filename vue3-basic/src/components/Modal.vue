<!--  -->
<template>
  <!-- 要显示到什么节点上 -->
  <teleport to="#modal">
    <div id="center" v-if="isOpen">
      <h2><slot>this is a modal</slot></h2>
      <button @click="buttonClick">Close</button>
    </div>
  </teleport>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  props: {
    isOpen: Boolean
  },
  // 向外发送的事件,明确显示组件的自定义事件有哪些
  emits: {
    'close-modal': null
  },
  setup(props, context) {
    const buttonClick = () => {
      context.emit('close-modal')
    }
    return {
      buttonClick
    }
  }
})
</script>
<style  scoped>
#center {
  width: 200px;
  height: 200px;
  border: 2px solid black;
  background: white;
  position: fixed;
  left: 50%;
  top: 50%;
  margin-left: -100px;
  margin-top: -100px;
}
</style>