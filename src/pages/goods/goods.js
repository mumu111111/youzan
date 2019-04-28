
  import './goods_common.css'
  import './goods_custom.css'
  import './goods.css'
  import './goods_theme.css'
  import './goods_mars.css'
  import './goods_sku.css'
  import './goods_transition.css'

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
      swipeList: [],
      showSku: false,
      skuType:  1,
      skuNum: 1,
      isAddCart: false,
      showAddMessage: false
    },
    created() {
      this.getDetails()
    },
    methods: {
      getDetails() {
        axios(url.details, {id}).then(res=>{
          //先处理原始数据，在赋值
          let data = res.data.data
          console.log('details',data)
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
          console.log('detals', data)
          //轮播组件需要的图片
          this.details.imgs.forEach(item=>{
          console.log('item', this.swipeList)
          
            this.swipeList.push({
              clickUrl: '',
              img: item
            })
            console.log('swiperlis', this.swipeList)
            
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
          this.dealLists = res.data.lists
        })
      },
      chooseSku(type) {//3个地方可触发后，显示加入购物车弹框
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
      },
      changeSkuNum(num) {
        if(num <0 && this.skuNum ===1) return 
        this.skuNum += num
      },
      addCart() {
        axios.post(url.cartAdd, {id, number: this.skuNum}).then(res=>{
          if(res.data.status === 200){
            this.isAddCart = true
            this.showAddMessage = true
            this.showSku = false
            setTimeout(()=>{
              this.showAddMessage = false
            },1000)
          }
        })
      }
    },


    components: {
      Swipe
    },
    watch: {
      showSku(val) {
        document.body.style.overflow = val ? 'hidden' : 'auto'
        document.body.style.height = val ? '100%' : 'auto'
        document.querySelector('html').style.overflow = val ? 'hidden' : 'auto'
        document.querySelector('html').style.height = val ? '100%' : 'auto'
      }
    },
    mixins: [mixin]


  })

