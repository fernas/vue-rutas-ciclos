import { createRouter, createWebHashHistory } from 'vue-router'
import isAuthenticatedGuard from './auth-guard'

const routes = [
    { 
        path: '/',
        redirect: '/pokemon',
    },

    {
        path: '/pokemon',
        name: 'pokemon',
        component: () => import('@/modules/pokemon/layouts/PokemonLayout'),
        children: [
            { 
                path: 'home',
                name: 'pokemon-home',
                component: () => import('@/modules/pokemon/pages/ListaPage')
            },
            { 
                path: 'about',
                name: 'pokemon-about',
                component: () => import('@/modules/pokemon/pages/AboutPage')
            },
            { 
                path: 'pokemon/:id',
                name: 'pokemon-id',
                component: () => import('@/modules/pokemon/pages/PokemonPage'),
                props: ( route ) => {
                    const id = Number(route.params.id)
                    return isNaN(id) ? {id: 1} : {id}
                }
            },
            { 
                path: '',
                name: 'pokemon-default',
                redirect: { name: 'pokemon-home' },
            },
        ]
    },
    {
        path: '/dbz',
        name: 'dbz',
        beforeEnter: [ isAuthenticatedGuard ],
        component: () => import('@/modules/dbz/layouts/DragonBallLayout'),
        children: [
            {
                path: 'characters',
                name: 'dbz-characters',
                component: () => import('@/modules/dbz/pages/Characters')
            },
            {
                path: 'about',
                name: 'dbz-about',
                component: () => import('@/modules/dbz/pages/About')
            },
            { 
                path: '',
                name: 'dbz-default',
                redirect: { name: 'dbz-characters' },
            },
        ]
    },
    { 
        path: '/:pathMatch(.*)*',
        name: 'No encontrado',
        component: () => import('@/modules/shared/pages/NoPageFound')
    }
]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

// Guard global - síncrono
// router.beforeEach((to, from, next) => {
//     const random = Math.random() * 100
//     if (random > 50) {
//         console.log('autenticado')
//         next()
//     } else {
//         console.log(random, 'bloqueado por el beforeEach Guard')
//         next({ name: 'pokemon-home' })
//     }
// })

// Guard global - asíncrono
// const canAccess = () => {
//     return new Promise((resolve) => {
//         const random = Math.random() * 100
//         if (random > 50) {
//             console.log('Auenticado - canAccess')
//             resolve(true)
//         } else {
//             console.log(random, 'bloqueado por el beforeEach Guard - canAccess')
//             resolve(false)
//         }
//     })
// }

// router.beforeEach(async(to, from, next) => {
//     const authorized = await canAccess()
//     authorized ? next() : next({ name: 'pokemon-home' })
// })

export default router