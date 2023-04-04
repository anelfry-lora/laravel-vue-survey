<template>
    <PageComponent>
        <template v-slot:header>
            <!-- flex justify-between items-center  -->
            <div class="lg:flex lg:items-center lg:justify-between">
                <div class="min-w-0 flex-1">
                    <h1 class="text-3xl font-bold text-grey-900">
                        {{ route.params.id ? model.title : "Create a Survey" }}
                    </h1>
                </div>
                <div class="mt-5 flex lg:mt-0 lg:ml-4">
                    <button v-if="route.params.id" type="button" @click="deleteSurvey()"
                        class="py-1 px-3 items-center rounded-sm text-white bg-red-600 hover:bg-red-700">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"
                            class="w-5 h-5 -mt-1 inline-flex">
                            <path fill-rule="evenodd"
                                d="M8.75 1A2.75 2.75 0 006 3.75v.443c-.795.077-1.584.176-2.365.298a.75.75 0 10.23 1.482l.149-.022.841 10.518A2.75 2.75 0 007.596 19h4.807a2.75 2.75 0 002.742-2.53l.841-10.52.149.023a.75.75 0 00.23-1.482A41.03 41.03 0 0014 4.193V3.75A2.75 2.75 0 0011.25 1h-2.5zM10 4c.84 0 1.673.025 2.5.075V3.75c0-.69-.56-1.25-1.25-1.25h-2.5c-.69 0-1.25.56-1.25 1.25v.325C8.327 4.025 9.16 4 10 4zM8.58 7.72a.75.75 0 00-1.5.06l.3 7.5a.75.75 0 101.5-.06l-.3-7.5zm4.34.06a.75.75 0 10-1.5-.06l-.3 7.5a.75.75 0 101.5.06l.3-7.5z"
                                clip-rule="evenodd" />
                        </svg>
                        Delete Survey
                    </button>
                </div>
            </div>
        </template>
        <Loading v-if="surveyLoading"/>
        <div v-else>
            <form @submit.prevent="saveSurvey" class="animate-fade-in-down">
                <div class="shadow sm:rounded-md sm:overflow-hidden">
                    <!-- Survey Fields -->
                    <div class="px-4 py-5 bg-white space-y-6 sm:p-6">
                        <div>
                            <label class="block text-sm font-medium text-gray-700">
                                Image
                            </label>
                            <div class="mt-1 flex items-center">
                                <img v-if="model.image_url" :src="model.image_url" :alt="model.title"
                                    class="w-64 h-48 object-cover" />
                                <span v-else
                                    class="flex items-center justify-center h-12 w-12 rounded-full overflow-hidden bg-gray-100">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                                        stroke="currentColor" class="h-[80%] w-[80%] text-gray-300">
                                        <path stroke-linecap="round" stroke-linejoin="round"
                                            d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                                    </svg>
                                </span>
                                <button type="button" @change="onImageChoose"
                                    class="relative overflow-hidden ml-5 rounded-md border border-gray-300 bg-white py-2 px-3 text-sm font-medium leading-4 text-gray-700 shadow-sm hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                                    <input type="file"
                                        class="absolute left-0 top-0 right-0 bottom-0 opacity-0 cursor-pointer" />
                                    Change
                                </button>
                            </div>
                        </div>
                        <div>
                            <label for="title" class="mt-4 block text-sm font-medium text-gray-700">
                                Title
                            </label>
                            <input type="text" name="title" id="title" v-model="model.title" autocomplete="survey_title"
                                class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md">
                        </div>
                        <div>
                            <label for="description" class="block text-sm font-medium text-gray-700">
                                Description
                            </label>
                            <div class="mt-1">
                                <textarea name="description" id="description" cols="30" rows="3" v-model="model.description"
                                    autocomplete="survey_description" placeholder="Describe your surveys"
                                    class="shadow-sm focus:ring-indigo-500 focus:boder-indigo-500 mt-1 block w-full sm:text-sm border-gray-300 rounded-md">
                                </textarea>
                            </div>
                        </div>
                        <div>
                            <label for="expire_date" class="block text-sm font-medium text-gray-700">
                                Expire Date
                            </label>
                            <input type="date" name="expire_date" id="expire_date" v-model="model.expire_date"
                                class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md">
                        </div>
                        <div class="flex items-start">
                            <div class="flex items-center h-5">
                                <input type="checkbox" name="status" id="status" v-model="model.status"
                                    class="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded">
                            </div>
                            <div class="ml-3 text-sm">
                                <label for="status" class="block text-sm font-medium text-gray-700">
                                    Active
                                </label>
                            </div>
                        </div>
                    </div>
                    <!--/ Survey Fields -->
                    <div class="px-4 py-5 bg-white space-y-6 sm:p-6">
                        <h3 class="text-2xl font-semibold flex items-center justify-between">
                            Questions
                            <button type="button" @click="addQuestion()"
                                class="flex items-center text-sm py-1 px-4 rounded-sm text-white bg-gray-600 hover:bg-gray-700">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6">
                                    <path fill-rule="evenodd"
                                        d="M12 5.25a.75.75 0 01.75.75v5.25H18a.75.75 0 010 1.5h-5.25V18a.75.75 0 01-1.5 0v-5.25H6a.75.75 0 010-1.5h5.25V6a.75.75 0 01.75-.75z"
                                        clip-rule="evenodd" />
                                </svg>
                                Add Question
                            </button>
                        </h3>
                        <div v-if="!model.questions.length" class="text-center text-gray-600">
                            You don't have any question created.
                        </div>
                        <div v-for="(question, index) in model.questions" :key="question.id">
                            <QuestionEditor :question="question" :index="index" @change="questionChange"
                                @addQuestion="addQuestion" @deleteQuestion="deleteQuestion" />
                        </div>
                    </div>
                    <div class="px-4 py-3 bg-gray-50 text-right sm:px-6 ">
                        <button type="summit"
                            class="inline-flex justify-centel shadow-sm font-medium py-2 px-4 items-center rounded-sm text-white bg-cyan-600 hover:bg-cyan-700">
                            Save
                        </button>
                    </div>
                </div>
            </form>
        </div>
        <!-- <pre>{{ model }}</pre> -->
    </PageComponent>
</template>

<script setup>
import { ref, watch, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
// import surveyStore from "../store/surveys";
import store from "../store";
import PageComponent from "../components/PageComponent.vue";
import QuestionEditor from '../components/editor/QuestionEditor.vue';
import { v4 as uuidv4 } from 'uuid';
import Loading from "../components/Loading.vue";
// import SurveysView from "./SurveysView.vue";

const router = useRouter();
const route = useRoute();
const surveyLoading = computed(() => store.state.currentSurvey.loading);

//create empy survey
let model = ref({
    title: '',
    slug: '',
    status: false,
    description: null,
    image: null,
    image_url: null,
    expire_date: null,
    questions: [],
});

//Watch to current survey data change and when this happes we update local model variable.
watch(
    () => store.state.currentSurvey.data,
    (newVal, oldVal) => {
        model.value = {
            ...JSON.parse(JSON.stringify(newVal)),
            status: newVal.status !== "draft",
        }
    }
);

if (route.params.id) {
    store.dispatch('getSurvey', route.params.id);
}

const onImageChoose = (ev) => {
    const file = ev.target.files[0];
    const reader = new FileReader();

    reader.onload = () => {
        //The field to send on backend and apply validations.
        model.value.image = reader.result;

        //the field to display here.
        model.value.image_url = reader.result;
    }
    reader.readAsDataURL(file);
}

const addQuestion = (index) => {
    const newQuestion = {
        id: uuidv4(),
        type: 'text',
        question: '',
        description: '',
        data: {},
    }

    model.value.questions.splice(index, 0, newQuestion);
}

const deleteQuestion = (question) => {
    model.value.questions = model.value.questions.filter(
        (q) => q !== question
    );
}

const questionChange = (question) => {
    if (question.data.options) {
        question.data.options = [...question.data.options];
    }
    model.value.questions = model.value.questions.map(
        (q) => {
            if (q.id === question.id) {
                return JSON.parse(JSON.stringify(question));
            }
            return q;
        }
    )
}

//Create or Update survey
const saveSurvey = () => {
    store.dispatch("saveSurvey", model.value).then((data) => {
        store.commit('notify', {
            type: 'success', 
            message: 'Survey was successfully updated.'
        });
        router.push({
            name: 'SurveyView',
            params: { id: data.data.id },
        });
    });
}


const deleteSurvey = () => {
    let msj = `will be deleted "${model.value.title}" Survey. Are you sure you want to delete this survey? Operation can't be undone!`;
    if (confirm(msj)) {
        store.dispatch('deleteSurvey', model.value.id)
            .then(() => {
                router.push({
                    neme: "Surveys",
                })
            });
    }
}
</script>

<style scoped></style>
