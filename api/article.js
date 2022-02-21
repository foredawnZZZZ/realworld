import { request } from '@/plugins/request'

export const getTags = () => {
 return request({
  method: "get",
  url: "/api/tags",
 })
}

export const getAriticles = params => {
 return request({
  method: "get",
  url: "/api/articles",
  params
 })
}
export const getFeedAritcles = params => {
 return request({
  method: "get",
  url: "/api/articles/feed",
  params
 })
}
export const setFavorite = data => {
 return request({
  method: "post",
  url: `/api/articles/${data}/favorite`
 })
}

export const removeFavorite = data => {
 return request({
  method: "DELETE",
  url: `/api/articles/${data}/favorite`
 })
}

export const getArticle = params => {
 return request({
  method: "get",
  url: `/api/articles/${params}`,
 })
}

export const getComments = params => {
 return request({
  method: "get",
  url: `/api/articles/${params}/comments`
 })
}

export const createArticles = data => {
 return request({
  method: "post",
  url: `/api/articles`,
  data
 })
}

export const updateArticle = (params, data) => {
 return request({
  method: "put",
  url: `/api/articles/${params}`,
  data
 })
}
export const deleteArticle = params => {
 return request({
  method: "delete",
  url: `/api/articles/${params}`
 })
}

export const addAnComment = (params, data) => {
 return request({
  method: "post",
  url: `/api/articles/${params}/comments`,
  data
 })
}

export const deleteAnComment = (params1, params2) => {
 return request({
  method: "delete",
  url: `/api/articles/${params1}/comments/${params2}`
 })
}
