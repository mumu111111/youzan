let url= {
    hotLists : '/index/hotLists',
    banner : '/index/banner',
    topList: '/category/topList',
    subList: '/category/subList',
    rankList:'/category/rank',
    searchList: '/search/list',
    details: '/goods/details',
    deal: '/goods/deal',
    cartAdd: '/cart/add',
    cartAdd: '/cart/add',
    cartRemove: '/cart/remove',
    cartReduce: '/cart/reduce',
    cartLists: '/cart/list',
    cartUpdate: '/cart/update'
}

let host = 'http://rap2api.taobao.org/app/mock/7058'

for(let key in url){
    if(url.hasOwnProperty(key)){
        url[key] = host + url[key]
    }
}

export default url