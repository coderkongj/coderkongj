import { v4 as uuidv4 } from 'uuid';
// 生成一个随机字符串，且每次执行不能发生变化，游客身份持久存储
export const getUUID = () => {
  // 先从本地存储获取uuid（看一下localStorage有没有）
  let uuid_token = localStorage.getItem('UUIDTOKEN')
  if (!uuid_token) {
    // 如果没有就生成游客临时身份
    uuid_token = uuidv4()
    // localStorage存储
    localStorage.setItem('UUIDTOKEN', uuid_token)
  }
  // ⭐切记有返回值，没有返回值就是undefined
  return uuid_token
}
