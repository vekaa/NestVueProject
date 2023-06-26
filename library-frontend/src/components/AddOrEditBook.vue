<template>
    <div class="col-md-12 form-wrapper">
      <h2 v-if="!isEditMode">Add new book</h2>
      <h2 v-if="isEditMode">Edit book</h2>
      <form @submit.prevent="submitForm">
        <div class="form-group">
          <label for="title">Title:</label>
          <input type="text" id="title" v-model="book.title" class="form-control" required>
        </div>
        <div class="form-group">
          <label for="author">Author:</label>
          <input type="text" id="author" v-model="book.author" class="form-control" required>
        </div>
        <div class="form-group">
          <label for="copies">Count:</label>
          <input type="number" id="copies" v-model="book.numberOfCopies" class="form-control" required>
        </div>
        <button type="submit" class="btn btn-primary">Save</button>
        <button v-if="isEditMode" @click.prevent="cancelEdit" class="btn btn-secondary">Cancel</button>
      </form>
    </div>
  </template>
  
  <script>
  import axios from "axios";
  import router from "@/router";

  export default {  
    data() {
      return {
        book: {},
      };
    },
    mounted() {
    this.id = this.$route.params.id;  
    if (this.$route.params.id !== '0' ) {
    this.fetchBook();
    if (!this.book?.title){
        this.isEditMode = true;
    }
    }

    },
    methods: {
      fetchBook() {
        axios.get(`http://localhost:3000/books/${this.id}`)
          .then(response => {
            this.book = response.data;
          })
          .catch(error => {
            if(error.response.status === 404){
                window.confirm("Book not exist");
                router.push('/home');
            }
          });
      },
      submitForm() {
        if (this.isEditMode) {
          this.$store.dispatch('updateBook', this.book)
            .then(() => { this.$router.push('/home');
            });
        } else {
            this.$store.dispatch('createNewBook', this.book)
            .then(() => { this.resetForm();
            });
        }
      },
      resetForm() {
        this.book = {
          title: "",
          author: "",
          copies: 0,
        };
        this.isEditMode = false;
      },
      cancelEdit() {
        router.go(-1);
      },
    },
  };
  </script>
  
  <style scoped>
  .form-group {
    margin-bottom: 1rem;
  }
  </style>
  