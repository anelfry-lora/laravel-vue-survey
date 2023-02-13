import { createApp } from 'vue'
<<<<<<< HEAD
import './style.css'
import store from './store'
=======
// import './style.css'
import { store } from "./store/index";
>>>>>>> first commit, config proyect whit vue
import App from './App.vue'

createApp(App)
.use(store)
.mount('#app')
