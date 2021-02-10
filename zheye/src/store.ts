import { createStore, useStore } from 'vuex'
import { IGetCid, IgetPosts, paging } from './api/index'
import { getColumn, getColumns, getColumnPosts } from './api/columnController'
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
  columns: ColumnProps[]
  posts: PostProps[]
  user: UserProps
}

const store = createStore<GlobalDataProps>({
  state: {
    columns: [],
    posts: [],
    user: {
      isLogin: false,
      nickName: 'ljlkj',
      columnId: 1
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
    login(state) {
      state.user = { ...state.user, isLogin: true, nickName: 'vilsjkl' }
    },
    createPost(state, newPost) {
      state.posts.push(newPost)
    },
    fetchColums(state, data) {
      state.columns = data.list
    },
    fetchColumn(state, data) {
      state.columns = [data]
    },
    fetchPosts(state, data) {
      state.posts = data.list
    }
  },
  actions: {
    async fetchColumns({ commit }, params: paging) {
      let [err, res] = await getColumns(params)
      if (err) return console.log(err)
      commit('fetchColums', res.data)
    },
    async fetchColumn({ commit }, cid: IGetCid) {
      let [err, res] = await getColumn(cid)
      if (err) return console.log(err)
      commit('fetchColumn', res.data)
    },
    async fetchPosts({ commit }, params: IgetPosts) {
      let [err, res] = await getColumnPosts(params)
      if (err) return console.log(err)
      commit('fetchPosts', res.data)
    }
  }
})

export default store
