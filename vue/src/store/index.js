import { createStore } from 'vuex'
import axiosClient from "../axios";

const tmpSurveys = [
    {
        id: 100,
        title: 'My new proyect Laravel',
        slug: 'my-new-proyect-laravel',
        status: 'draft',
        image:
            'https://desarrolloweb.com/storage/tag_images/actual/XLzFK4Nkfc15A4Qn6emJcyP6DvpvdbD46S2mLfbI.png',
        description:
            `Laravel is a web application framework with expressive, elegant syntax.<br> We' ve already laid the foundation — freeing you to create without sweating the small things. `,
        created_at: "2023-02-20 18:00:00",
        updated_at: "2023-02-20 18:00:00",
        expire_date: "2023-02-31 18:00:00",
        questions: [
            {
                id: 1,
                type: 'select',
                question: 'from which country are you?',
                description: null,
                image: null,
                data: {
                    options: [
                        { uuid: 'f8af96f2-1a90-4632-9e9e-b560670e52ea', text: 'Dominican Republic' },
                        { uuid: 't8at96t2-1o90-46h2-9o9o-c560670s89ee', text: 'USA' },
                        { uuid: '789b18d7-8f9e-47e5-b96a-95bfaf8a1e29', text: 'Georgia' },
                        { uuid: '12e91f1c-0c75-4a63-aa17-42a0c0a378f1', text: 'Germani' },
                        { uuid: '853a1b6f-614c-4488-9b9a-1e08e4f7e954', text: 'India' },
                    ]
                }
            },
            {
                id: 2,
                type: 'checkbox',
                question: 'which lenguage is your favorite?',
                description: 'This is the description of the question 2',
                data: {
                    options: [
                        { uuid: '3a791a05-3f48-44c8-a8fc-6c753f1781ec', text: 'JavaScript' },
                        { uuid: '821d16ab-955e-4a39-958d-c0bfaa7b14a1', text: 'PHP' },
                        { uuid: '7d9c9c8d-8686-4652-a0b2-136877f6b2f6', text: 'Pyton' },
                        { uuid: 'c01f9d3b-8ee3-45b3-a6b7-cc267a6058b3', text: 'HTML + CSS' },
                        { uuid: '21dbde7c-c843-4a2a-a5f5-662b5d73902c', text: 'All of the above' },
                    ]
                }
            },
            {
                id: 3,
                type: 'checkbox',
                question: 'which PHP framework is your favorite?',
                description: 'This is the description of the question 3',
                data: {
                    options: [
                        { uuid: '1d11b373-7c54-4d80-b7e8-2e34a3f9dc44', text: 'Laravel' },
                        { uuid: '7ec05634-13dc-47d8-a3f3-7c9d3b36f7c8', text: 'Yii2' },
                        { uuid: '6a5b49a5-6dc2-40f5-9ef9-6d0e6a141b48', text: 'Codeingiter' },
                        { uuid: '426e28fa-d710-44c8-9fb9-84e9ce462d91', text: 'Synfony' },
                    ]
                }
            },
            {
                id: 4,
                type: 'radio',
                question: 'which Laravel framework do you love most?',
                description: 'This is the description of the question 4',
                data: {
                    options: [
                        { uuid: '9d37ed9c-9e36-4921-8b5d-53b312d02369', text: 'Laravel 5' },
                        { uuid: 'b48c3fa9-d839-48a9-a05f-5c5e1cf2f37d', text: 'Laravel 6' },
                        { uuid: '321e5bde-06e5-42d1-bd71-0be157b98861', text: 'Laravel 7' },
                        { uuid: 'e0e8d25f-5e2f-482c-b1b5-5b97422c3f7e', text: 'Laravel 8' },
                        { uuid: '5505f5a4-98ec-4f3c-b3a4-4b080082f2e7', text: 'Laravel 9' },
                    ]
                }
            },
            {
                id: 6,
                type: 'text',
                question: 'What is your favorite Youtube channel to learn Laravel?',
                description: null,
                data: {},
            },
            {
                id: 7,
                type: 'textarea',
                question: 'talk about your experience with Laravel',
                description: 'White your honest opinion. Everything is anonymous',
                data: {},
            },

        ],
    },
    {
        id: 200,
        title: 'JavaScript ECMA6',
        slug: 'javacript-ecma6',
        status: 'active',
        image:
            'https://upload.wikimedia.org/wikipedia/commons/9/99/Unofficial_JavaScript_logo_2.svg',
        description:
            `JavaScript (commonly abbreviated JS) is an interpreted programming language, a dialect of the ECMAScript standard. It is defined as object-oriented,2 based on prototypes, imperative, weakly typed, and dynamic.`,
        created_at: "2023-02-20 18:00:00",
        updated_at: "2023-02-20 18:00:00",
        expire_date: "2023-02-31 18:00:00",
        questions: []
    },
    {
        id: 300,
        title: 'Vue 3',
        slug: 'vue-3',
        status: 'active',
        image:
            'https://upload.wikimedia.org/wikipedia/commons/9/95/Vue.js_Logo_2.svg',
        description:
            `Vue.js (commonly known as Vue; pronounced /vju:/, like "view"3) is an open source JavaScript framework for building single-page applications and user interfaces. It was created by Evan You, and is maintained by him and the rest of the active members of the core team who come from various companies such as Netlify and Netguru.`,
        created_at: "2023-02-20 18:00:00",
        updated_at: "2023-02-20 18:00:00",
        expire_date: "2023-02-31 18:00:00",
        questions: []
    },
    {
        id: 400,
        title: 'Tailwind 3',
        slug: 'tailwind-3',
        status: 'active',
        image:
            'https://miro.medium.com/v2/resize:fit:720/format:webp/1*oPL8C-i04sqAUoOS_da9aA.jpeg',
        description:
            `Tailwind is a CSS framework with a <code>utility-first</code> class concept. That means Tailwind consists of atomic classes like flex, justify-center, pt-4. Unlike Bootstrap, Tailwind does not have a built-in UI components style. Thus can reduce the bundle size of style because we only consume classes based on the needs. Another advantage, it is already supported by PurgeCSS tools.`,
        created_at: "2023-02-20 18:00:00",
        updated_at: "2023-02-20 18:00:00",
        expire_date: "2023-02-31 18:00:00",
        questions: []
    },
    
]
const store = createStore({
    state: {
        user: {
<<<<<<< HEAD
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
=======
            data: {},
            token: sessionStorage.getItem('TOKEN')
        },
        surveys: [...tmpSurveys],
        questionTypes: ['text', 'select', 'radio', 'checkbox', 'textarea'],
    },
    getters: {},
    actions: {
        register({ commit }, user) {
            //AXIOS
            return axiosClient.post('/register', user)
                .then(({ data }) => {
                    commit('setUser', data)
                    return data;
                })
            //FETCH
            /* return fetch(`http://localhost:8000/api/register`, {
                headers: {
                    "content-type": "application/json",
                    Accept: "application/json"
                },
                method: "POST",
                body: JSON.stringify(user),
            })
            .then((res) => res.json())
            .then((res) => {
                commit("setUser", res)
                return res
            })*/
        },
        login({ commit }, user) {
            return axiosClient.post('/login', user)
                .then(({ data }) => {
                    commit('setUser', data)
                    return data;
                })
        },
        logout({ commit }) {
            return axiosClient.post('/logout')
                .then(res => {
                    commit('logout')
                    return res;
                })
        }
    },
>>>>>>> create surveys form
    mutations: {
        logout: (state) => {
            state.user.data = {};
            state.user.token = null
        },
        setUser: (state, userData) => {
            state.user.token = userData.token
            state.user.name = userData.name
            sessionStorage.setItem('TOKEN', userData.token)
        }
    },
>>>>>>> first commit, config proyect whit vue
    modules: {}
})

export default store