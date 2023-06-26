<template>
    <div>
      <div class="container col-md-4 form-wrapper">
      <h1>LogIn page</h1>
      <form @submit.prevent="submitForm">
        <div class="form-group">
          <label for="title">Username:</label>
          <input type="text" id="email" v-model="username" class="form-control" required>
        </div>
        <div class="form-group">
          <label for="author">Password:</label>
          <input type="text" id="password" v-model="password" class="form-control" required>
        </div>
        <br>
        <button type="submit" class="btn btn-primary">LogIn</button>
      </form>
    </div>

    </div>    
  </template>
  
  <script>
  import router from "@/router";

  export default {
    data() {
      return {
        username: '',
        password: '',
      };
    },
    methods: {
      submitForm() {
        const credentials = {
            username: this.username,
            password: this.password,
        };        
        this.$store.dispatch('login', credentials)
          .then(() => {
            this.$router.push('/home');
          })
          .catch(error => {
            if(error.response.status === 404){
                window.confirm("User not exist");
                router.push('/');
            }
          });
      },
    },
  };
  </script>
  