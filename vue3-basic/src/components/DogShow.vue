<!--  -->
<template>
  <img :src="result && result.message" />
</template>
<script lang='ts'>
import axios from 'axios'
import { defineComponent } from 'vue'
export default defineComponent({
  name: '',
  components: {},
  async setup() {
    const rawData = await axios.get('https://dog.ceo/api/breeds/image/random')
    return {
      result: rawData.data
    }
  }
})
</script>
<style  scoped>
</style>