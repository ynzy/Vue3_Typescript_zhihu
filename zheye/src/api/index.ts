export interface paging {
  currentPage: string | number // 当前页
  pageSize: string | number // 每页条数
}

export interface IGetCid {
  cid: string
}

export type IgetPosts = IGetCid & paging

export interface ILogin {
  email: string
  password: string
}
export interface IRegister {
  email: string
  password: string
  nickName: string
}
