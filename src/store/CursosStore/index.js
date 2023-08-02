import * as actions from './actions'
import mutations from './mutations'
import * as getters from './getters'

const CursosStore = {
  namespaced: true,
  state: {
    cursos: []
  },
  getters,
  mutations,
  actions
}

export default CursosStore
