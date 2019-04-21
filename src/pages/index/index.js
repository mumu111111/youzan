import 'css/common.css'
import './index.css'

import Vue from 'vue'
import axios from 'axios'
import url from 'js/api.js'
import { InfiniteScroll } from 'mint-ui';

Vue.use(InfiniteScroll);

new Vue({
  el: '.container',
  data: {
    lists: null,
    loading: false, //是否可以触发 falae为可以被触发
  },
  created(){
    this.getLists()
  },
  methods: {
    getLists() {
      this.loading = true  //为true时无限滚动不会被触发 
      axios.get(url.hotLists).then(res=>{
        console.log(res.data.lists)
        if(this.lists){
          this.lists = this.lists.concat(res.data.lists)
        }else{
          this.lists = res.data.lists
        }
        this.loading = false
      
      })
      
    }
  }
})
