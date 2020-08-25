//自定义插件 
const myPlugin = {
    //     <div>
    //      <h2>我是title</h2>
    //      <p>
    //          <span>
    //              <img src="./svg/cart.svg" alt="">
    //          </span>
    //          我是内容
    //     </p>
    //  </div>
    install(Vue, options) {
        Vue.component('test-div', {
            props: {
                h_title: String,
                leve: String,
                title: String,
                icon: String,
                icon_alt: String,

            },
            render(h) {
                let children = [];
    
                children.push(
                    h(
                        'h' + this.leve,
                        { attrs: { title: this.h_title } },
                        this.title,
                    ),
                    h(
                            'p',
                            {},
                            [ h(
                                'span',
                                {},
                                [ h(
                                    'img',
                                    { attrs: { src: this.icon, alt: this.icon_alt }}
                                )]
                            )]
                        )
                );
            
                
                return h(
                    'div',
                    children.concat(this.$slots.default),
                )
              


            }

        });

    }
}
if (typeof window !== 'undefined' && window.Vue) {
    window.Vue.use(myPlugin)
}