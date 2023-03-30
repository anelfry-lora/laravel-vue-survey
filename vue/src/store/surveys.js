import { createStore } from 'vuex'
import axiosClient from "../axios";

const store = createStore({
    state: {
        currentSurvey: {
            loading: false,
            data: {}
        },
        surveys: {
            loading: false,
            links: [],
            data: []
        },
        questionTypes: ['text', 'select', 'radio', 'checkbox', 'textarea'],
        notification: {
            show: false,
            type: null,
            message: null,
        },
    },
    getters: {},
    actions: {
        getSurvey({ commit }, id) {
            commit('setCurrentSurveyLoading', true);
            return axiosClient
                .get(`/survey/${id}`)
                .then((res) => {
                    commit('setCurrentSurvey', res.data);
                    commit('setCurrentSurveyLoading', false);
                    return res;
                })
                .catch((err) => {
                    commit('setCurrentSurveyLoading', false);
                    throw err;
                });
        },
        saveSurvey({ commit }, survey) {

            delete survey.image_url;

            let response;
            if (survey.id) {
                response = axiosClient
                    .put(`/survey/${survey.id}`, survey)
                    .then((res) => {
                        commit('setCurrentSurvey', res.data);
                        return res
                    });
            } else {
                response = axiosClient
                    .post(`/survey`, survey)
                    .then((res) => {
                        commit('setCurrentSurvey', res.data);
                        return res;
                    })
            }
            return response;
        },
        deleteSurvey({ }, id) {
            return axiosClient.delete(`/survey/${id}`);
        },
        getSurveys({ commit }, { url = null } = {}) {
            url = url || '/survey'
            commit('setSurveysLoading', true)
            return axiosClient.get(url)
                .then((res) => {
                    commit('setSurveysLoading', false)
                    commit('setSurveys', res.data);
                    return res;
                });
        },
        getSurveyBySlug({ commit }, slug) {
            commit('setSurveysLoading', true)
            return axiosClient.get(`/survey-by-slug/${slug}`)
                .then((res) => {
                    commit('setCurrentSurveyLoading', false)
                    commit('setCurrentSurvey', res.data);
                    return res;
                }).catch((err) => {
                    commit('setCurrentSurveyLoading', false);
                    throw err;
                });
        },
        saveSurveyAnswer({ commit }, { surveyId, answers }) {
            return axiosClient.post(`/survey/${surveyId}/answer`, { answers });
            
        },
    },
    mutations: {
        setCurrentSurvey: (state, survey) => {
            state.currentSurvey.data = survey.data;
        },
        setCurrentSurveyLoading: (state, loading) => {
            state.currentSurvey.loading = loading;
        },
        setSurveysLoading: (state, loading) => {
            state.surveys.loading = loading;
        },
        setSurveys: (state, surveys) => {
            state.surveys.links = surveys.meta.links;
            state.surveys.data = surveys.data;
        },
        notify: (state, { type, message }) => {
            state.notification.show = true;
            state.notification.type = type;
            state.notification.message = message;

            setTimeout(() => {
                state.notification.show = false;
            }, 3000);
        }
    },
    modules: {}
})

export default store