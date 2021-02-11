<template>
  <div class="d-flex flex-column h-100">
    <div class="container">
      <GlobalHeader :user="currentUser" />
      <!-- <Message type="error" :message="error.message" v-if="error.status" /> -->
      <h1>{{ error.message }}</h1>
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
import { computed, defineComponent, onMounted, watch } from 'vue'
import GlobalHeader from '@/components/GlobalHeader.vue'
import { GlobalDataProps } from '@/store'
import Loading from '@/components/Loading.vue'
import Message from '@/components/Message.vue'
import { createMessage } from '@/components/createMessage'
export default defineComponent({
  name: 'App',
  components: { GlobalHeader, Loading, Message },
  setup() {
    const store = useStore<GlobalDataProps>()
    const currentUser = computed(() => store.state.user)
    console.log(currentUser.value)
    const isLoading = computed(() => store.state.loading)
    const token = computed(() => store.state.token)
    const error = computed(() => store.state.error)

    onMounted(() => {
      if (!currentUser.value.isLogin && token.value) {
        store.dispatch('fetchCurrentUser')
      }
    })
    watch(
      () => error.value.status,
      () => {
        const { status, message } = error.value
        if (status && message) {
          createMessage(message, 'error')
        }
      }
    )
    return {
      currentUser,
      isLoading,
      error
    }
  }
})
</script>
<style lang="scss"></style>
