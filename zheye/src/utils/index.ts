/**
 * 处理await成功失败信息
 * @param {*} promise
 */
export const awaitWrap = (promise: Promise<any>) => {
  return promise.then(data => [null, data]).catch(err => [err, null])
}
