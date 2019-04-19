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
    loading: false //是否可以加载  false为可以请求加载数据
  },
  created(){
    this.getLists()
  },
  methods: {
    getLists() {
      this.loading = true

      axios.post(url.hotLists).then(res=>{
        this.lists = res.data.lists
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