<template>
 <div class="article-page">
  <div class="banner">
   <div class="container">
    <h1>{{ article.title }}</h1>
    <article-meta :article="article" @del="onDelArticle"></article-meta>
   </div>
  </div>

  <div class="container page">
   <div class="row article-content">
    <div class="col-md-12" v-html="article.body"></div>
   </div>

   <hr />

   <div class="article-actions">
    <article-meta :article="article"></article-meta>
   </div>

   <div class="row">
    <article-comment></article-comment>
   </div>
  </div>
 </div>
</template>

<script>
import { getArticle, deleteArticle } from "@/api/article";
import MarkdownIt from "markdown-it";
import ArticleMeta from "./components/article-meta.vue";
import ArticleComment from "./components/article-comment.vue";
export default {
 async asyncData({ params }) {
  const { data } = await getArticle(params.slug);
  const { article } = data;
  const md = new MarkdownIt();
  article.body = md.render(article.body);
  return {
   article,
  };
 },
 methods: {
  async onDelArticle(slug) {
   await deleteArticle(slug);
   this.$router.push("/");
  },
 },
 components: {
  ArticleMeta,
  ArticleComment,
 },
 head() {
  return {
   title: `${this.article.title} - RealWorld`,
   meta: [
    {
     hid: "description",
     name: "description",
     content: this.article.description,
    },
   ],
  };
 },
};
</script>

<style scoped></style>
