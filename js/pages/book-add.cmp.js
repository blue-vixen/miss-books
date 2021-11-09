import { bookService } from "../services/books-service.js";

export default {


    template: `
    <section class="add-book app-main">
        <h3>Add a new book:</h3>
        <form @submit.prevent="search">
            <input v-model="title" type="text" placeholder="Search for a book">
            <button>Search</button>
        </form>
        <ul class="new-books">
            <li v-for="(book, idx) in newBooks" class="new-book">
                <p>{{idx+1}}. {{book.volumeInfo.title}} <button @click="addBook(book)">+</button></p>
            </li>
        </ul>
    </section>
    `,
    data() {
        return {
            newBooks: null,
            title: null,
        }
    },
    methods: {
        search() {
            bookService.getBooksFromGoogle(this.title)
                .then((res) => {
                    console.log('books returned from google api:', res)
                    this.newBooks = res;
                })
        },
        addBook(book) {
            console.log(book)
            bookService.addGoogleBook(book)
        }
    },
    components: {
        bookService
    }
}