export const getCursos = ({commit}, cursos) => {
  commit('SET_CURSOS', cursos)
}
export const addCurso = ({commit}, curso) => {
  commit('ADD_CURSO', curso)
}
export const editCurso = ({commit}, curso) => {
  commit('EDIT_CURSO', curso)
}
export const deleteCurso = ({commit}, curso) => {
  commit('DELETE_CURSO', curso)
}