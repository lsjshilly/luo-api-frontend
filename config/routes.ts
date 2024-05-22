export default [
  {
    path: '/user',
    layout: false,
    routes: [{ name: '登录', path: '/user/login', component: './User/Login' }],
  },
  { path: '/welcome', name: '欢迎', icon: 'smile', component: './Welcome' },
  {
    path: '/admin',
    name: '管理页',
    icon: 'crown',
    access: 'canAdmin',
    routes: [
      { path: '/admin', redirect: '/admin/sub-page' },
      { path: '/admin/sub-page', name: '二级管理页', component: './Admin' },
    ],
  },
  {
    path: '/api-info',
    name: 'API平台',
    icon: 'api',
    routes: [
      { path: '/api-info', redirect: '/api-info/list' },
      { path: '/api-info/list', name: 'API管理', component: './ApiPlat/manage' },
      {
        path: '/api-info/detail/:id',
        hideInMenu: true,
        name: 'API详情',
        component: './ApiPlat/info',
      },
      {
        path: '/api-info/debug/:id',
        hideInMenu: true,
        name: 'API调试',
        component: './ApiPlat/debug',
      },
    ],
  },

  { name: '查询表格', icon: 'table', path: '/list', component: './TableList' },
  { path: '/', redirect: '/welcome' },
  { path: '*', layout: false, component: './404' },
];
