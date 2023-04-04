<template>
    <PageComponent>
        <template v-slot:header>
            <div class="flex justify-between items-center">
                <h1 class="text-3xl font-bold text-grey-900">Surveys</h1>
                <router-link :to="{ name: 'SurveyCreate' }"
                    Class="py-2 px-4 items-center rounded-sm text-white bg-cyan-600 hover:bg-cyan-700">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                        stroke="currentColor" class="h-4 w-4 -mt-1 inline-block">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                    </svg>
                    Add new Survey
                </router-link>
            </div>
        </template>

        <Loading  v-if="surveys.loading"/>

        <div v-else-if="surveys.data.length">
            <div class="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3">
                <SurveyListItem v-for="(survey, ind) in surveys.data" :key="survey.id" :survey="survey"
                    @delete="deleteSurvey(survey)" class="opacity-0 animate-fade-in-down"
                    :style="{ animationDelay: `${ind * 0.1}s` }" />
            </div>

            <div class="flex justify-center mt-5">
                <nav class="relative z-0 inline-flex justify-center rounded-md shadow-sm -space-x-px"
                    aria-label="Pagination">
                    <a v-for="(link, i) of surveys.links" :key="i" :disabled="!link.url" href="#"
                        @click="getForPage($event, link)" aria-current="page"
                        class="relative inline-flex items-center px-4 py-2 border text-sm font-medium whitespace-nowrap"
                        :class="[
                            link.active ? 'z-10 border-gray-500 bg-gray-800 text-white' : 'bg-white border-gray-300 text-gray-900 hover:bg-gray-50',
                            i === 0 ? 'rounded-l-md bg-gray-900' : '',
                            i === surveys.links.length - 1 ? 'rounded-r-md' : '',
                        ]" v-html="link.label">
                    </a >
                </nav>
            </div>
        </div>
        <div v-else class="text-gray-600 text-center py-16">
            Your don't have surveys yet
        </div>        
    </PageComponent>
</template>

<script setup>
import store from "../store";
import { computed } from "vue";
import PageComponent from "../components/PageComponent.vue";
import SurveyListItem from "../components/SurveyListItem.vue";
import Loading from "../components/Loading.vue";

store.dispatch('getSurveys');

const surveys = computed(() => store.state.surveys)

const deleteSurvey = (survey) => {
    let msj = `Are you sure you want to delete this survey? Peration can't be undone!!`;
    if (confirm(msj)) {
        store.dispatch('deleteSurvey', survey.id)
            .then(() => {
                store.dispatch('getSurveys')
            });
    }
}

const getForPage = (ev, link) => {
    ev.preventDefault();

    if (!link.url || link.active) {
        return;
    }

    store.dispatch('getSurveys', { url: link.url })
}

</script>
