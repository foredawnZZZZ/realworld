<template>
 <div class="profile-page">
  <div class="user-info">
   <div class="container">
    <div class="row">
     <div class="col-xs-12 col-md-10 offset-md-1">
      <img :src="profile.image" class="user-img" />
      <h4>{{ profile.username }}</h4>
      <p>
       {{ profile.bio }}
      </p>
      <button
       class="btn btn-sm btn-outline-secondary action-btn"
       @click="$router.push('/settings')"
      >
       <i class="ion-plus-round"></i>
       &nbsp; Edit Profile Settings
      </button>
     </div>
    </div>
   </div>
  </div>

  <div class="container">
   <div class="row">
    <div class="col-xs-12 col-md-10 offset-md-1">
     <div class="articles-toggle">
      <ul class="nav nav-pills outline-active">
       <li class="nav-item">
        <a class="nav-link active" href="">My Articles</a>
       </li>
       <li class="nav-item">
        <a class="nav-link" href="">Favorited Articles</a>
       </li>
      </ul>
     </div>

     <div
      class="article-preview"
      v-for="article in articles"
      :key="article.slug"
     >
      <div class="article-meta">
       <a href=""><img :src="article.author.image" /></a>
       <div class="info">
        <a href="" class="author">{{ article.author.username }}</a>
        <span class="date">{{ article.createdAt | date('MMM DD, YYYY')}}</span>
       </div>
       <button class="btn btn-outline-primary btn-sm pull-xs-right">
        <i class="ion-heart"></i> 29
       </button>
      </div>
      <a href="" class="preview-link">
       <h1>
        {{ article.title }}
       </h1>
       <p>{{ article.description }}</p>
       <span>Read more...</span>
      </a>
     </div>
    </div>
   </div>
  </div>
 </div>
</template>

<script>
import { getProfiles } from "@/api/user";
import { getAriticles } from "@/api/article";
import { mapState } from "vuex";
export default {
 middleware: "auth",
 data() {
  return {
   profile: {
    image: "",
    username: "",
    bio: "",
   },
   articles: [],
   articlesCount: 0
  };
 },
 computed: {
  ...mapState(["userInfo"]),
 },
 async mounted() {
  const limit = 20;
  const [profilesRes, ariticleRes] = await Promise.all([
   getProfiles(this.userInfo.username),
   getAriticles({
    author: this.userInfo.username,
    limit,
   }),
  ]);
  const {
   data: { profile },
  } = profilesRes;
  const {
   data: { articles, articlesCount },
  } = ariticleRes;
  this.profile = profile;
  this.articles = articles;
  this.articlesCount = articlesCount;
 },
};
</script>

<style scoped></style>
