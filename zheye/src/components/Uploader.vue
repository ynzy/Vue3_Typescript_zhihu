<!-- Uploader -->
<template>
  <div class="file-upload">
    <div class="file-upload-container" @click.prevent="triggerUpload" v-bind="$attrs">
      <slot name="loading" v-if="fileStatus == 'loading'">
        <button class="btn btn-pirmary" disabled>正在上传....</button>
      </slot>
      <slot name="uploaded" :uploadedData="uploadedData" v-else-if="fileStatus == 'success'">
        <button class="btn btn-pirmary">上传成功</button>
      </slot>
      <slot name="uploadError" v-else-if="fileStatus == 'error'">
        <button class="btn btn-pirmary">上传失败</button>
      </slot>
      <slot name="default" v-else>
        <button class="btn btn-pirmary">点击上传</button>
      </slot>
    </div>
    <input type="file" class="file-input d-none" ref="fileInput" @change="handleFileChange" />
  </div>
</template>
<script lang="ts">
import { defineComponent, PropType, ref, watch } from 'vue'
import { upload } from '@/api/uploadController'
type UploadStatus = 'ready' | 'loading' | 'success' | 'error'
type CheckFunction = (file: File) => boolean
export default defineComponent({
  name: 'Uploader',
  props: {
    action: {
      type: String,
      required: true
    },
    beforeUpload: {
      type: Function as PropType<CheckFunction>
    },
    uploaded: {
      type: Object
    }
  },
  inheritAttrs: false, // 如果你不希望组件的根元素继承特性，你可以在组件的选项中设置 inheritAttrs: false
  emits: ['file-uploaded', 'file-uploaded-error'],
  setup(props, context) {
    const fileInput = ref<HTMLInputElement | null>(null)
    const fileStatus = ref<UploadStatus>(props.uploaded ? 'success' : 'ready') //上传状态
    const uploadedData = ref(props.uploaded)
    // 需要传入相应式对象，不是的话传入函数
    watch(
      () => props.uploaded,
      newValue => {
        if (!newValue) return
        fileStatus.value = 'success'
        uploadedData.value = newValue
      }
    )
    // 模拟点击inpu
    const triggerUpload = () => {
      if (fileInput.value) {
        fileInput.value.click()
      }
    }
    const handleFileChange = async (e: Event) => {
      const currentTarget = e.target as HTMLInputElement
      if (!currentTarget.files) return
      const files = Array.from(currentTarget.files)
      // 上传前自定义判断
      if (props.beforeUpload) {
        const result: boolean = props.beforeUpload(files[0])
        if (!result) {
          return
        }
      }
      // 请求上传
      fileStatus.value = 'loading'

      console.log(files)
      const uploadeFile = files[0]
      const formData = new FormData()
      formData.append('file', files[0])
      let [err, res] = await upload(props.action, formData)
      if (fileInput.value) {
        fileInput.value.value = ''
      }
      if (err) {
        fileStatus.value = 'error'
        console.log(err)
        context.emit('file-uploaded-error', err)
        return
      }
      fileStatus.value = 'success'
      uploadedData.value = res
      context.emit('file-uploaded', res)
      console.log(res)
    }
    return {
      fileInput,
      triggerUpload,
      handleFileChange,
      fileStatus,
      uploadedData
    }
  }
})
</script>
<style lang="scss" scoped></style>
