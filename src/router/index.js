import { createRouter, createWebHistory } from 'vue-router';
import BoxPage from "../pages/boxPage/BoxPage.vue";
import CartPage from "../pages/cart/CartPage.vue";
import InventoryPage from "../pages/inventory/InventoryPage.vue";
import AuthPage from "../pages/auth/AuthPage.vue";
import ProfilePage from "../pages/profile/ProfilePage.vue";
import ItemViewPage from "../pages/itemViewPage/ItemViewPage.vue";

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'Box Page',
            component: BoxPage,
        },
        {
            path: '/auth',
            name: 'Auth Page',
            component: AuthPage,
        },
        {
            path: '/cart',
            name: 'Cart Page',
            component: CartPage,
        },
        {
            path: '/inventory',
            name: 'Inventory Page',
            component: InventoryPage,
        },
        {
            path: '/profile',
            name: 'Profile Page',
            component: ProfilePage,
        },
        {
            path: '/item/:slug',
            name: 'Item Page',
            component: ItemViewPage
        },
    ],
});

export default router;