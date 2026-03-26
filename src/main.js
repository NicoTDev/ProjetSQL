import { createApp } from 'vue';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import { ScrambleTextPlugin } from 'gsap/ScrambleTextPlugin';
import { Flip } from 'gsap/Flip'

import App from './App.vue';
import router from './router';

import './assets/style.css';
gsap.registerPlugin(ScrollTrigger, ScrollToPlugin, ScrambleTextPlugin, Flip);

const app = createApp(App);

app.use(router);

app.mount('#app');