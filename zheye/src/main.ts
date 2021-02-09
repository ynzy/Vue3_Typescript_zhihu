import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'bootstrap/dist/css/bootstrap.min.css'
import axios from 'axios'
// axios
//   .get('/api/columns?currentPage=1&pageSize=5')
//   .then(res => console.log(res))
//   .catch(err => console.log(err))

const app = createApp(App)
app.use(router)
app.use(store)
app.mount('#app')
