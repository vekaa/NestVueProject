<template>
  <div class="card mb-4 shadow-sm">
    <div class="card-body">
      <h2 class="card-img-top">{{ book.title }}</h2>
      <img class="img-bookcover" src="../assets/cover.jpg" alt="BookCover" />
      <h3 class="card-text">{{ book.author }}</h3>
      <div class="d-flex justify-content-between align-items-center">
        <div class="btn-group" style="margin-bottom: 20px;">
            <router-link :to="{name: 'Edit', params: {id: book.id}}" class="btn btn-sm btn-primary">Edit</router-link>
            <button v-if="!isRent" class="btn btn-sm btn-success" v-on:click="rentBook()">Rent</button> 
            <button v-else class="btn btn-sm btn-danger" v-on:click="returnBook()">Return</button> 
        </div>
      </div>

      <div class="card-footer">
        <small class="text-muted">Available: {{ book.numberOfCopies}}</small>
      </div>
        
    </div>
  </div>
</template>
  
  <script>

  export default {
    name: "BookCard",
    props: {
      book: {
        type: Object,
        required: true,
      },
      userId: {
        type: Number,
        required: true,
      },
      isRent: {
        type: Boolean,
        required: true,
      }
    },
    methods: {
      rentBook(){
        const userBook = {
            userId: this.userId,
            bookId: this.book.id,
            isRent: true,
        };    
        this.$store.dispatch('rentBook', userBook);
      },
      returnBook(){
        const userBook = {
            userId: this.userId,
            bookId: this.book.id,
            isRent: false,
        };    
        this.$store.dispatch('returnBook', userBook);
      }
    }
  };
  </script>
  
  <style scoped>
  .img-bookcover {
    height: 200px;
  }
  </style>
  