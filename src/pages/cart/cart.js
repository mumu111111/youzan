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
        lists: null,
        allSelected: true,  //默认全选选中状态
        total: 0, //总计价格
        editingShop: false,
        editingShopIndex: -1
        
    },
    created() {
        this.getList()
    },
    computed: {
        selectLists() { //正常状态下 当前选中的商品列表
            if(!(this.lists && this.lists.length)) return [] //排除其他情况 
            let arr = []
            let total = 0
            this.lists.forEach(shop => { //正常状态下，可以选择多个商铺下的商品
                shop.goodsList.forEach(good => {
                    if(good.checked) {
                        arr.push(good)
                        total += good.price * good.number
                    }
                })
            })
            this.total = total
            return arr
        },
        removeLists() {
            if(!this.editingShop) {　 //存在 即编辑状态 
                return []
            }else{                    //编辑状态下 只能操作一个商铺  不能遍历多商铺
                let arr = []
                this.editingShop.goodsList.forEach(good => {
                    if(good.removeChecked) {
                        arr.push(good)
                    }
                })
                return arr
            }            
        },
        allSelected:{
            get() {
                if(this.lists && this.lists.length) {
                    return this.lists.every(shop => {
                        return shop.checked
                    })
                }
                return false
            },
            set(newVal) {
                this.lists.forEach(shop => {
                    shop.checked = newVal
                    shop.goodsList.forEach(good => {
                        good.checked = newVal
                    })
                })
            }
        },
        allRemoveSelected: {
            get() {
                if(this.editingShop) {  //编辑状态 
                    return this.editingShop.removeChecked
                }
                return false
            },
            set(newVal) {
                if(this.editingShop) {
                    this.editingShop.removeChecked = newVal
                    this.editingShop.goodsList.forEach(good =>{
                        good.removeChecked = newVal
                    })
                    return 
                }
            }











        }
    },
    methods: {
        getList() {
            axios.get(url.cartLists).then(res=>{
                let lists = res.data.cartList
                console.log('lists',this.lists)
                lists.forEach(shop=>{
                    shop.checked = true
                    shop.removeChecked = false //默认编辑下 不选中（删除）商品
                    shop.editing = false
                    shop.editingMsg = '编辑'
                    shop.goodsList.forEach(good => {
                        good.checked = true
                        good.removeChecked = false
                    })
                })
                this.lists = lists
            })
        },
        selectShop(shop){
            let attr = this.editingShop ? 'removeChecked' : 'checked'
            shop[attr] = !shop[attr]  // 切换选中、未选中状态
            shop.goodsList.forEach(good => { //实现选中商铺后， 商铺内多友商品跟随选中或未选中
                good[attr] = shop[attr]
            })
            // this.isSelectAll()
        },
        selectGood(shop, good) {
            // good.checked = !good.checked
            let attr = this.editingShop ? 'removeChecked' : 'checked'
            good[attr] = !good[attr]
            shop[attr] = shop.goodList.every(good => {
                  return  good[attr]
            })
           
            // this.isSelectAll() //商品全部选中  商铺选中时 触发全选状态
        },
        selectAll() { //切换状态
            let attr = this.editingShop ? 'allRemoveSelected' : 'allSelected'
            this[attr] = !this[attr]
            
        },
        edit(shop, index){
            shop.editing = !shop.editing  //切换编辑和显示状态
            shop.editingMsg = shop.editing ? '完成' : '编辑'
                this.lists.forEach((item, i)=>{
                    if(index !== i){
                        item.editing = false
                        item.editingMsg = shop.editing ? '': '编辑'
                    }
                })

          
            this.editingShop = shop.editing ? shop : null  //全局变量表示全局状态  存放正在编辑的shop
            this.editingShopIndex = shop.editing ? index : -1  //全局变量表示全局状态  存放正在编辑的shop
        },
        reduce(good) { //数量-1
            if(good.number === 1) return 
            axios.post(url.cartReduce, {
                id: good.id,
                number : 1
            }).then(res => {
                good.number--
            }) 
        },
        add(good) { 
            axios.post(url.cartAdd, {
                id: good.id,
                number: 1
            }).then(res => {
                good.number++
            })
        }    
    },
    mixins: [mixin]


})