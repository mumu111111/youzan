
  import './goods_common.css'
  import './goods_custom.css'
  import './goods.css'
  import './goods_theme.css'
  import './goods_mars.css'
  import './goods_sku.css'

  import Vue from 'vue'
  import axios from 'axios'
  import url from 'js/api.js'
  import qs from 'qs'
  import mixin from 'js/mixin.js'
  import Swipe from 'components/Swipe.vue'

  let {id} = qs.parse(location.search.substr(1))  //解析地址中的参数id
  let detailTab = ['商品详情', '本店成交']

  new Vue({
    el: '#app',
    data: {
      details: null,
      detailTab,
      tabIndex: 0,
      dealLists: null,
      swipeList: null,
      showSku: false,
      skuType:  1
    },
    created() {
      this.getDetails()
    },
    methods: {
      getDetails() {
        axios.get(url.details, {id}).then(res=>{
          //先处理原始数据，在赋值
          let data = res.data.data
          data.skuList.forEach(sku=>{
            let lists = []
            sku.lists.forEach(item=>{
              lists.push({
                active: false,
                tag: item
              })
            })
            sku.lists = lists
          })
          this.details = data
          //轮播组件需要的图片
          this.details.imgs.forEach(item=>{
            this.swipeList.push({
              clickUrl: '',
              image: item
            })
          })
        })
      },
      changeTabIndex(index) {
        this.tabIndex = index
        if(index){//index!===0也就是为1时 焦点状态为“成交记录” 
          this.getDeal()
       }
      },
      getDeal() {
        axios.post(url.deal, {id}).then(res=>{
          this.dealLists = res.data.data.lists
        })
      },
      chooseSku(type) {
        this.showSku = true
        this.skuType = type
      },
      chooseTag(item,index,arr) {
        if(item.active){
          item.active = false
        }else{
          arr.forEach((cur, i)=>{
            cur.active = i===index
          })
        }
      } 
    },


    components: {
      Swipe
    },
    mixins: [mixin]


  })

