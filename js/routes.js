import bookApp from './pages/book-app.cmp.js'
import homePage from './pages/home-page.cmp.js'
import aboutPage from './pages/about-page.cmp.js'
import bookDetails from './pages/book-details.cmp.js'
import bookAdd from './pages/book-add.cmp.js'

const aboutBooks = {
    template: `
    <section class="about-books">
        <h3>About Books</h3>
        <p>
        a written or printed work consisting of pages glued or sewn together along one side and bound in covers.
        </p>
    </section>`,
}

const aboutUs = {
    template: `
    <section class="about-us">
        <h3>About us</h3>
        <p>We sell books</p>
    </section>
`
}

const routes = [
    {
        path: '/',
        component: homePage
    },
    {
        path: '/about',
        component: aboutPage,
        children: [
            {
                path: 'books',
                component: aboutBooks
            },
            {
                path: 'us',
                component: aboutUs
            }
        ]

    },
    {
        path: '/book',
        component: bookApp
    },
    {
        path: '/book/:bookId',
        component: bookDetails
    },
    {
        path: '/addbook',
        component: bookAdd
    }
];

export const router = new VueRouter({ routes });