import { createStore, useStore } from 'vuex'
import { testData, testPosts, ColumnProps, PostProps } from './testData'

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
// export interface PostProps {
//   _id?: string
//   title: string
//   excerpt?: string
//   content?: string
//   image?: string
//   createdAt?: string
//   column: string
//   author?: string | UserProps
//   isHTML?: boolean
// }
export interface GlobalDataProps {
  columns: ColumnProps[]
  posts: PostProps[]
  user: UserProps
}

const store = createStore<GlobalDataProps>({
  state: {
    columns: testData,
    posts: testPosts,
    user: {
      isLogin: true,
      nickName: 'ljlkj',
      columnId: 1
    }
  },
  getters: {
    biggerColumnsLen(state) {
      return state.columns.filter(c => c.id > 2).length
    },
    // 返回一个函数，传参
    getColumnById: state => (id: number) => {
      return state.columns.find(c => c.id === id)
    },
    getPostsByCid: state => (cid: number) => {
      return state.posts.filter(post => post.columnId === cid)
    }
  },
  mutations: {
    login(state) {
      state.user = { ...state.user, isLogin: true, nickName: 'vilsjkl' }
    },
    createPost(state, newPost) {
      state.posts.push(newPost)
    }
  }
})

export default store
