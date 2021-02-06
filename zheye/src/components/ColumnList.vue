<!--  -->
<template>
  <div class="row">
    <div v-for="column in columnList" :key="column.id" class="col-4 mb-4">
      <div class="card h-100 shadow-sm">
        <div class="card-body text-center">
          <img :src="column.avatar" :alt="column.title" class="rounded-circle border border-light w-25 my-3" />
          <h5 class="card-title">{{ column.title }}</h5>
          <p class="card-text text-left">{{ column.description }}</p>
          <a href="#" class="btn btn-outline-primary">进入专栏</a>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
// PropType 接收一个泛型，可以将Array构造函数返回到传入的泛型类型
import { computed, defineComponent, PropType } from 'vue'
export interface ColumnProps {
  id: number
  title?: string
  avatar?: string
  description?: string
}
export default defineComponent({
  name: '',
  components: {},
  props: {
    list: {
      // 类型断言 断言成为ColumnProps的数组
      type: Array as PropType<ColumnProps[]>,
      required: true
    }
  },
  setup(props) {
    const columnList = computed(() => {
      return props.list.map(column => {
        if (!column.avatar) {
          column.avatar = require('@/assets/column.jpg')
        }
        return column
      })
    })
    return {
      columnList
    }
  }
})
</script>
<style lang="scss" scoped></style>
