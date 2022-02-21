<template>
 <div>
  <div class="article-meta">
   <nuxt-link to="">
    <img :src="article.author.image" />
   </nuxt-link>
   <div class="info">
    <a href="" class="author">{{ article.author.username }}</a>
    <span class="date">{{ article.createdAt | date('MMM DD, YYYY')}}</span>
   </div>
   <template v-if="userInfo && userInfo.username === article.author.username">
    <nuxt-link
     class="btn btn-outline-secondary btn-sm"
     :to="{ name: 'editorslug', params: { slug: article.slug } }"
    >
     <i class="ion-edit"></i> Edit Article
    </nuxt-link>
    <button class="btn btn-outline-danger btn-sm" @click="$emit('del',article.slug)">
     <i class="ion-trash-a"></i> Delete Article
    </button>
   </template>
   <template v-else>
    <button class="btn btn-sm btn-outline-secondary">
     <i class="ion-plus-round"></i>
     &nbsp; Follow Eric Simons <span class="counter">({{ 10 }})</span>
    </button>
    &nbsp;&nbsp;
    <button class="btn btn-sm btn-outline-primary">
     <i class="ion-heart"></i>
     &nbsp; Favorite Post <span class="counter">({{ 29 }})</span>
    </button>
   </template>
  </div>
 </div>
</template>

<script>
import { mapState } from "vuex";
export default {
 props: {
  article: {
   type: Object,
   required: true,
  },
 },
 computed: {
  ...mapState(["userInfo"]),
 },
};
</script>

<style scoped></style>
