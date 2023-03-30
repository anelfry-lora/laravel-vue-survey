<template>
    <div>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
            class="mx-auto h-11 w-auto text-cyan-500">
            <path fill-rule="evenodd"
                d="M1.5 7.125c0-1.036.84-1.875 1.875-1.875h6c1.036 0 1.875.84 1.875 1.875v3.75c0 1.036-.84 1.875-1.875 1.875h-6A1.875 1.875 0 011.5 10.875v-3.75zm12 1.5c0-1.036.84-1.875 1.875-1.875h5.25c1.035 0 1.875.84 1.875 1.875v8.25c0 1.035-.84 1.875-1.875 1.875h-5.25a1.875 1.875 0 01-1.875-1.875v-8.25zM3 16.125c0-1.036.84-1.875 1.875-1.875h5.25c1.036 0 1.875.84 1.875 1.875v2.25c0 1.035-.84 1.875-1.875 1.875h-5.25A1.875 1.875 0 013 18.375v-2.25z"
                clip-rule="evenodd" />
        </svg>
        <h2 class="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
            Register for free
        </h2>
        <p class="mt-2 text-center text-sm text-gray-600">
            Or
            {{ ' ' }}
            <router-link :to="{ name: 'Login' }" class="font-medium text-indigo-600 hover:text-indigo-500">
                login to your account
            </router-link>
        </p>
    </div>
    <form class="mt-8 space-y-6" @submit="register">
        <Alert v-if="Object.keys(errors).length" class="items-stretch text-sm">
            <div>
                <ul v-for="(field, i) of Object.keys(errors)" :key="i" lass="list-inside">
                    <li v-for="(error, ind) of errors[field] || []" :key="ind">
                        * {{ error }}
                    </li>
                </ul>
            </div>


            <span @click="errors = ''"
                class="w-8 h-8 flex items-center justify-center rounded-full transition-color cursor-pointer hover:bg-[rgba(0,0,0,0.2)]">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                    stroke="currentColor" class="w-6 h-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
            </span>
        </Alert>
        <div class="-space-y-px rounded-md shadow-sm">
            <div>
                <label for="full-name" class="sr-only">Full Name</label>
                <input id="full-name" name="name" type="name" autocomplete="name" v-model="user.name"
                    class="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                    placeholder="Full name" />
            </div>
            <div>
                <label for="email-address" class="sr-only">Email address</label>
                <input id="email-address" name="email" type="email" autocomplete="email" v-model="user.email"
                    class="relative block w-full appearance-none rounded-none border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                    placeholder="Email address" />
            </div>
            <div>
                <label for="password" class="sr-only">Password</label>
                <input id="password" name="password" type="password" autocomplete="current-password" v-model="user.password"
                    class="relative block w-full appearance-none rounded-none border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                    placeholder="Password" />
            </div>
            <div>
                <label for="password" class="sr-only">Password Confirmation</label>
                <input id="password_confirm" name="password_confirm" type="password" autocomplete="current-password"
                    v-model="user.password_confirmation"
                    class="relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                    placeholder="Password Confirmation" />
            </div>
        </div>

        <div>
            <button type="submit" :disabled="loading"
                class="group relative flex w-full justify-center rounded-md border border-transparent bg-gray-900 py-2 px-4 text-sm font-medium text-white hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
                :class="{ 'cursor-not-allowed': loading, 'hover:bg-gray-500': loading }">
                <span class="absolute inset-y-0 left-0 flex items-center pl-3">
                    <LockClosedIcon class="h-5 w-5 text-gray-500 group-hover:text-gray-400" aria-hidden="true" />
                </span>
                <svg v-if="loading" class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg"
                    fill="none" viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path class="opacity-75" fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
                    </path>
                </svg>
                Sign up
            </button>
        </div>
    </form>
</template>

<script setup>

import { LockClosedIcon } from '@heroicons/vue/20/solid'
import store from "../store";
import { useRouter } from 'vue-router'
import { ref } from 'vue';
import Alert from '../components/Alert.vue';

const router = useRouter();
const user = {
    name: '',
    email: '',
    password: '',
    password_confirmation: ''
};
const errors = ref({});
const loading = ref(false);

const register = (ev) => {
    ev.preventDefault()

    loading.value = true;
    store.dispatch('register', user)
        .then((res) => {
            loading.value = false;
            router.push({
                name: 'Dashboard'
            });
        })
        .catch(err => {
            loading.value = false;
            if (err.response.status === 422) {
                errors.value = err.response.data.errors
            }
        });
}
</script>