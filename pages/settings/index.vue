<template>
 <div class="settings-page">
  <div class="container page">
   <div class="row">
    <div class="col-md-6 offset-md-3 col-xs-12">
     <h1 class="text-xs-center">Your Settings</h1>

     <form @submit.prevent="onSubmit">
      <fieldset>
       <fieldset class="form-group">
        <input
         class="form-control"
         type="text"
         placeholder="URL of profile picture"
         v-model="user.image"
         :disabled="canInput"
        />
       </fieldset>
       <fieldset class="form-group">
        <input
         class="form-control form-control-lg"
         type="text"
         placeholder="Your Name"
         v-model="user.username"
         :disabled="canInput"
        />
       </fieldset>
       <fieldset class="form-group">
        <textarea
         class="form-control form-control-lg"
         rows="8"
         placeholder="Short bio about you"
         v-model="user.bio"
         :disabled="canInput"
        ></textarea>
       </fieldset>
       <fieldset class="form-group">
        <input
         class="form-control form-control-lg"
         type="text"
         placeholder="Email"
         v-model="user.email"
         :disabled="canInput"
        />
       </fieldset>
       <fieldset class="form-group">
        <input
         class="form-control form-control-lg"
         type="password"
         placeholder="Password"
         v-model="user.password"
         :disabled="canInput"
        />
       </fieldset>
       <button
        class="btn btn-lg btn-primary pull-xs-right"
        :disabled="canInput"
       >
        Update Settings
       </button>
      </fieldset>
     </form>
     <hr />
     <button class="btn btn-outline-danger" @click="onLogout">
      Or click here to logout.
     </button>
    </div>
   </div>
  </div>
 </div>
</template>

<script>
import { mapState } from "vuex";
import { getCuerrentUser, updateUser } from "@/api/user";
const Cookie = process.client ? require("js-cookie") : undefined;

export default {
 middleware: "auth",
 data() {
  return {
   user: {
    bio: null,
    email: "",
    image: "",
    password: "",
    username: "",
   },
   canInput: false,
   canClick: false,
  };
 },
 computed: {
  ...mapState(["userInfo"]),
 },
 async mounted() {
  this.canInput = true;
  const { data } = await getCuerrentUser();
  const { user } = data;
  const { bio, email, image, username } = user;
  const res = { bio, email, image, username };
  this.user = res;
  this.canInput = false;
 },
 methods: {
  async onSubmit() {
   this.canInput = true;
   const { data } = await updateUser({ user: this.user });
   this.$store.commit("setUserInfo", data.user);
   Cookie.set("userInfo", JSON.stringify(data.user));
   this.canInput = false;
   this.$router.push({
    name: "profile",
    params: {
     username: data.user.username,
    },
   });
  },
  onLogout() {
   this.$store.commit("setUserInfo", null);
   Cookie.remove("userInfo");
   this.$router.push("/");
  },
 },
};
</script>

<style scoped></style>
