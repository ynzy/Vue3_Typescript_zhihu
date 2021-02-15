<!-- Home -->
<template>
  <div class="home-page container-md">
    <section class="py-5 text-center container">
      <div class="row py-lg-5">
        <div class="col-lg-6 col-md-8 mx-auto">
          <img src="../assets/callout.svg" alt="callout" class="w-50" />
          <h2 class="font-weight-light">随心写作，自由表达</h2>
          <p>
            <router-link to="/create" class="btn btn-primary my-2">开始写文章</router-link>
          </p>
        </div>
      </div>
    </section>
    <h4 class="font-weight-bold text-center">发现精彩</h4>
    <ColumnList :list="list"></ColumnList>
    <div class="text-center">
      <button class="btn btn-outline-primary mt-2 mb-5 mx-auto btn-block w-25">
        加载更多
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import ColumnList from '@/components/ColumnList.vue'
import { useStore } from 'vuex'
import { GlobalDataProps } from '@/store'
import { computed, onMounted } from 'vue'
export default {
  name: 'Home',
  components: {
    ColumnList
  },
  setup() {
    const store = useStore<GlobalDataProps>()
    let list = computed(() => store.getters.getColumns)
    onMounted(() => {
      store.dispatch('fetchColumns', { currentPage: 1, pageSize: 5 })
    })
    return {
      list
    }
  }
}
</script>
<style lang="scss" scoped></style>
