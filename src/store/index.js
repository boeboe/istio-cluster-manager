import Vue from 'vue'
import Vuex from 'vuex'
import ClusterService from '../services/ClusterService'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: 'Bart Van Bos',
    clusters: []
  },
  mutations: {
    ADD_CLUSTER (state, cluster) {
      state.clusters.push(cluster)
    },
    UPDATE_CLUSTER (state, [id, cluster]) {
      var index = state.clusters.map(function (cluster) {
        return cluster.id
      }).indexOf(id)
      state.clusters.splice(index, 1, cluster)
    },
    DELETE_CLUSTER (state, id) {
      var index = state.clusters.map(function (cluster) {
        return cluster.id
      }).indexOf(id)
      state.clusters.splice(index, 1)
    },
    SET_CLUSTERS (state, clusters) {
      state.clusters = clusters
    }
  },
  actions: {
    getClusters ({ commit }) {
      ClusterService.getClusters()
        .then(response => {
          commit('SET_CLUSTERS', response.data)
        })
        .catch(error => {
          console.log(error)
        })
    },
    createCluster ({ commit }, cluster) {
      ClusterService.createCluster(cluster)
        .then((response) => {
          commit('ADD_CLUSTER', response.data)
        })
        .catch(error => {
          console.log(error)
        })
    },
    updateCluster ({ commit }, [id, cluster]) {
      ClusterService.updateCluster(id, cluster)
        .then((response) => {
          commit('UPDATE_CLUSTER', [id, response.data])
        })
        .catch(error => {
          console.log(error)
        })
    },
    deleteCluster ({ commit }, id) {
      ClusterService.deleteCluster(id)
        .then(() => {
          commit('DELETE_CLUSTER', id)
        })
        .catch(error => {
          console.log(error)
        })
    }
  },
  modules: {
  }
})
