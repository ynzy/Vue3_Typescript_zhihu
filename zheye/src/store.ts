import { Commit, createStore, useStore } from 'vuex'
import { IGetCid, IgetPosts, ILogin, paging } from './api/index'
import { getColumn, getColumns, getColumnPosts } from './api/columnController'
import { getCurrentUser, login } from './api/authController'
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
export interface PostProps {
  _id?: string
  title: string
  excerpt?: string
  content?: string
  image?: ImageProps
  createdAt?: string
  column: string
  author?: string | UserProps
  isHTML?: boolean
}
export interface GlobalDataProps {
  token: string
  loading: boolean
  columns: ColumnProps[]
  posts: PostProps[]
  user: UserProps
}

const getAndCommit = async (fn: Function, params: any, mutationName: string, commit: Commit) => {
  let [err, res] = await fn(params)
  if (err) return console.log(err)
  commit(mutationName, res.data)
  return res.data
}
const postAndCommit = async (fn: Function, data: any, mutationName: string, commit: Commit) => {
  let [err, res] = await fn(data)
  if (err) return console.log(err)
  commit(mutationName, res.data)
  return res.data
}

const store = createStore<GlobalDataProps>({
  state: {
    token: localStorage.getItem('token') || '',
    loading: false,
    columns: [],
    posts: [],
    user: {
      isLogin: false
    }
  },
  getters: {
    // 返回一个函数，传参
    getColumnById: state => (id: string) => {
      return state.columns.find(c => c._id === id)
    },
    getPostsByCid: state => (cid: string) => {
      return state.posts.filter(post => post.column === cid)
    }
  },
  mutations: {
    createPost(state, newPost) {
      state.posts.push(newPost)
    },
    fetchColumns(state, data) {
      state.columns = data.list
    },
    fetchColumn(state, data) {
      state.columns = [data]
    },
    fetchPosts(state, data) {
      state.posts = data.list
    },
    setLoading(state, status) {
      state.loading = status
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
    fetchColumns({ commit }, params: paging) {
      getAndCommit(getColumns, params, 'fetchColumns', commit)
    },
    fetchColumn({ commit }, params: IGetCid) {
      getAndCommit(getColumn, params, 'fetchColumn', commit)
    },
    fetchPosts({ commit }, params: IgetPosts) {
      getAndCommit(getColumnPosts, params, 'fetchPosts', commit)
    },
    fetchCurrentUser({ commit }) {
      return getAndCommit(getCurrentUser, null, 'fetchCurrentUser', commit)
    },
    login({ commit }, data: ILogin) {
      return postAndCommit(login, data, 'login', commit)
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
