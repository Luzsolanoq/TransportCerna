import type { RouteRecordRaw } from 'vue-router';
import { createRouter, createWebHistory } from 'vue-router';

import Dashboard from './views/Dashboard.vue';
import Forms from './views/Forms.vue';
import Tables from './views/Tables.vue';
import UIElements from './views/UIElements.vue';
import Login from './views/Login.vue';
import Modal from './views/Modal.vue';
import Card from './views/Card.vue';
import Blank from './views/Blank.vue';
import UserList from './views/users/userList.vue';
import RolList from './views/roles/rolList.vue';
import ClienteList from './views/clientes/clienteList.vue';
import VehiculoList from './views/vehiculos/vehiculoList.vue';
import ViajeList from './views/viajes/viajeList.vue';
import ChoferList from './views/chofer/choferList.vue';
import ProgramacionList from './views/programacion/programacionList.vue';
import EncomiendaList from './views/encomiendas/encomiendaList.vue';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: '/login', // Redirige a login al acceder a la raíz
  },
  {
    path: '/login',
    name: 'Login',
    component: Login, // Usa el componente Login aquí
    meta: { layout: 'auth' }, // Definir el layout para la vista de login
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: Dashboard,
    meta: { layout: 'default' }, // Definir el layout para el dashboard
  },
  {
    path: '/userList',
    name: 'userList',
    component: UserList,
    meta: { layout: 'default' }, // Agregar el layout correspondiente
  },
  {
    path: '/rolList',
    name: 'rolList',
    component: RolList,
    meta: { layout: 'default' },
  },
  {
    path: '/clienteList',
    name: 'clienteList',
    component: ClienteList,
    meta: { layout: 'default' },
  },
  {
    path: '/vehiculoList',
    name: 'vehiculoList',
    component: VehiculoList,
    meta: { layout: 'default' },
  },
  {
    path: '/choferList',
    name: 'choferList',
    component: ChoferList,
    meta: { layout: 'default' },
  },
  {
    path: '/viajeList',
    name: 'viajeList',
    component: ViajeList,
    meta: { layout: 'default' },
  },
  {
    path: '/programacionList',
    name: 'programacionList',
    component: ProgramacionList,
    meta: { layout: 'default' },
  },
  {
    path: '/encomiendaList',
    name: 'encomiendaList',
    component: EncomiendaList,
    meta: { layout: 'default' },
  },
  {
    path: '/users',
    name: 'Usuarios',
    component: Forms,
    meta: { layout: 'default' },
  },
  {
    path: '/proces',
    name: 'Procesos',
    component: Card,
    meta: { layout: 'default' },
  },
  {
    path: '/register',
    name: 'Registros',
    component: Tables,
    meta: { layout: 'default' },
  },
  {
    path: '/cards',
    name: 'Cards',
    component: UIElements,
    meta: { layout: 'default' },
  },
  {
    path: '/modal',
    name: 'Modal',
    component: Modal,
    meta: { layout: 'default' },
  },
  {
    path: '/blank',
    name: 'Blank',
    component: Blank,
    meta: { layout: 'default' },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
