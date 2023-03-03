import { createApp } from 'vue'
<<<<<<< HEAD
import './style.css'
import store from './store'
=======
// import './style.css'
<<<<<<< HEAD
import { store } from "./store/index";
>>>>>>> first commit, config proyect whit vue
=======
import './index.css'
import store from './store'
import router from './router'
>>>>>>> create surveys form
import App from './App.vue'

createApp(App)
.use(store)
.use(router)
.mount('#app')