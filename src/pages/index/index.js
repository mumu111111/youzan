import 'css/common.css'
import './index.css'

import Vue from 'vue'
import axios from 'axios'
import url from 'js/api.js'
import {Loadmore} from 'mint-ui'
Vue.component(Loadmore.name, Loadmore);

new Vue({
  el: '.container',
  data: {
    lists: null,
    allLoaded: false  //是否已经全部加载完
  },
  created(){
    axios.post(url.hotLists).then(res=>{
      this.lists = res.data.lists
    })
  },
  methods: {
    loadBottom() {
      // 加载更多数据
      //this.allLoaded = true;// 若数据已全部获取完毕
      //this.$refs.loadmore.onTopLoaded();
    },
    handleBottomChange(status) {
      //处理组件状态的变化  status 表示当前组件状态
      console.log(status)
    }
  }
})