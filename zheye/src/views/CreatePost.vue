<template>
  <div class="create-post-page">
    <h4>新建文章</h4>

    <Uploader
      class="d-flex align-items-center justify-content-center bg-light text-secondary w-100 my-4"
      :action="'/upload'"
      :beforeUpload="uploadCheck"
      @file-uploaded="onFileUploaded"
    >
      <h2>点击上传头图</h2>
      <template #loading>
        <div class="d-flex">
          <div class="spinner-border text-secondary" role="status"></div>
          <h2>正在上传</h2>
        </div>
      </template>
      <template #uploaded="dataProps">
        <div class="uploaded-area">
          <img :src="dataProps.uploadedData.data.url" />
          <h3>点击重新上传</h3>
        </div>
      </template>
    </Uploader>
    <validate-form @form-submit="onFormSubmit">
      <div class="mb-3">
        <label class="form-label">文章标题：</label>
        <validate-input :rules="titleRules" v-model="titleVal" placeholder="请输入文章标题" type="text" />
      </div>
      <div class="mb-3">
        <label class="form-label">文章详情：</label>
        <validate-input
          rows="10"
          tag="textarea"
          placeholder="请输入文章详情"
          :rules="contentRules"
          v-model="contentVal"
        />
      </div>
      <template #submit>
        <button class="btn btn-primary btn-large">发表文章</button>
      </template>
    </validate-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue'
import { useStore } from 'vuex'
import { useRouter, useRoute } from 'vue-router'
import { GlobalDataProps, ResponseType, ImageProps } from '@/store'
import { PostProps } from '@/store'
import ValidateInput, { RulesProp } from '@/components/ValidateInput.vue'
import ValidateForm from '@/components/ValidateForm.vue'

import Uploader from '@/components/Uploader.vue'
import { createMessage } from '@/components/createMessage'
import { beforeUploadCheck } from '@/helper'
export default defineComponent({
  name: 'Login',
  components: {
    ValidateInput,
    ValidateForm,
    Uploader
  },
  setup() {
    const uploadedData = ref()
    const titleVal = ref('')
    const router = useRouter()
    const route = useRoute()
    const isEditMode = !!route.query.id
    const store = useStore<GlobalDataProps>()
    const titleRules: RulesProp = [{ type: 'required', message: '文章标题不能为空' }]
    const contentVal = ref('')
    const contentRules: RulesProp = [{ type: 'required', message: '文章详情不能为空' }]
    onMounted(() => {})
    const onFormSubmit = (result: boolean) => {
      if (result) {
        const { column, _id } = store.state.user
        if (column) {
          const newPost: PostProps = {
            _id: new Date().getTime() + '',
            title: titleVal.value,
            content: contentVal.value,
            column,
            createdAt: new Date().toLocaleDateString()
          }
          store.commit('createPost', newPost)
          router.push({ name: 'column', params: { id: column } })
        }
      }
    }
    const beforeUpload = (file: File) => {
      const isJPG = file.type === 'image/jpeg'
      if (!isJPG) {
        createMessage('上传图片只能是JPG格式', 'error')
      }
      return isJPG
    }
    const onFileUploaded = (rawData: ResponseType<ImageProps>) => {
      createMessage(`上传图片ID${rawData.data._id}`, 'success')
    }
    const uploadCheck = (file: File) => {
      const { passed, error } = beforeUploadCheck(file, { format: ['image/jpeg', 'image/png'], size: 4 })
      if (error === 'format') {
        createMessage('上传图片只能是 JPG/PNG 格式!', 'error')
      }
      if (error === 'size') {
        createMessage('上传图片大小不能超过 1Mb', 'error')
      }
      console.log(passed)

      return passed
    }
    return {
      titleRules,
      titleVal,
      contentVal,
      contentRules,
      onFormSubmit,
      uploadedData,
      isEditMode,
      beforeUpload,
      onFileUploaded,
      uploadCheck
    }
  }
})
</script>
<style>
.create-post-page .file-upload-container {
  height: 200px;
  cursor: pointer;
  overflow: hidden;
}
.create-post-page .file-upload-container img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.uploaded-area {
  position: relative;
}
.uploaded-area:hover h3 {
  display: block;
}
.uploaded-area h3 {
  display: none;
  position: absolute;
  color: #999;
  text-align: center;
  width: 100%;
  top: 50%;
}
</style>
