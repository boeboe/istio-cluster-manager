import axios from 'axios'

const apiClient = axios.create({
  baseURL: 'http://localhost:3000',
  withCredentials: false,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }
})

export default {
  getClusters () {
    return apiClient.get('/clusters')
  },
  getCluster (id) {
    return apiClient.get('/clusters/' + id)
  },
  createCluster (cluster) {
    return apiClient.post('/clusters', cluster)
  },
  updateCluster (id, cluster) {
    return apiClient.put('/clusters/' + id, cluster)
  },
  deleteCluster (id) {
    return apiClient.delete('/clusters/' + id)
  }
}
