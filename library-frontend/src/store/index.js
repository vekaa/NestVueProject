import { createStore } from 'vuex'
import axios from 'axios';

export default createStore({
  state: {
    books: [],
    isAuthenticated: false,
    user: null,
  },
  getters: {
    books: state => state.books,
    isAuthenticated: state => state.isAuthenticated,
    user: state => state.user,
  },
  mutations: {
    setUser(state, user) {
      state.user = user;
    },
    setBooks(state, books) {
      state.books = books;
    },
    createNewBook(state, newBook){
      state.books.push(newBook);
    },
    updateBook(state, updatedBook) {
      const index = state.books.findIndex(book => book.id === updatedBook.id);
      if (index !== -1) {
        state.books.splice(index, 1, updatedBook);
      }
    },
    rentBook(state, newUserBook){
      state.user.books.push(newUserBook); 
      const book = state.books.find(book => book.id === newUserBook.id);
      if(book){
        book.numberOfCopies--;
      }
    },
    returnBook(state, oldUserBook){
      state.user.books = state.user.books.filter(book => book.id !== oldUserBook.id);   
      const book = state.books.find(book => book.id === oldUserBook.id);
      if(book){
        book.numberOfCopies++;
      }   
    },

  },
  actions: {
    fetchBooks({ commit }) {
      axios.get('http://localhost:3000/books')
        .then(response => {
          commit('setBooks', response.data);
        })
        .catch(error => {
          console.error('Error, fetchBooks:', error);
        });
      
    },
    createNewBook({ commit}, createBook) {
      axios.post(`http://localhost:3000/books`, createBook)
      .then(response => {
        commit('createNewBook', response.data);
      })
      .catch(error => {
        console.error('Error, createNewBook:', error);
      });
    },
    updateBook({ commit }, updatedBook) {
      axios.put(`http://localhost:3000/books/edit?id=${updatedBook.id}`, updatedBook)
        .then(response => {
          commit('updateBook', response.data);
        })
        .catch(error => {
          console.error('Error, updateBook:', error);
        });
    }, 
    login({ commit }, credentials) {
      return axios.post('http://localhost:3000/users/signin', credentials)
        .then(response => {
          const user = response.data;
          commit('setUser', user);
        });
    },
    logout({ commit }) {
      commit('setUser', null);
    },
    rentBook({ commit}, userBook) {
      axios.patch(`http://localhost:3000/users/update`, userBook)
        .then(response => {
          commit('rentBook',response.data);
        })
        .catch(error => {
          console.error('Error, retnBook:', error);
        });
    }, 
    returnBook({ commit}, userBook) {
      console.log(userBook);
      axios.patch(`http://localhost:3000/users/update`, userBook)
        .then(response => {
          commit('returnBook',response.data);
        })
        .catch(error => {
          console.error('Error, returnBook:', error);
        });
    },    
  },

})
