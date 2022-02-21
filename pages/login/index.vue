<template>
 <div class="auth-page">
  <div class="container page">
   <div class="row">
    <div class="col-md-6 offset-md-3 col-xs-12">
     <h1 class="text-xs-center">{{ isLogin ? "Sign in" : "Sign up" }}</h1>
     <p class="text-xs-center">
      <nuxt-link v-if="isLogin" to="/register">Need an account?</nuxt-link>
      <nuxt-link v-else to="/login">Have an account?</nuxt-link>
     </p>
     <ul class="error-messages">
      <li>That email is invalid.</li>
     </ul>
     <form @submit.prevent="onLogin">
      <fieldset v-if="!isLogin" class="form-group">
       <input
        class="form-control form-control-lg"
        type="text"
        placeholder="Your Name"
        v-model="user.username"
        required
       />
      </fieldset>
      <fieldset class="form-group">
       <input
        class="form-control form-control-lg"
        type="email"
        placeholder="Email"
        v-model="user.email"
        required
       />
      </fieldset>
      <fieldset class="form-group">
       <input
        class="form-control form-control-lg"
        type="password"
        placeholder="Password"
        v-model="user.password"
        required
       />
      </fieldset>
      <button class="btn btn-lg btn-primary pull-xs-right">
       {{ isLogin ? "Sign in" : "Sign up" }}
      </button>
     </form>
    </div>
   </div>
  </div>
 </div>
</template>

<script>
const Cookie = process.client ? require("js-cookie") : undefined;
import { getLogin, getRegister } from "@/api/user";
export default {
 middleware: "noauth",
 data() {
  return {
   user: {
    email: "18602151918@163.com",
    password: "dawn19971029.",
    username: "",
   },
  };
 },
 computed: {
  isLogin() {
   return this.$route.name === "login";
  },
 },
 methods: {
  async onLogin() {
   const { data } = this.isLogin
    ? await getLogin({ user: this.user })
    : await getRegister({ user: this.user });
   this.$store.commit("setUserInfo", data.user);
   Cookie.set("userInfo", JSON.stringify(data.user));
   this.$router.push("/");
  },
 },
};
</script>

<style scoped></style>
