<template>
 <div class="col-xs-12 col-md-8 offset-md-2">
  <form class="card comment-form">
   <div class="card-block">
    <textarea
     v-model="comment.body"
     class="form-control"
     placeholder="Write a comment..."
     rows="3"
    ></textarea>
   </div>
   <div class="card-footer">
    <img src="http://i.imgur.com/Qr71crq.jpg" class="comment-author-img" />
    <button class="btn btn-sm btn-primary" @click.prevent="onComment">
     Post Comment
    </button>
   </div>
  </form>

  <div class="card" v-for="comment in comments" :key="comment.id">
   <div class="card-block">
    <p class="card-text">
     {{ comment.body }}
    </p>
   </div>
   <div class="card-footer">
    <nuxt-link to="" class="comment-author">
     <img :src="comment.author.image" class="comment-author-img" />
    </nuxt-link>
    &nbsp;
    <nuxt-link to="" class="comment-author">{{
     comment.author.username
    }}</nuxt-link>
    <span class="date-posted">{{
     comment.createdAt | date("MMM DD, YYYY")
    }}</span>
    <template v-if="userInfo">
     <span
      class="mod-options"
      v-if="userInfo.username === comment.author.username"
      @click="onDelComment(comment.id)"
     >
      <i class="ion-trash-a"></i>
     </span>
    </template>
   </div>
  </div>
 </div>
</template>

<script>
import { getComments, addAnComment, deleteAnComment } from "@/api/article";
import { mapState } from "vuex";
export default {
 data() {
  return {
   comments: [],
   comment: {
    body: "",
   },
  };
 },
 computed: {
  ...mapState(["userInfo"]),
 },
 async mounted() {
  const { data } = await getComments(this.$route.params.slug);
  const { comments } = data;
  this.comments = comments;
 },
 methods: {
  async onComment() {
   const { data } = await addAnComment(this.$route.params.slug, {
    comment: this.comment,
   });
   this.comment.body = "";
   this.comments.push(data.comment);
  },
  async onDelComment(id) {
   const idx = this.comments.findIndex((item) => item.id === id);
   await deleteAnComment(this.$route.params.slug, id);
   this.comments.splice(idx, 1);
  },
 },
};
</script>

<style scoped></style>
