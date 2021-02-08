<!-- ColumnDetail -->
<template>
  <h1>
    <pre>{{ route }}</pre>
  </h1>
</template>

<script lang="ts">
import { useRoute } from 'vue-router'

export default {
  name: 'ColumnDetail',
  components: {},
  setup() {
    const route = useRoute()
    return {
      route
    }
  }
}
</script>
<style lang="scss" scoped></style>
