import { Commit, createStore, useStore } from 'vuex'
import { IGetCid, IgetPosts, ILogin, paging } from './api/index'
import { getColumn, getColumns, getColumnPosts } from './api/columnController'
import { login } from './api/authController'
export interface ResponseType<P = {}> {
  code: number
  msg: string
  data: P
}
export interface UserProps {
  isLogin: boolean
  nickName?: string
  _id?: string
  columnId?: number
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
}
const postAndCommit = async (fn: Function, data: any, mutationName: string, commit: Commit) => {
  let [err, res] = await fn(data)
  if (err) return console.log(err)
  commit(mutationName, res.data)
  return res.data
}

const store = createStore<GlobalDataProps>({
  state: {
    token: '',
    loading: false,
    columns: [],
    posts: [],
    user: {
      isLogin: false,
      nickName: '',
      columnId: undefined
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
    /* login(state) {
      state.user = { ...state.user, isLogin: true, nickName: 'vilsjkl' }
    }, */
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
    login(state, data) {
      console.log(data)
      state.token = data.token
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
    login({ commit }, data: ILogin) {
      return postAndCommit(login, data, 'login', commit)
    }
  }
})

export default store
