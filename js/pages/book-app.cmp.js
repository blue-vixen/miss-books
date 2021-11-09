import { bookService } from "../services/books-service.js";
import bookList from '../cmps/book-list.cmp.js';
import bookDetails from './book-details.cmp.js';
import bookFilter from '../cmps/book-filter.cmp.js';


export default {

    template: `
        <section class="book-app app-main">
            <book-filter @filtered="setFilter"/>
            <book-list :books="booksToShow" @selected="selectBook" v-if="!selectedBook"/>
            <book-details v-if="selectedBook" :book="selectedBook" @close="closeDetails"/>
        </section>
    `,
    data() {
        return {
            books: null,
            selectedBook: null,
            filterBy: null
        }
    },
    created() {
        bookService.query()
            .then(books => this.books = books)
        // this.books = bookService.query()
    },
    methods: {
        selectBook(book) {
            this.selectedBook = book;
        },
        closeDetails() {
            this.selectedBook = null;
        },
        setFilter(filterBy) {
            this.filterBy = filterBy;
        }
    },
    computed: {
        booksToShow() {
            if (!this.filterBy) return this.books;
            const minPrice = +this.filterBy.fromPrice;
            const maxPrice = +this.filterBy.toPrice;
            const searchStr = this.filterBy.title.toLowerCase();
            return this.books.filter(book => { return book.title.toLowerCase().includes(searchStr) })
                .filter(book => {
                    if (minPrice === 0 && maxPrice === 0) return true
                    return book.listPrice.amount > minPrice && book.listPrice.amount < maxPrice || !maxPrice
                })

        }
    },
    components: {
        bookList,
        bookFilter,
        bookDetails
    },

}