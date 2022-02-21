import { request } from '@/plugins/request'

export const getLogin = data => {
 return request({
  method: "post",
  url: "/api/users/login",
  data
 })
}

export const getRegister = data => {
 return request({
  method: "post",
  url: "/api/users",
  data
 })
}

export const getCuerrentUser = () => {
 return request({
  method: "get",
  url: "/api/user"
 })
}

export const updateUser = data => {
 return request({
  method: "put",
  url: "/api/user",
  data
 })
}

export const getProfiles = params => {
 return request({
  method: "get",
  url: `/api/profiles/${params}`
 })
}