<template>
    <div class="flex items-center justify-between">
        <h2 class="text-lg font-bold">
            {{ index + 1 }}. {{ model.question }}
        </h2>
        <div class="flex items-center">
            <button type="button" @click="addQuestion()"
                class="flex items-center text-xs py-1 px-3 mr-2 rounded-sm text-white bg-gray-600 hover:bg-gray-700">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6">
                    <path fill-rule="evenodd"
                        d="M12 5.25a.75.75 0 01.75.75v5.25H18a.75.75 0 010 1.5h-5.25V18a.75.75 0 01-1.5 0v-5.25H6a.75.75 0 010-1.5h5.25V6a.75.75 0 01.75-.75z"
                        clip-rule="evenodd" />
                </svg>
                Add
            </button>

            <button type="button" @click="deleteQuestion()"
                class="flex items-center py-1 px-3 rounded-sm border border-transparent text-xs text-red-500
                focus:ring-2 focus:ring-offset-2 focus:ring-red-500 hover:border-red-600">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                    stroke="currentColor" class="w-6 h-6">
                    <path stroke-linecap="round" stroke-linejoin="round"
                        d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                </svg>
                Delete
            </button>
        </div>
    </div>

    <div class="grid gap-3 grid-cols-12">
        <div class="mt-3 col-span-9">
            <label :for="`question_text_ ${model.data}`" class="block text-sm font-medium text-gray-700">
                Question Text
            </label>
            <input type="text" name="`question_text_ ${model.data }`" id="`question_text_ ${model.data }`"
                v-model="model.question" @change="dataChange"
                class="mt-1 focus:ring-indigo-500 focus-indido-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md">
        </div>
        <div class="mt-3 col-span-3">
            <label for="question_type" class="block text-sm font-medium text-gray-700">
                Select Question Type
            </label>
            <select id="question_type" name="question_type" v-model="model.type" @change="typeChange"
                class="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                <option v-for="type in questionTypes" :key="type" :value="type">
                    {{ upperCaseFirst(type) }}
                </option>
            </select>
        </div>
    </div>
    <div class="mt-3 col-span-9">
        <label :for="`question_description_${model.id}`" class="block text-sm font-medium text-gray-700">
            Description
        </label>
        <textarea v-model="model.description" :name="`question_description_${model.id}`"
            id="`question_description_${model.id}`" @change="dataChange"
            class="mt-1 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"></textarea>
    </div>

    <div>
        <div v-if="shouldHaveOptions()" class="mt-2">
            <h4 class="text-sm font-semibold mb-1 flex justify-between items-center">
                Options
                <button type="button" @click="addOption()"
                    class="flex items-center text-xs py-1 px-2 rounded-sm text-white bg-gray-600 hover:bg-gray-700">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                        stroke="currentColor" class="w-6 h-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v12m6-6H6" />
                    </svg>
                    Add Option
                </button>
            </h4>
            <div v-if="!model.data.options.length" class="text-xs text-gray-600 text-center py-3">
                You don't have any option defined
            </div>
            <div v-for="(option, index) in model.data.options" :key="option.uuid" class="flex items-center mb-1">
            
                <span class="w-6 text-sm"> {{ index + 1 }}.</span>
                <input type="text" v-model="option.text" @change="dataChange"
                    class="w-full rounded-sm py-1 px-2 text-xs border border-gray-300 focus:border-indigo-500">
                <button type="button" @click="removeOption(option)"
                    class="h-6 w-6 flex items-center justify-center text-gray-600 hover:text-red-500">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5">
                        <path fill-rule="evenodd"
                            d="M8.75 1A2.75 2.75 0 006 3.75v.443c-.795.077-1.584.176-2.365.298a.75.75 0 10.23 1.482l.149-.022.841 10.518A2.75 2.75 0 007.596 19h4.807a2.75 2.75 0 002.742-2.53l.841-10.52.149.023a.75.75 0 00.23-1.482A41.03 41.03 0 0014 4.193V3.75A2.75 2.75 0 0011.25 1h-2.5zM10 4c.84 0 1.673.025 2.5.075V3.75c0-.69-.56-1.25-1.25-1.25h-2.5c-.69 0-1.25.56-1.25 1.25v.325C8.327 4.025 9.16 4 10 4zM8.58 7.72a.75.75 0 00-1.5.06l.3 7.5a.75.75 0 101.5-.06l-.3-7.5zm4.34.06a.75.75 0 10-1.5-.06l-.3 7.5a.75.75 0 101.5.06l.3-7.5z"
                            clip-rule="evenodd" />
                    </svg>
                </button>
            </div>
        </div>
    </div>
    <hr class="my-4">
</template>

<script setup>
import { ref, computed } from 'vue';
import store from '../../store';
import {v4 as uuidv4 } from 'uuid'

const props = defineProps({
    question: Object,
    index: Number
});

const emit = defineEmits(['change', 'addQuestion', 'deleteQuestion']);

//Re-create the whole question data to avoid unintentional rederence chage
const model = ref(JSON.parse(JSON.stringify(props.question)));

//Get question type from vuex
const questionTypes = computed(() => store.state.questionTypes);

const upperCaseFirst = (str) => str.charAt(0).toUpperCase() + str.slice(1);

//check if the question have options
const shouldHaveOptions = () => ['select', 'radio', 'checkbox'].includes(model.value.type);

const getOptions = () => model.value.data.options;

const setOptions = (options) =>  model.value.data.options = options;

//Add option
const addOption = () => {
    setOptions([
        ...getOptions(),
        { uuid: uuidv4(), text: "" },
    ]);
    dataChange();
}

//Remove option 
const removeOption = (op) => {
    setOptions(getOptions().filter( 
        (opt) => opt !== op )
    );
    dataChange();
}

const typeChange = () => {
    if (shouldHaveOptions()) {
        setOptions(getOptions() || []);
    }
    dataChange();
}

//Emit the data change
const dataChange = () => {
    const data = model.value;
    if (!shouldHaveOptions()) {
        delete data.data.options
    };
}

const addQuestion = () => { 
    emit("addQuestion", props.index + 1);
}

const deleteQuestion = () => { 
    emit("deleteQuestion", props.question);
}
</script>

<style scoped></style>