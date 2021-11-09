export default {
    template: `
        <div class="book-filter">
            <form @submit.prevent="filter">
                <label>Search</label>
                <input v-model="filterBy.title" type="text" placeholder="Search by name">
                <label>Price:</label>
                <input v-model="filterBy.fromPrice" type="number" placeholder="from...">
                <input v-model="filterBy.toPrice" type="number" placeholder="up to...">
                <button @click="filter">Search</button>
            </form>
            <router-link to="/addbook">Add a new book</router-link>
        </div>
    `,
    data() {
        return {
            filterBy: {
                title: '',
                fromPrice: null,
                toPrice: null
            }
        };
    },
    methods: {
        filter() {
            // this.$emit('filtered', { ...this.filterBy });
            //deep copy
            this.$emit('filtered', JSON.parse(JSON.stringify(this.filterBy)));
        }
    }
}