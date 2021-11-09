export default {
    template: `
    <section class="about-page app-main">
        <nav>
                <router-link to="/about/books">About Books</router-link> |
                <router-link to="/about/us">About us</router-link>
            </nav>
            
            <router-view></router-view>

    </section>
    `
}