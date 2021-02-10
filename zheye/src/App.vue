<template>
  <div class="d-flex flex-column h-100">
    <div class="container">
      <GlobalHeader :user="currentUser" />
      <Loading text="拼命加载中" background="rgba(0,0,0,0.8)" v-if="isLoading" />
      <router-view></router-view>
      <footer class="text-center py-4 text-secondary bg-light mt-6">
        <small>
          <ul class="list-inline mb-0">
            <li class="list-inline-item">© 2020 者也专栏</li>
            <!-- <li class="list-inline-item">课程</li>
          <li class="list-inline-item">文档</li>
          <li class="list-inline-item">联系</li>
          <li class="list-inline-item">更多</li> -->
          </ul>
        </small>
      </footer>
    </div>
  </div>
</template>
<script lang="ts">
import { useStore } from 'vuex'
import { computed, defineComponent, onMounted } from 'vue'
import GlobalHeader from '@/components/GlobalHeader.vue'
import { GlobalDataProps } from '@/store'
import Loading from '@/components/Loading.vue'
export default defineComponent({
  name: 'App',
  components: { GlobalHeader, Loading },
  setup() {
    const store = useStore<GlobalDataProps>()
    const currentUser = computed(() => store.state.user)
    const isLoading = computed(() => store.state.loading)
    return {
      currentUser,
      isLoading
    }
  }
})
</script>
<style lang="scss"></style>
