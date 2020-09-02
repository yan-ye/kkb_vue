export default {
    props: {
        to: {
            type: String,
            required: true
        },
    },
    //<a herf="#/home">abc</a>
    //<router-link to='/home'>abc</router-link>
    render(h) {
        return h(
            'a',
            { attrs: { href: '#' + this.to } },
            this.$slots.default
        )
    }
}