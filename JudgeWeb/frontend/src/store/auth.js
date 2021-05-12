import Vue from 'vue';
import Vuex from 'vuex';
import jwt from 'jsonwebtoken';
import axios from 'axios';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        token: null,
        name : null,
        id : null
    },
    getter: {},
    mutations: {
        set_token (state, token) {
            state.token = token;
        },
        set_name (state, name) {
            state.name = name;
        },
        set_id (state, id){
            state.id = id;
        }
    },
    actions : {
        async login(context ,token) {
            const user = jwt.decode(token);
            axios.defaults.headers.common[
                'Authorization'
            ] = `Bearer ${token}`;
            context.commit('set_token', token);
            context.commit('set_name', user.name);
            context.commit('set_id', user.id);
            localStorage.setItem('token',token);
            localStorage.setItem('name',user.name);
            localStorage.setItem('id',user.id);
        },
        async logout(context) {
            delete axios.defaults.headers.common['Authorization'];
            context.commit('set_token', null);
            context.commit('set_name', null);
            context.commit('set_id', null);
            localStorage.removeItem('token');
            localStorage.removeItem('name');
            localStorage.removeItem('id');
        }
    }
});