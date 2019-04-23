import 'css/common.css'
import './category.css'

import Vue from 'vue'
import axios from 'axios'
import url from 'js/api.js'

import Foot from 'components/Foot.vue'
import mixin from 'js/mixin.js'

new Vue({
    el: '.container',
    data: {
        topLists: null,
        subData: null,
        rankData: null,
        topIndex: 0 //默认第一个分类
    },
    created() {
        console.log(1)
        this.getTopList()
        console.log(2)
        
        this.getSubList(0)
        console.log(3)
        
    },
    methods: {
        getTopList() {
            axios.get(url.topList).then((res) =>{
                console.log('top',res.data.lists)
                
                this.topLists = res.data.lists

            })
            // .catch((res)=>{

            // })
        },
        getSubList(index,id) {
            console.log('id',id)
            this.topIndex = index
            if(index === 0){ 
                this.getRank()
            }else{
                axios.get(url.subList,{id}).then((res) =>{
                    console.log('sub',res.data.data)
                    this.subData = res.data.data
                })
            }
        },
        getRank(){
            axios.get(url.rankList).then((res) =>{
                console.log('rank',res.data.data)
                
                this.rankData = res.data.data
                console.log('hotGoods',res.data.data.hotGoods)
            })
        },
        toSearch(list) {
            location.href=`search.html?keyword=${list.name}&id=${list.id}`
        }
    },
    
    components: {
        Foot
    },
    mixins: [mixin]
})