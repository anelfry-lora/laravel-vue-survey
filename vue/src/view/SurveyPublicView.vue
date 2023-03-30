<template>
    <div class="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8 ">
        <div class="px-4 sm:px-1">
            <div v-if="loading" class="flex justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                    stroke="currentColor" class="animate-spin h-5 w-5 mr-3">
                    <path stroke-linecap="round" stroke-linejoin="round"
                        d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
                </svg>
                Loading...
            </div>
            <form v-else @submit.prevent="submitSurvey" class="container mx-auto sm:px-10">
                <div class="md:flex">
                    <div class="md:shrink-0">
                        <img class="h-48 w-full object-cover md:h-full md:w-48" :src="survey.image_url" :alt="survey.title">
                    </div>
                    <div class="pt-8 md:pl-4">
                        <h1 class="text-3xl mb-3">{{ survey.title }}</h1>
                        <p class="text-gray-500 text-sm" v-html="survey.description"></p>
                    </div>
                </div>

                <div v-if="surveyFinished"
                    class="mt-6 py-8 px-6 bg-white text-white mx-auto rounded-sm max-w-md mx-auto shadow-md">
                    <div class="chat-notification-logo-wrapper">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                            stroke="currentColor" class="w-10 h-10 text-gray-900">
                            <path stroke-linecap="round" stroke-linejoin="round"
                                d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 01-.825-.242m9.345-8.334a2.126 2.126 0 00-.476-.095 48.64 48.64 0 00-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0011.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155" />
                        </svg>
                    </div>

                    <div class="text-xl mb-3 font-semibold text-gray-900">
                        <p>Thank you for participating in this survey.</p>
                    </div>
                    <hr class="m-4">
                    <div class="flex justify-between itens-center mt-3">
                        <button @click="submitAnotherResponse" type="button"
                            class="inline-flex justify-center py-2 px-4 shadow-sm text-sm font-medium rounded-sm text-white-900 bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                            Submit another response
                        </button>
                        {{ ' ' }}
                        <router-link :to="{ name: 'Login' }"
                            class="flex mt-2 font-medium text-gray-600 hover:text-indigo-500">
                            Create a survey
                        </router-link>
                    </div>

                </div>

                <div v-else>
                    <hr class="my-3">
                    <div v-for="(question, index) of survey.questions" :key="question.id">
                        <QuestionViewer v-model="answers[question.id]" :question="question" :index="index" />
                    </div>

                    <button type="submit"
                        class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                        Submit
                    </button>
                </div>
            </form>
        </div>
    </div>
</template>
  
<script setup>
import { computed, ref } from "vue";
import { useRoute } from "vue-router";
import { useStore } from "vuex";
import QuestionViewer from "../components/viewer/QuestionViewer.vue";

const loading = computed(() => store.state.currentSurvey.loading);
const survey = computed(() => store.state.currentSurvey.data);
const route = useRoute();
const store = useStore();

const surveyFinished = ref(false);
const answers = ref({});

store.dispatch('getSurveyBySlug', route.params.slug);

function submitSurvey() {
    console.log(JSON.stringify(answers.value, undefined, 2));
    store.dispatch('saveSurveyAnswer', {
        surveyId: survey.value.id,
        answers: answers.value,
    }).then((res) => {
        if (res.status === 201) {
            surveyFinished.value = true;
        }
    });
}

const submitAnotherResponse = () => {
    answers.value = {};
    surveyFinished.value = false;
}

</script>
  
<style scoped></style>