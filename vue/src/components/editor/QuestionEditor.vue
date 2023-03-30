<template>
    <!-- Question index -->
    <div class="flex items-center justify-between">
        <h3 class="text-lg font-bold">
            {{ index + 1 }}. {{ model.question }}
        </h3>
        <div class="flex items-center">
            <button type="button" @click="addQuestion()"
                class="flex items-center text-xs py-1 px-3 mr-2 rounded-sm text-white bg-gray-600 hover:bg-gray-700">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd"
                        d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                        clip-rule="evenodd" />
                </svg>
                Add
            </button>
            <button type="button" @click="deleteQuestion()"
                class=" flex items-center text-xs py-1 px-3 rounded-sm border border-transparent text-red-500 hover:border-red-600 ">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd"
                        d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                        clip-rule="evenodd" />
                </svg>
                Delete
            </button>
        </div>
    </div>
    <div class="grid gap-3 grid-cols-12">
        <div class="mt-3 col-span-9">
            <label :for="'question_text_' + model.data" class="block text-sm font-medium text-gray-700">Question
                Text</label>
            <input type="text" :name="'question_text_' + model.data" v-model="model.question" @change="dataChange"
                :id="'question_text_' + model.data"
                class=" mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
        </div>
        <div class="mt-3 col-span-3">
            <label for="question_type" class="block text-sm font-medium text-gray-700">Select Question Type</label>
            <select id="question_type" name="question_type" v-model="model.type" @change="typeChange"
                class=" mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                <option v-for="type in questionTypes" :key="type" :value="type">
                    {{ upperCaseFirst(type) }}
                </option>
            </select>
        </div>
    </div>
    <div class="mt-3 col-span-9">
        <label :for="'question_description_' + model.id" class="block text-sm font-medium text-gray-700">Description</label>
        <textarea :name="'question_description_' + model.id" v-model="model.description" @change="dataChange"
            :id="'question_description_' + model.id"
            class=" mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
    </div>
    <div>
        <div v-if="shouldHaveOptions()" class="mt-2">
            <h4 class="text-sm font-semibold mb-1 flex justify-between items-center">
                Options

                <!-- Add new option -->
                <button type="button" @click="addOption()"
                    class=" flex items-center text-xs py-1 px-2 rounded-sm text-white bg-gray-600 hover:bg-gray-700">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                        <path fill-rule="evenodd"
                            d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                            clip-rule="evenodd" />
                    </svg>
                    Add Option
                </button>
            </h4>
            <div v-if="!model.data.options?.length" class="text-xs text-gray-600 text-center py-3">
                You don't have any options defined
            </div>
            <div v-for="(option, index) in model.data.options" :key="option.uuid" class="flex items-center mb-1">
                <span class="w-6 text-sm"> {{ index + 1 }}. </span>
                <input type="text" tabindex="1" v-model="option.text" @change="dataChange"
                    class=" w-full rounded-sm py-1 px-2 text-xs border border-gray-300 focus:border-indigo-500" />
                <!-- Delete Option -->
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
    <hr class="my-4" />
</template>

<script setup>
import { ref, computed } from 'vue';
import store from '../../store';
import { v4 as uuidv4 } from 'uuid'

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

const setOptions = (options) => model.value.data.options = options;

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
    setOptions(getOptions().filter((opt) => opt !== op));
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
    emit('change', data);
}

const addQuestion = () => {
    emit("addQuestion", props.index + 1);
}

const deleteQuestion = () => {
    emit("deleteQuestion", props.question);
}

</script>

<style scoped></style>