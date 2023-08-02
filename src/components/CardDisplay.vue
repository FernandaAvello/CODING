<template lang="pug">
v-container(fluid)
  v-row.mb-4
    v-col.d-flex.justify-center(cols="4" v-for="curso in cursos" :key="curso.id")
      div.card.mx-4
        v-card.card2.pa-6.d-flex.align-center.flex-column(height="520" width="360" dark)
          v-img(:src="curso.img" max-height="190px" max-width="190px")
          v-card-title(style="font-size: 16px;") #[strong {{ curso.nombre }} ]
          v-card-subtitle Información
          v-card-text #[strong Costo:] ${{ curso.costo }}
          v-card-text #[strong Duración:] {{ curso.duracion }}
          v-card-text #[strong Cupos:] {{ curso.cupos }}
          v-card-text #[strong Completado:] {{ curso.completado === true ? 'Sí' : 'No' }}
          v-card-text #[strong Fecha de Registro:] {{ formatDate(curso.fecha_registro) }}
          v-card-text #[strong Descripción:] {{ curso.descripcion }}
</template>
<script>
import { mapGetters } from 'vuex'

export default {
  data () {
    return {
      model: null,
    }
  },
  computed: {
    ...mapGetters('CursosStore', ['cursos'])
  },
  methods: {
    formatDate (date) {
      const d = date.split('-')
      return `${d[2]}/${d[1]}/${d[0]}`
    }
  }
}
</script>
<style lang="scss" scoped>
.v-card__text {
  padding: 0;
}
</style>