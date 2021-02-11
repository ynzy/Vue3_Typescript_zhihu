import { createApp } from 'vue'
import Message from './Message.vue'
export type MessageType = 'success' | 'error' | 'default'

export const createMessage = (message: string, type: MessageType, timeout = 2000) => {
  // 组件实例，props
  const messageInstance = createApp(Message, {
    message,
    type
  })
  // 挂载实例
  const mountNode = document.createElement('div')
  document.body.append(mountNode)
  messageInstance.mount(mountNode)
  // 卸载组件实例以及dom节点
  setTimeout(() => {
    messageInstance.unmount(mountNode)
    document.body.removeChild(mountNode)
  }, timeout)
}
