import 'css/common.css'
import './search.css'

import Vue from 'vue'
import axios from 'axios'
import url from 'js/api.js'

import mixin from 'js/mixin.js'
import qs from 'qs'
import Velocity from 'velocity-animate'

let {keyword, id} = qs.parse(location.search.substr(1))
console.log(1,{keyword, id})
new Vue({
    el: '.container',
    data: {
        searchList: null,
        show: false
    },
    created() {
        this.getsearchList()
    },
    methods: {
        getsearchList() {
            axios.get(url.searchList, {keyword, id}).then(res=>{
                console.log('res',res.data.lists)
                this.searchList = res.data.lists
            })
        },
        move() {
            if(document.body.scrollTop > 100){
                this.show = true
            }else{
                this.show = false
            }
        },
        toTop() {
            Velocity(document.body, 'scroll', { duration: 300})
        }
    },
    mixins: [mixin]
})