'use strict'

import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

// import helper from '../helper'

Vue.use(Vuex)

let apiName = 'http://localhost:3000/'
// apiName = '';

const state = {
  list: [],
  article: {}
}

// 定义mutations
const mutations = {
    // article list
  SET_ARTICLIE_LIST (state, list) {
    state.list = [...state.list, ...list]
  },
  SET_PRAISE (state, item) {
    if (item.praised) {
      item.praised = false
      item.AgreeNum --
    } else {
      item.praised = true
      item.AgreeNum ++
    }
  },
    // article context
  SET_ARTICLIE (state, data) {
    state.article = data
  },
  RESET_DETAIL (state) {
    state.article = {}
  }
}

// 定义数据操作动作
const actions = {

  UPDATE_PRAISE ({commit}) {
    commit('SET_PRAISE')
  },

  FETCH_ARTICLE_LIST ({commit}, index) {
    return axios.get(`${apiName}/api/articles`, {
      params: {
        index: index
      }
    })
            .then(res => {
              console.log(res)
              let list
              if (res.status === 200 && res.data && res.data.Code === 1) {
                let {Value = {}} = res.data
                list = Value.List
                list.forEach(item => {
                  item.praised = false
                })
              } else {
                list = []
              }
              commit('SET_ARTICLIE_LIST', list)
            })

        // console.log(helper);
        // let data = helper.clone(articleData);

        // commit('SET_ARTICLIE_LIST', data);
  },

  FETCH_DETAIL ({commit}, id) {
        // let timeout = 1000 * Math.random();
    return axios.get(`${apiName}/api/article/${id}`)
            .then(res => {
              console.log(res)
              let {status, data} = res
              if (status === 200 && data && data.Code === 0) {
                res = data.Value
              } else {
                res = {}
              }

              commit('SET_ARTICLIE', res)
            })
        // return new Promise((resolve, reject) => {
        //     setTimeout(() => {
        //         // 异步中 commit 数据设置
        //         let data = detailData[id];
        //         if(data){
        //             commit('SET_ARTICLIE', data.Value);
        //             resolve();
        //         }else{
        //             reject({code: 'data not found'});
        //         }
        //     }, timeout);
        // });
        // commit('get')
  },
  RESET_DETAIL ({commit}) {
    commit('RESET_DETAIL')
  }
}

const getters = {

}

const modules = {

}

export default new Vuex.Store({
  state,
  mutations,
  actions,
  getters,
  modules
})
