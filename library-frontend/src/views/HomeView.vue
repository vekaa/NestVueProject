<template>


    <div class="container">
      <div class="row">
        <h1 v-if="user" class="user">Hello {{ user.username }}</h1>
      </div>
      <div class="row">
        <div class="col-md-4" v-for="book in books" :key="book.id">             
                      
            <div v-if="isUserRentThisBook(book)">
              <BookCard  :book="book" :userId="user.id" :isRent=true />
            </div>
            <div v-else>
              <BookCard  :book="book" :userId="user.id" :isRent=false />
            </div>              
          </div>

      </div>           
  </div>
</template>

<script>
// @ is an alias to /src
//import { mapGetters } from 'vuex';
import BookCard from '../components/BookCard.vue';

export default {
  name: 'HomeView',
  components: {
    BookCard,
  },
  computed: {
    books(){
      return this.$store.state.books;
    },
    //...mapGetters(['user']),
    user() {
      return this.$store.state.user;
    },
    isUserRentThisBook(){
      return book => this.user.books.some( userBook => userBook.id === book.id);
    }
  },
  created() {
    this.$store.dispatch('fetchBooks');
  },
}
</script>

<style scoped>
.user {
  text-align: left;
}
</style>
