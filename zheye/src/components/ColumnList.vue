<!--  -->
<template>
  <div class="row">
    <div v-for="column in columnList" :key="column._id" class="col-4 mb-4">
      <div class="card h-100 shadow-sm">
        <div class="card-body text-center">
          <img
            :src="column.avatar && column.avatar.url"
            :alt="column.title"
            class="rounded-circle border border-light my-3"
          />
          <h5 class="card-title">{{ column.title }}</h5>
          <p class="card-text text-left">{{ column.description }}</p>
          <!-- <router-link :to="{ name: 'column', params: { id: column.id } }" class="btn btn-outline-primary">
            进入专栏
          </router-link> -->
          <router-link :to="`/column/${column._id}`" class="btn btn-outline-primary">
            进入专栏
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
// PropType 接收一个泛型，可以将Array构造函数返回到传入的泛型类型
import { computed, defineComponent, PropType } from 'vue'
import { ColumnProps } from '@/store'
export default defineComponent({
  name: 'ColumnList',
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
          column.avatar = {
            url: require('@/assets/column.jpg')
          }
        } else {
          column.avatar.url = column.avatar.url + `?x-oss-process=image/resize, h_50,w_50`
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
<style lang="scss" scoped>
.card-body {
  img {
    width: 50px;
    height: 50px;
  }
}
</style>
