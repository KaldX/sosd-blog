import { createApp } from 'vue'
import './styles/index.css'
import App from './App.vue'
import router from './router'
import pinia from './store'
import { MotionPlugin } from '@vueuse/motion'

import PrimeVue from 'primevue/config';
import Button from 'primevue/button';
import InputText from 'primevue/inputtext';
import Password from 'primevue/password';
import FloatLabel from 'primevue/floatlabel';
import Checkbox from 'primevue/checkbox';

const app = createApp(App)

app.use(router)
app.use(pinia)
app.use(MotionPlugin)

// 配置 PrimeVue，并设置 theme 为 'none'； 目前显示有点问题，之后会调整
app.use(PrimeVue, {
  theme: 'none'
  // ripple: true, // 涟漪效果
  // inputStyle: 'filled' // 设置全局输入框样式，如 'filled' 或 'outlined'
});

// 全局注册的组件
app.component('Button', Button);
app.component('InputText', InputText);
app.component('Password', Password);
app.component('FloatLabel', FloatLabel);
app.component('Checkbox', Checkbox);
// app.directive('ripple', Ripple);
// app.directive('tooltip', Tooltip);

app.mount('#app')



