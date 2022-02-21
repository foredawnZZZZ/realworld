<template>
 <div class="editor-page">
  <div class="container page">
   <div class="row">
    <div class="col-md-10 offset-md-1 col-xs-12">
     <form>
      <fieldset>
       <fieldset class="form-group">
        <input
         type="text"
         class="form-control form-control-lg"
         placeholder="Article Title"
         v-model="article.title"
         :disabled="canInput"
        />
       </fieldset>
       <fieldset class="form-group">
        <input
         type="text"
         class="form-control"
         placeholder="What's this article about?"
         v-model="article.description"
         :disabled="canInput"
        />
       </fieldset>
       <fieldset class="form-group">
        <textarea
         class="form-control"
         rows="8"
         placeholder="Write your article (in markdown)"
         v-model="article.body"
         :disabled="canInput"
        ></textarea>
       </fieldset>
       <fieldset class="form-group">
        <input
         type="text"
         v-model="tagVal"
         class="form-control"
         @keyup.enter.prevent="onAddTag"
         placeholder="Enter tags"
         :disabled="canInput"
        />
        <div class="tag-list">
         <span
          v-for="(tag, index) in article.tagList"
          :key="tag"
          class="tag-default tag-pill"
         >
          <i class="ion-close-round" @click="onDelTag(index)"></i>
          {{ tag }}
         </span>
        </div>
       </fieldset>
       <button
        class="btn btn-lg pull-xs-right btn-primary"
        type="button"
        @click="onSubmit"
        :disabled="canInput"
       >
        Publish Article
       </button>
      </fieldset>
     </form>
    </div>
   </div> 
  </div>
 </div>
</template>

<script>
import { createArticles, updateArticle, getArticle } from "@/api/article";
export default {
 middleware: "auth",
 data() {
  return {
   article: {
    title: "",
    description: "",
    body: "",
    tagList: [],
   },
   tagVal: "",
   canInput: false,
  };
 },
 computed: {
  isEditUpdate() {
   return this.$route.params.slug;
  },
 },
 async mounted() {
  if (this.isEditUpdate) {
   this.canInput = true;
   const { data } = await getArticle(this.isEditUpdate);
   const { article } = data;
   const { title, description, body, tagList } = article;
   const res = { title, description, body, tagList };
   this.article = res;
   this.canInput = false;
  }
 },
 methods: {
  onAddTag() {
   if (!this.tagVal) return;
   if (this.article.tagList.indexOf(this.tagVal) === -1) {
    this.article.tagList.push(this.tagVal);
    this.tagVal = "";
   }
  },
  onDelTag(idx) {
   this.article.tagList.splice(idx, 1);
  },
  async onSubmit() {
   this.canInput = true;
   try {
    const { data } = this.isEditUpdate
     ? await updateArticle(this.isEditUpdate, { article: this.article })
     : await createArticles({ article: this.article });
    const { article } = data;
    this.$router.push({
     name: "article",
     params: {
      slug: article.slug,
     },
    });
   } catch (error) {
    this.canInput = false;
    console.dir(error);
   }
  },
 },
};
</script>

<style scoped></style>
