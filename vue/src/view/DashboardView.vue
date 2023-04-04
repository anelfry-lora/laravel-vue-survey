<template>
    <PageComponent title="Dashboard">
        <Loading v-if="loading"/>
        <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 text-gray-700">

            <div class="p-3 bg-white text-gray-800 shadow-md text-center flex flex-col order-1 lg:order-2 animate-fade-in-down "
                style="animation-delay: 0.1s">
                <h3 class="text-2xl font-semibold">Total Surveys</h3>
                <div class="pb-4 text-8xl font-semibold flex-1 flex items-center justify-center">
                    {{ data.totalSurveys }}
                </div>
            </div>

            <div class="p-3 bg-white text-gray-800 shadow-md text-center flex flex-col order-2 lg:order-4 animate-fade-in-down"
                style="animation-delay: 0.2s">
                <h3 class="text-2xl font-semibold">Total Answers</h3>
                <div class="pb-4 text-8xl font-semibold flex-1 flex items-center justify-center">
                    {{ data.totalAnswers }}
                </div>
            </div>

            <div class="p-4 bg-white shadow-md row-span-2 order-3 lg:order-1 animate-fade-in-down">
                <h3 class="text-2xl font-semibold">Latest Survey</h3>
                <div v-if="data.latestSurvey">
                    <img :src="data.latestSurvey.image_url" class="w-[240px] mx-auto" :alt="data.latestSurvey.title" />
                    <h3 class="font-bold text-xl mb-3">{{ data.latestSurvey.title }}</h3>
                    <div class="flex justify-between text-sm mb-1">
                        <div class="font-semibold"> Create Date: </div>
                        <div>{{ data.latestSurvey.created_at }}</div>
                    </div>
                    <div class="flex justify-between text-sm mb-1">
                        <div class="font-semibold">Expire Date:</div>
                        <div>{{ data.latestSurvey.expire_date }}</div>
                    </div>
                    <div class="flex justify-between text-sm mb-1">
                        <div class="font-semibold">Status:</div>
                        <div v-if="data.latestSurvey.status"> <p class="text-blue-700 font-semibold">Active</p> </div>
                        <div v-else> <p class="text-orange-700 font-semibold">  Draft</p></div>
                    </div>
                    <div class="flex justify-between text-sm mb-1">
                        <div class="font-semibold">Questions:</div>
                        <div>{{ data.latestSurvey.questions }}</div>
                    </div>
                    <div class="flex justify-between text-sm mb-3">
                        <div class="font-semibold">Answers:</div>
                        <div>{{ data.latestSurvey.answers }}</div>
                    </div>
                    <hr>
                    <div class="flex justify-between itens-center mt-3">
                        <router-link :to="{ name: 'AnswerView', params: { slug: data.latestSurvey.slug, title: data.latestSurvey.title } }"
                            class="flex py-1 px-4 items-center rounded-sm text-white bg-cyan-600 hover:bg-cyan-700">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" viewBox="0 0 20 20"
                                fill="currentColor">
                                <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                                <path fill-rule="evenodd"
                                    d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
                                    clip-rule="evenodd" />
                            </svg>
                            View Answers
                        </router-link>
                        <div class="flex items-center">
                            <!-- <a :href="`/view/survey/${data.latestSurvey.slug}`" target="_blank"
                                class="h-9 w-9 flex items-center justify-center rounded-full border border-transparent text-sm text-black-500 hover:text-blue-500">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                                    stroke="currentColor" class="w-6 h-6">
                                    <path stroke-linecap="round" stroke-linejoin="round"
                                        d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                                </svg>
                            </a> -->
                            <router-link :to="{ name: 'SurveyView', params: { id: data.latestSurvey.id } }"
                                class="h-9 w-9 flex items-center justify-center rounded-full border border-transparent text-sm text-black-500 hover:text-blue-500">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                                    stroke="currentColor" class="w-6 h-6">
                                    <path stroke-linecap="round" stroke-linejoin="round"
                                        d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                                </svg>
                            </router-link>
                        </div>
                    </div>
                </div>
                <div v-else class="text-gray-600 text-center py-16">
                    Your don't have surveys yet.
                </div>
            </div>

            <div class="p-3 bg-white shadow-md row-span-2 order-4 lg:order-3 animate-fade-in-down"
                style="animation-delay: 0.3s">
                <div class="flex justify-between items-center mb-3 px-2">
                    <h3 class="text-2xl font-semibold">Latest Answers</h3>
                    <a href="javascript:void(0)" class="text-sm text-blue-500 hover:decoration-blue-500">
                        View all
                    </a>
                </div>

                <div v-if="data.latestAnswers.length">
                    <a href="#" v-for="answer of data.latestAnswers" :key="answer.id"
                        class="block p-2 hover:bg-gray-100/90">
                        <div class="font-semibold">{{ answer.survey.title }}</div>
                        <small>
                            Answer Made at:
                            <i class="font-semibold">{{ answer.end_date }}</i>
                        </small>
                    </a>
                </div>
                <div v-else class="text-gray-600 text-center py-16">
                    Your don't have answers yet
                </div>
            </div>

        </div>
    </PageComponent>
</template>

<script setup>
import PageComponent from '../components/PageComponent.vue';
import { useStore } from 'vuex';
import { computed } from 'vue';
import Loading from '../components/Loading.vue';

const store = useStore();

const loading = computed(() => store.state.dashboard.loading);
const data = computed(() => store.state.dashboard.data);

store.dispatch('getDashboardData');
</script>
