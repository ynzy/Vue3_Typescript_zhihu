<!--  -->
<template>
  <div id="app">
    <h1>{{ error }}</h1>
    <h1>{{ count }}</h1>
    <h1>{{ double }}</h1>
    <button @click="increase">+1</button>
    <ul>
      <li v-for="number in numbers" :key="number">{{ number }}</li>
    </ul>
    <h1>{{ person.name }}</h1>
    <h1>x:{{ x }},y:{{ y }}</h1>
    <h1 v-if="loading">Loading...</h1>
    <img v-if="loaded" :src="result[0].url" />
    <button @click="updateGreeting">更新</button>
    <modal :isOpen="modalIsOpen" @close-modal="onModalClose">My Modal</modal>
    <button @click="openModal">开启</button>
    <Suspense>
      <!-- 成功的结果展示 -->
      <template #default>
        <!-- <async-show /> -->
        <dog-show />
      </template>
      <!-- 开始展示 -->
      <template #fallback>
        <h1>Loading...</h1>
      </template>
    </Suspense>
  </div>
</template>

<script lang="ts">
import {
  ref,
  computed,
  reactive,
  toRefs,
  onMounted,
  onUpdated,
  onRenderTriggered,
  watch,
  onUnmounted,
  onErrorCaptured
} from 'vue'
import useMousePosition from './hooks/useMousePosition'
import userURLLoader from '@/hooks/userURLLoader'
import modal from '@/components/Modal.vue'
import AsyncShow from '@/components/AsyncShow.vue'
import DogShow from '@/components/DogShow.vue'
interface DataProps {
  count: number
  double: number
  increase: () => void
  numbers: number[]
  person: { name?: string }
}

interface DagResult {
  message: string
  status: string
}

interface CatResult {
  id: string
  url: string
  width: number
  height: number
}
export default {
  name: '',
  components: { modal, AsyncShow, DogShow },
  setup() {
    // ref 是一个函数，它接受一个参数，返回的就是一个神奇的 响应式对象 。我们初始化的这个 0 作为参数包裹到这个对象中去，在未来可以检测到改变并作出对应的相应。
    /* const count = ref(0);
    const double = computed(() => {
      return count.value * 2;
    });
    const increase = () => {
      count.value++;
    }; */
    const state: DataProps = reactive({
      count: 0,
      increase: () => {
        state.count++
        state.numbers[0] = 5
        state.person.name = '张三'
      },
      double: computed(() => state.count * 2),
      numbers: [0, 1, 2],
      person: {}
    })
    const greetings = ref('')
    const updateGreeting = () => {
      greetings.value += 'Hello'
    }
    watch([greetings, () => state.count], (newVal, oldVal) => {
      console.log('数值变化', newVal, oldVal)
      document.title = 'updated' + greetings.value + state.count
    })
    /*  onMounted(() => {
      console.log('mounted')
    })
    onUpdated(() => {
      console.log('updated')
    })
    onRenderTriggered(event => {
      console.log(event)
    }) */
    const { x, y } = useMousePosition()
    /* const { result, loading, loaded } = userURLLoader<DagResult>('https://dog.ceo/api/breeds/image/random')
    watch(result, () => {
      if (result.value) {
        console.log('value', result.value.message)
      }
    }) */
    const { result, loading, loaded } = userURLLoader<CatResult[]>('https://api.thecatapi.com/v1/images/search?limit=1')
    watch(result, () => {
      if (result.value) {
        console.log('value', result.value[0].url)
      }
    })

    const modalIsOpen = ref(false)
    const openModal = () => {
      modalIsOpen.value = true
    }
    const onModalClose = () => {
      modalIsOpen.value = false
    }
    const error = ref(null)
    onErrorCaptured((e: any) => {
      error.value = e
      // 返回一个Boolean，标识是否向上传播
      return true
    })
    return {
      ...toRefs(state),
      updateGreeting,
      x,
      y,
      result,
      loading,
      loaded,
      modalIsOpen,
      openModal,
      onModalClose,
      error
    }
  }
}
</script>
<style scoped>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
