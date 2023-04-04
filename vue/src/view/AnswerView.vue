<template>
    <PageComponent>
        <template v-slot:header>
            <!-- flex justify-between items-center  -->
            <div class="lg:flex lg:items-center lg:justify-between">
                <div class="min-w-0 flex-1">
                    <h1 class="text-3xl font-bold text-grey-900">
                        <span class="text-cyan-600">{{ route.params.title }} </span> Answers
                    </h1>
                </div>
            </div>
        </template>
    </PageComponent>
</template>

<script setup>
import PageComponent from '../components/PageComponent.vue';
import { useRoute, useRouter } from "vue-router";

const router = useRouter();
const route = useRoute();

</script>

<style scoped></style>