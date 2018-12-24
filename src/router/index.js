import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'
import View1 from '@/views/view1.vue'
import View2 from '@/views/view2.vue'
import Index from '@/views/index.vue'
import Book from '@/views/book.vue'
import BookDetail from '@/views/bookDetail.vue'

Vue.use(Router)

export default new Router({
  routes: [
    // {
    //   path: '/',
    //   name: 'HelloWorld',
    //   component: HelloWorld
    // }
    {
      path: '/view1',
      component: View1
    }, {
      path: '/view2',
      component: View2
    }, {
      path: '/book',
      component: Book
    }, {
      path: '/bookDetail',
      component: BookDetail
    }, {
      path: '/*',
      component: Index
    }
  ]
})
