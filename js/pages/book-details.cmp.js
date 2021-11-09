import { bookService } from "../services/books-service.js";
import longText from '../cmps/long-text.cmp.js'
import reviewAdd from '../cmps/review-add.cmp.js'
import { eventBus } from "../services/event-bus-service.js";

export default {
    template: `
    <section v-if="book" class="book-details app-main">
        <div v-if="!showFormReview" class="details-container">
            <h3>Book Details:</h3>
            <div class="book-imgs">
                <img class="sale-tag" v-if="book.listPrice.isOnSale" src="./img/sale.png"/>
                <img v-bind:src="book.thumbnail"/>
            </div>
            <p>Title: {{book.title}}</p>
            <p>Subtitle: {{book.subtitle}}</p>
            <h3>Authors:</h3>
            <ul class="authors">
                <li v-for="author in book.authors">
                    <p>{{author}}</p>
                </li>
            </ul>
            <long-text :description="book.description"></long-text>
            <p :class="colorPrice">Price: {{formatCurrency}}</p>
            <div class="book-tags">
                <p>{{LengthOfRead}}</p>
                <p>{{AgeOfBook}}</p>
            </div>
            <!-- <button @click="$emit('close')" >X</button> -->
            <router-link :to="'/book'">Go Back</router-link>
            <router-link :to="'/book/'+prevBookId">< Previous Book</router-link>
            <router-link :to="'/book/'+nextBookId">Next Book ></router-link>
            <div class="reviews-container">
                <h3>User Reviews:</h3>
                <ul class="reviews">
                    <li v-for="review in book.reviews" class="review">
                        <p v-if="review.fullName">{{review.fullName}}'s review:</p>
                        <div class="stars">
                            <span v-for="num in 5" class="fa fa-star" :class="{checked:num<=review.rating}"></span>
                        </div>
                        <!-- <p v-if="review.rating">Rating: {{review.rating}}</p> -->
                        <p v-if="review.readAt">Read at: {{review.readAt}}</p>
                        <p v-if="review.reviewTxt">{{review.reviewTxt}}</p>
                        <button @click="remove(review.id)">x</button>
                    </li>
                </ul>
            </div>
        </div>
        <review-add v-else @updated="update"></review-add>
        <button @click="showFormReview = !showFormReview">Add Review</button>
    </section>
    <section v-else class="loader app-main">
        <h2>Loading...</h2>
    </section>
    `,
    data() {
        return {
            book: null,
            showFormReview: false,
            nextBookId: null,
            prevBookId: null,
        }
    },
    created() {
        // const { bookId } = this.$route.params;
        // bookService.getById(bookId)
        //     .then(book => this.book = book)
    },
    methods: {
        createMsg(txt, type) {
            return {
                txt,
                type
            }
        },
        remove(reviewId) {
            const { bookId } = this.$route.params;
            bookService.removeReview(bookId, reviewId)
                .then(book => {
                    console.log(book)
                    const msg = this.createMsg('Review Deleted Successfully!', 'success')
                    eventBus.$emit('showMsg', msg)
                    this.update(book)
                })

        },
        update(book) {
            console.log(book)
            this.book = book
            this.showFormReview = false
        }
    },
    computed: {
        LengthOfRead() {
            const { pageCount } = this.book
            // console.log(pageCount)
            if (pageCount > 500) return 'Long Reading'
            else if (pageCount > 200) return 'Decent Reading'
            else if (pageCount < 100) return 'Light Reading'
        },
        AgeOfBook() {
            const { publishedDate } = this.book
            const presentYear = (new Date).getFullYear()
            if (presentYear - publishedDate >= 10) return 'Veteran Book'
            else if (publishedDate <= presentYear) return 'New!'
        },
        formatCurrency() {
            const { currencyCode, amount } = this.book.listPrice
            return new Intl.NumberFormat('he-IL', { style: 'currency', currency: currencyCode }).format(amount)

        },
        colorPrice() {
            const { amount } = this.book.listPrice
            if (amount > 150) return 'red'
            else if (amount < 20) return 'green'
        },
        shortDesc() {
            const { description } = this.book
            return description.substr(0, 100);
        }
    },
    components: {
        longText,
        reviewAdd
    },
    watch: {
        '$route.params.bookId': {
            handler() {
                const { bookId } = this.$route.params;
                bookService.getById(bookId)
                    .then(book => this.book = book)
                bookService.getNextBookId(bookId)
                    .then(bookId => this.nextBookId = bookId)
                bookService.getPrevBookId(bookId)
                    .then(bookId => this.prevBookId = bookId)
            },
            immediate: true
        }
    }

}