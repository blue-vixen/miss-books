import { storageService } from "../services/async-storage-service.js";
import { bookService } from "../services/books-service.js";
import { eventBus } from "../services/event-bus-service.js";


export default {
    props: ['book'],
    template: `
    <form @submit.prevent="save" class="review-form app-main">
        <label for="full-name">Full Name:</label>
        <input v-model="bookReview.fullName" id="full-name" name="full-name" type="text" placeholder="Reader name">
        <label for="rating">Rate:</label>
        <div class="stars">
            <span v-for="num in 5" class="fa fa-star" :class="{checked:num<=bookReview.rating}" @click="changeColor(num)"></span>
        </div>
        <label for="read-date">Read at:</label>
        <input v-model="bookReview.readAt" type="date" id="read-date" name="read-date">
        <label for="book-review"></label>
        <textarea v-model="bookReview.reviewTxt" id="book-review" name="book-review" rows="4" cols="50" required placeholder="Write your review here"></textarea>
        <button>Save Review</button>
    </form>
    `,
    data() {
        return {
            bookReview: {
                id: null,
                fullName: null,
                rating: null,
                readAt: null,
                reviewTxt: null
            }
        }
    },
    methods: {
        createMsg(txt, type) {
            return {
                txt,
                type
            }
        },
        save() {
            if (!this.bookReview.fullName) this.bookReview.fullName = 'Books Reader'
            this.bookReview.id = bookService.makeId()
            const { bookId } = this.$route.params;
            bookService.saveReview(this.bookReview, bookId)
                .then(book => {
                    console.log('book after saveReview', book)
                    const msg = this.createMsg('Review Added Successfully!', 'success')
                    eventBus.$emit('showMsg', msg)
                    this.$emit('updated', book)
                })
        },
        changeColor(num) {
            this.bookReview.rating = num;
            console.log('hello', num)
        }
    },

}