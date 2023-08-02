const mutations = {
  'SET_CURSOS' (state, value) {
    state.cursos = value
  },
  'ADD_CURSO' (state, value) {
    state.cursos.push(value)
  },
  'EDIT_CURSO' (state, value) {
    const index = state.cursos.findIndex((curso) => curso.id === value.id)
    state.cursos.splice(index,1,value)
  },
  'DELETE_CURSO' (state, value) {
    const index = state.cursos.findIndex((curso) => curso.id === value.id)
    state.cursos.splice(index,1)
  }
}
export default mutations
