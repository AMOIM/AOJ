import Vue from 'vue';
import Vuex from 'vuex';
import jwt from 'jsonwebtoken';
import axios from 'axios';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        token: null,
        user : null
    },
    getter: {},
    mutations: {
        set_token (state, token) {
            state.token = token;
        },
        set_user (state, user) {
            state.user = user;
        }
    },
    actions : {
        async login(context ,token) {
            const name = jwt.decode(token);
            axios.defaults.headers.common[
                'Authorization'
            ] = `Bearer ${token}`;
            context.commit('set_token', token);
            context.commit('set_user', name.name);
            localStorage.setItem('token',token);
            localStorage.setItem('name',name.name);
        },
        async logout(context) {
            delete axios.defaults.headers.common['Authorization'];
            context.commit('set_token', null);
            context.commit('set_user', null);
            localStorage.removeItem('token');
            localStorage.removeItem('name');
        }
    }
});