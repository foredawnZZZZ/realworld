<template>
 <div class="home-page">
  <div class="banner">
   <div class="container">
    <h1 class="logo-font">conduit</h1>
    <p>A place to share your knowledge.</p>
   </div>
  </div>
  <div class="container page">
   <div class="row">
    <div class="col-md-9">
     <div class="feed-toggle">
      <ul class="nav nav-pills outline-active">
       <li class="nav-item" v-if="userInfo">
        <nuxt-link
         :to="{ name: 'home', query: { tab: 'your_feed' } }"
         class="nav-link"
         exact
         :class="{ active: tab === 'your_feed' }"
         >Your Feed</nuxt-link
        >
       </li>
       <li class="nav-item">
        <nuxt-link
         :to="{ name: 'home' }"
         class="nav-link"
         exact
         :class="{ active: tab === 'global_feed' }"
         >Global Feed</nuxt-link
        >
       </li>
       <li class="nav-item" v-if="tag">
        <nuxt-link
         :to="{ name: 'home', query: { tag: tag, tab: 'tag' } }"
         class="nav-link"
         exact
         :class="{ active: tab == 'tag' }"
         >#{{ tag }}</nuxt-link
        >
       </li>
      </ul>
     </div>
     <div
      class="article-preview"
      v-for="(article, index) in articles"
      :key="index"
     >
      <div class="article-meta">
       <nuxt-link
        :to="{
         name: 'profile',
         params: {
          username: article.author.username,
         },
        }"
       >
        <img :src="article.author.image" />
       </nuxt-link>
       <div class="info">
        <nuxt-link
         :to="{
          name: 'profile',
          params: {
           username: article.author.username,
          },
         }"
         class="author"
         >{{ article.author.username }}</nuxt-link
        >
        <span class="date">{{ article.createdAt | date("MMM DD, YYYY") }}</span>
       </div>
       <button
        class="btn btn-outline-primary btn-sm pull-xs-right"
        :class="{ active: article.favorited }"
        :disabled="article.hasFavorited"
        @click="onFavorite(article)"
       >
        <i class="ion-heart"></i>
        {{ article.favoritesCount }}
       </button>
      </div>
      <nuxt-link
       :to="{ name: 'article', params: { slug: article.slug } }"
       class="preview-link"
      >
       <h1>
        {{ article.title }}
       </h1>
       <p>{{ article.description }}</p>
       <span>Read more...</span>
      </nuxt-link>
     </div>
     <nav>
      <ul class="pagination">
       <li class="page-item active" v-for="item in total" :key="item">
        <nuxt-link
         :to="{ name: 'home', query: { page: item } }"
         class="page-link"
         >{{ item }}</nuxt-link
        >
       </li>
      </ul>
     </nav>
    </div>
    <div class="col-md-3">
     <div class="sidebar">
      <p>Popular Tags</p>
      <div class="tag-list">
       <nuxt-link
        v-for="tag in tags"
        :key="tag"
        :to="{ name: 'home', query: { tag: tag, tab: 'tag' } }"
        class="tag-pill tag-default"
        >{{ tag }}</nuxt-link
       >
      </div>
     </div>
    </div>
   </div>
  </div>
 </div>
</template>

<script>
import {
 getTags,
 getAriticles,
 getFeedAritcles,
 setFavorite,
 removeFavorite,
} from "@/api/article";
import { mapState } from "vuex";
export default {
 async asyncData({ query }) {
  const limit = 20;
  const page = +query.page || 1;
  const tab = query.tab || "global_feed";
  const tag = query.tag;
  const loadArticles = tab === "global_feed" ? getAriticles : getFeedAritcles;
  const [tagRes, ariticleRes] = await Promise.all([
   getTags(),
   loadArticles({ limit, offset: (page - 1) * limit, tag }),
  ]);
  const { tags } = tagRes.data;
  const { articles, articlesCount } = ariticleRes.data;
  articles.forEach((item) => (item.hasFavorited = false));
  return {
   tags,
   articles,
   tab,
   limit,
   articlesCount,
   tag,
  };
 },
 watchQuery: ["tab", "tag"],
 computed: {
  ...mapState(["userInfo"]),
  total() {
   return Math.ceil(this.articlesCount / this.limit);
  },
 },
 methods: {
  async onFavorite(val) {
   val.hasFavorited = true;
   if (!val.favorited) {
    await setFavorite(val.slug);
    val.favorited = true;
    val.favoritesCount += 1;
   } else {
    await removeFavorite(val.slug);
    val.favorited = false;
    val.favoritesCount -= 1;
   }
   val.hasFavorited = false;
  },
 },
};
</script>

<style scoped></style>
