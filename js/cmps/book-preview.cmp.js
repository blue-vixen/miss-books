export default {
    props: ['book'],
    template: `
        <div class="book-preview">
            <img v-bind:src="book.thumbnail"/>
            <p>Title : {{book.title}}</p>
            <p> Price: {{formatCurrency}}</p>
        </div>
    `,

    computed: {
        formatCurrency() {
            const { currencyCode, amount } = this.book.listPrice
            return new Intl.NumberFormat('he-IL', { style: 'currency', currency: currencyCode }).format(amount)

        }
    }
}