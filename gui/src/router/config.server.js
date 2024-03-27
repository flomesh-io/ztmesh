import _ from "lodash";
import server from "./modules/server";
import pages from "./modules/pages";
import uikit from "./modules/uikit";
import agent from "./modules/agent";
import AppLayout from '@/layout/AppLayout.vue';

const options = {
  routes: [
    {
      path: "/login",
      name: "Login",
			component: () => import('@/views/pages/auth/Login.vue')
    },
    {
      path: "/:pathMatch(.*)",
      name: "404",
			component: () => import('@/views/pages/NotFound.vue')
    },
    {
      path: "/403",
      name: "403",
			component: () => import('@/views/pages/auth/Access.vue')
    },
		{
		    path: '/landing',
		    name: 'landing',
		    component: () => import('@/views/pages/Landing.vue')
		},
		{
		    path: '/error',
		    name: 'error',
		    component: () => import('@/views/pages/auth/Error.vue')
		},
		{
		    path: '/root',
		    name: 'Root',
		    component: () => import('@/layout/AppRoot.vue')
		},
    {
        path: '/',
        component: AppLayout,
				redirect: "/agent",
        children: process.env.NODE_ENV === "development"?[
					agent,
					server,
					uikit,
					pages,
        ]:[
					agent,
					server,
				]
    },
  ],
};

options.initRoutes = _.cloneDeep(options.routes);
export default options;
