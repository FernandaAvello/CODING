export const cursos = state => {
  return state.cursos.map((curso) => {
    if (curso.fecha_registro.indexOf('/') !== -1) {
      const nuevaFecha = curso.fecha_registro.split('/')
      return {
        ...curso,
        fecha_registro: `${nuevaFecha[2]}-${nuevaFecha[1]}-${nuevaFecha[0]}`
      }
    }
    return {
      ...curso
    }
  })
}