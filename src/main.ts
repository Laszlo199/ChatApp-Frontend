import { createApp } from 'vue'
import { createPinia } from 'pinia'
import './index.css'

import App from './App.vue'
import router from './router'
import { UserStore } from './stores/UserStore'


const app = createApp(App)


app.use(createPinia())

const userStore = UserStore();

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresLogin) && userStore.authenticated==false) {
      // You can use store variable here to access globalError or commit mutation 
      next("/signin")
  } else {
      next()
  }
})

app.use(router)

app.mount('#app')
