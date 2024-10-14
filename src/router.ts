import type { RouteRecordRaw } from 'vue-router'
import { createRouter, createWebHistory } from 'vue-router'

import Dashboard from './views/Dashboard.vue'
import Forms from './views/Forms.vue'
import Tables from './views/Tables.vue'
import UIElements from './views/UIElements.vue'
import Login from './views/Login.vue'
import Modal from './views/Modal.vue'
import Card from './views/Card.vue'
import Blank from './views/Blank.vue'
import UserList from './views/users/userList.vue'
import RolList from './views/roles/rolList.vue'
import ClienteList from './views/clientes/clienteList.vue'
import VehiculoList from './views/vehiculos/vehiculoList.vue'
import ViajeList from './views/viajes/viajeList.vue'
import EncomiendaList from './views/encomiendas/encomiendaList.vue'

const routes: RouteRecordRaw[] = [
  // {
  //   path: '/dashboard',
  //   name: 'Blank',
  //   component: Login,
  //   meta: { layout: 'empty' },
  // },
  {
    path: '/userList',
    name: 'userList',
    component: UserList,
  },
  {
    path: '/rolList',
    name: 'rolList',
    component: RolList,
  },
  {
    path: '/clienteList',
    name: 'clienteList',
    component: ClienteList,
  },
  {
    path: '/vehiculoList',
    name: 'vehiculoList',
    component: VehiculoList,
  },
  {
    path: '/viajeList',
    name: 'viajeList',
    component: ViajeList,
  },

  {
    path: '/encomiendaList',
    name: 'encomiendaList',
    component: EncomiendaList,
  },
  
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: Dashboard,
  },

  {
    path: '/users',
    name: 'Usuarios',
    component: Forms,
  },
  {
    path: '/proces',
    name: 'Procesos',
    component: Card,
  },
  {
    path: '/register',
    name: 'Registros',
    component: Tables,
  },
  {
    path: '/cards',
    name: 'Cards',
    component: UIElements,
  },
  {
    path: '/modal',
    name: 'Modal',
    component: Modal,
  },
  {
    path: '/blank',
    name: 'Blank',
    component: Blank,
  },

  {
    path: '/login',
    name: 'Login',
    component: Blank,
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
