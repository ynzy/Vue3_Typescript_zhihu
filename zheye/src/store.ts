import { Commit, createStore, useStore } from 'vuex'
import { IGetCid, IgetPosts, ILogin, paging } from './api/index'
import { getColumn, getColumns, getColumnPosts } from './api/columnController'
import { getCurrentUser, login } from './api/authController'
import { post, getPost, updatePost, deletePost } from './api/postsController'
import { arrToObj, objToArr } from './helper'
export interface ResponseType<P = {}> {
  code: number
  msg: string
  data: P
}
export interface UserProps {
  isLogin: boolean
  nickName?: string
  _id?: string
  column?: string
  email?: string
  avatar?: ImageProps
  description?: string
}
export interface ImageProps {
  _id?: string
  url?: string
  createdAt?: string
  fitUrl?: string
}
export interface ColumnProps {
  _id: string
  title: string
  avatar?: ImageProps
  description: string
}
interface GlobalColumns {
  //扩展接口类型，添加一个是否请求后台的判断
  data: ListProps<ColumnProps>
  isLoaded: boolean
}
export interface PostProps {
  _id?: string
  title: string
  excerpt?: string
  content?: string
  image?: ImageProps | string
  createdAt?: string
  column: string
  author?: string | UserProps
  isHTML?: boolean
}
interface GlobalPosts {
  data: ListProps<PostProps>
  loadedColumns: string[] // 加载过的columnid放在数组中
}
export interface GlobalErrorProps {
  status: boolean
  message?: string
}

// 泛型定义的通用接口
interface ListProps<P> {
  [id: string]: P
}
export interface GlobalDataProps {
  error: GlobalErrorProps
  token: string
  loading: boolean
  columns: GlobalColumns
  posts: GlobalPosts
  user: UserProps
}

const getAndCommit = async (fn: Function, params: any, mutationName: string, commit: Commit) => {
  let [err, res] = await fn(params)
  if (err) {
    console.log(err)
    return [err, res]
  }
  commit(mutationName, res && res.data)
  return [err, res]
}
const postAndCommit = async (fn: Function, data: any, mutationName: string, commit: Commit) => {
  try {
    let [err, res] = await fn(data)
    if (err) {
      console.log(err)
      return [err, res]
    }
    commit(mutationName, res && res.data)
    return [err, res]
  } catch (error) {
    console.log(error)
  }
}

const asyncAndCommit = async (fn: Function, data: any, mutationName: string, commit: Commit, extraData?: any) => {
  try {
    let [err, res] = await fn(data)
    if (err) {
      console.log(err)
      return [err, res]
    }
    if (extraData) {
      commit(mutationName, { data: res.data, extraData })
    } else {
      commit(mutationName, res.data)
    }
    return [err, res]
  } catch (error) {
    console.log(error)
  }
}

const store = createStore<GlobalDataProps>({
  state: {
    error: { status: false },
    token: localStorage.getItem('token') || '',
    loading: false,
    columns: { data: {}, isLoaded: false },
    posts: { data: {}, loadedColumns: [] },
    user: {
      isLogin: false
    }
  },
  getters: {
    getColumns: state => {
      return objToArr(state.columns.data)
    },
    // 返回一个函数，传参
    getColumnById: state => (id: string) => {
      return state.columns.data[id]
    },
    getPostsByCid: state => (cid: string) => {
      return objToArr(state.posts.data).filter(post => post.column === cid)
    },
    getCurrentPost: state => (id: any) => {
      return state.posts.data[id]
    }
  },
  mutations: {
    createPost(state, newPost) {
      state.posts.data[newPost._id] = newPost
    },
    fetchColumns(state, data) {
      state.columns.data = arrToObj(data.list)
      state.columns.isLoaded = true
    },
    fetchColumn(state, data) {
      state.columns.data[data._id] = data
    },
    fetchPosts(state, { data, extraData: columnId }) {
      state.posts.data = { ...state.posts.data, ...arrToObj(data.list) }
      state.posts.loadedColumns.push(columnId)
    },
    fetchPost(state, { data: rawData, extraData: columnId }) {
      state.posts.data[rawData._id] = rawData
    },
    updatePost(state, data) {
      state.posts.data[data._id] = data
    },
    deletePost(state, data) {
      delete state.posts.data[data._id]
    },
    setLoading(state, status) {
      state.loading = status
    },
    setError(state, e: GlobalErrorProps) {
      state.error = e
    },
    fetchCurrentUser(state, data) {
      state.user = { isLogin: true, ...data }
    },
    login(state, data) {
      state.token = data.token
      localStorage.setItem('token', data.token)
    }
  },
  actions: {
    fetchColumns({ state, commit }, params: paging) {
      if (state.columns.isLoaded) return
      getAndCommit(getColumns, params, 'fetchColumns', commit)
    },
    fetchColumn({ state, commit }, params: IGetCid) {
      if (state.columns.data[params.cid]) return
      getAndCommit(getColumn, params, 'fetchColumn', commit)
    },
    fetchPosts({ state, commit }, params: IgetPosts) {
      if (state.posts.loadedColumns.includes(params.cid)) return
      asyncAndCommit(getColumnPosts, params, 'fetchPosts', commit, params.cid)
    },
    // 获取文章详情
    fetchPost({ state, commit }, id) {
      const currentPost = state.posts.data[id]
      if (!currentPost || !currentPost.content) {
        return asyncAndCommit(getPost, { cid: id }, 'fetchPost', commit)
      } else {
        let res = { data: currentPost }
        return [null, res]
      }
    },

    fetchCurrentUser({ commit }) {
      return getAndCommit(getCurrentUser, null, 'fetchCurrentUser', commit)
    },
    login({ commit }, data: ILogin) {
      return postAndCommit(login, data, 'login', commit)
    },
    createPost({ commit }, data) {
      return postAndCommit(post, data, 'createPost', commit)
    },
    updatePost({ commit }, { id, payload }) {
      return asyncAndCommit(updatePost, { id, payload }, 'updatePost', commit)
    },
    deletePost({ commit }, cid) {
      return asyncAndCommit(deletePost, { cid }, 'deletePost', commit)
    },
    // 组合action
    loadinAndFetch({ dispatch }, loginData) {
      return dispatch('login', loginData).then(() => {
        return dispatch('fetchCurrentUser')
      })
    }
  }
})

export default store
