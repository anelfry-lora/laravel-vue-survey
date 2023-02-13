import { createStore } from 'vuex'

const store = createStore({
    state: {
        user: {
<<<<<<< HEAD
            data:{name: 'Katana'},
            token: null
=======
            data: {
                name: 'Anelfry Lora',
                email: 'correo@email.com',
                imageUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
            },
            token: 123
>>>>>>> first commit, config proyect whit vue
        }
    },
    getters: {},
    actions: {},
<<<<<<< HEAD
    mutations: {},
=======
    mutations: {
        logout: (state) => {
            state.user.data = {};
            state.user.token = null
        }
    },
>>>>>>> first commit, config proyect whit vue
    modules: {}
})

export default store