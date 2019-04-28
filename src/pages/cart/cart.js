import './cart_base.css'
import './cart_trade.css'
import './cart.css'

import Vue from 'vue'
import axios from 'axios'
import mixin from 'js/mixin.js'
import url from 'js/api.js'



new Vue({
    el: '.container',
    data: {
        lists: null
    },
    created() {

    },
    methods: {
        getLists() {
            axios.get(url.cartLists).then(res=>{
                this.lists = res.data.cartList
            })
        }
    },
    mixins: [mixin]

})