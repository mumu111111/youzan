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
        editingShop: false,
        allSelected: true  //默认全选选中状态
        
    },
    created() {
        this.getList()
    },
    computed: {
        selectLists() { //当前选中的商品列表
            let arr = []
            this.lists.forEach(shop => { //正常状态下，可以选择多个商铺下的商品
                shop.goodsList.forEach(good => {
                    if(good.checked) {
                        arr.push(good)
                    }
                })
            })
            return arr
        },
        removeLists() {
            if(!this.editingShop) {　 //存在 即编辑状态 
                return []
            }else{                    //编辑状态下 只能操作一个商铺  不能遍历多商铺
                let arr = []
                this.editingShop.goodsList.forEach(good => {
                    if(good.checked) {
                        arr.push(good)
                    }
                })
                return arr
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
                    shop.editing = false
                    shop.editingMsg = '编辑'
                    shop.goodsList.forEach(good => {
                        good.checked = true
                    })
                })
                this.lists = lists
            })
        },
        selectShop(shop){
            shop.checked = !shop.checked  // 切换选中、未选中状态
            shop.goodsList.forEach(good => { //实现选中商铺后， 商铺内多友商品跟随选中或未选中
                good.checked = shop.checked
            })
            this.isSelectAll()
        },
        selectGood(shop, good) {
            good.checked = !good.checked
            shop.goodList.forEach(good => {
                if(good.checked) {
                shop.checked = good.checked
                }
            })
            shop.checked = shop.goodsList.every(good => {
                return good.checked
            })
            this.isSelectAll() //商品全部选中  商铺选中时 触发全选状态
        },
        selectAll() { //选择全选后 操作
            this.allSelected = !allSelected 
            if(this.editingShop) {
                this.editingShop.checked = this.allSelected
                this.editingShop.goodsList.forEach(good => {
                    good.checked = this.allSelected
                })
                return 
            }
            this.lists.forEach(shop => {
                shop.checked = this.allSelected
                shop.goodsList.forEach(good => {
                    good.checked = this.allSelected
                })
            })
        },
        isSelectAll() {  //获取 编辑和正常状态下 的 全选 的状态情况
            if(this.editingShop) {  //编辑状态下全选
                this.allSelected = this.editingShop.checked
                return 
            }
            
            this.allSelected = this.lists.every(shop => { //显示状态下全选
                return shop.checked
            })
        },
        edit(shop, index){
            shop.editing = !shop.editing  //切换编辑和显示状态
            if(shop.editing){             // TRUE编辑状态下，改变哪些，msg,其他商铺没有msg
                shop.editingMsg = '完成'
                this.lists.forEach((item, i)=>{
                    if(index !== i){
                        item.editing = false
                        item.editingMsg = ''
                    }
                })

            }else{
                shop.editingMsg = '编辑' //显示状态 msg=‘编辑’
                
            }
            this.editingShop = shop.editing ? shop : null  //全局变量表示全局状态  存放正在编辑的shop
        }
    },
    mixins: [mixin]

})