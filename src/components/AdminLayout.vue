<template lang="pug">
v-container.d-flex.flex-column(fluid)
  h1.mx-auto Administración
  v-btn.my-6.mx-auto.accentBtn(@click="openModal") Agregar Curso
  .table.d-flex.flex-column.my-6(elevation="0")
    v-text-field.searchInput(v-model="search" append-icon="mdi-magnify" label="Buscar Curso" single-line hide-details dense outlined clearable)
    v-data-table.mt-3(:headers="headers" :items="cursos" :search="search" no-data-text="No hay datos en la Tabla" hide-default-footer)
      template(v-slot:item.costo="{ item }") ${{ item.costo }}
      template(v-slot:item.completado="{ item }")
        v-chip.pa-2(:color="getColor(item.completado)" pill dark) {{ item.completado === true ? 'Sí' : 'No' }}
      template(v-slot:item.fecha_registro="{ item }") {{ formatDate(item.fecha_registro) }}
      template(v-slot:item.actions="{ item }")
        v-tooltip(bottom)
          template(v-slot:activator="{ on, attrs }")
            v-btn(color="green darken-3" icon v-bind="attrs" v-on="on" @click="openEditCursoDialog(item)")
              v-icon mdi-pencil
          span.pa-2 Editar Curso
        v-tooltip(bottom)
          template(v-slot:activator="{ on, attrs }")
            v-btn(color="red" icon v-bind="attrs" v-on="on" @click="openDeleteCursoDialog(item)")
              v-icon mdi-delete
          span.pa-2 Eliminar Curso
  .alerts.my-5
    v-alert.mb-5.pa-1.pl-3(outlined color="purple darken-1" icon="mdi-account-multiple") Cantidad total de alumnos permitidos: #[strong {{ getTotalStudents }} ] alumnos.
    v-alert.mb-5.pa-1.pl-3(outlined color="blue lighten-2" icon="mdi-account-check") Cantidad total de alumnos inscritos: #[strong {{ getStudentsInscribed }} ] alumnos.
    v-alert.mb-5.pa-1.pl-3(outlined color="red lighten-1" icon="mdi-account-plus") Cantidad total de cupos restantes: #[strong {{ getTotalStudents - getStudentsInscribed }} ] alumnos.
    v-alert.mb-5.pa-1.pl-3(outlined color="pink accent-2" icon="mdi-cancel") Cantidad total de cursos terminados: #[strong {{ getFinishedCurses }} ] cursos.
    v-alert.mb-5.pa-1.pl-3(outlined color="green darken-3" icon="mdi-bell-check") Cantidad total de cursos activos: #[strong {{ this.cursos.length - getFinishedCurses}} ] cursos.
    v-alert.pa-1.pl-3(outlined color="orange accent-3" icon="mdi-bell-outline") Cantidad total de cursos: #[strong {{ this.cursos.length }} ] cursos.

  //- MODAL PARA AGREGAR/EDITAR CURSOS
  v-dialog(v-model="dialog" width="600" persistent)
    v-card.pa-6
      v-card-title.justify-center.mb-3 {{ formData.id === null ? 'Formulario para Agregar Curso' : 'Formulario para Actualizar Curso' }}
      v-form(ref="form" v-model="valid" lazy-validation @submit.prevent="submit")
        v-text-field(v-model="formData.nombre" type="text" :counter="30" :rules="rules.nombre" label="Nombre del Curso" required outlined clearable)
        v-text-field(v-model="formData.img" :rules="rules.img" label="URL de la Imagen" required outlined clearable)
        v-text-field(v-model="formData.cupos" type="number" min="1" :rules="rules.cupos" label="Cupos del Curso" required outlined)
        v-text-field(v-model="formData.inscritos" type="number" min="0" :rules="rules.inscritos" label="Inscritos en el curso" required outlined)
        v-text-field(v-model="formData.duracion" type="text" :rules="rules.duracion" label="Duración del Curso" required outlined clearable)
        v-text-field(v-model="formData.fecha_registro" type="date" :rules="rules.fecha_registro" label="Fecha de Registro" required outlined)
        v-text-field(v-model="formData.costo" type="text" :rules="rules.costo" label="Costo del Curso" required outlined clearable)
        v-textarea(v-model="formData.descripcion" :rules="rules.descripcion" label="Descripción del Curso" required outlined clearable counter)
        v-switch(v-if="formData.id !== null" v-model="formData.completado" color="accent" :rules="rules.completado" :label="`Estado del Curso: ${formData.completado ? switchTrue : switchFalse}`" required)
        v-card-actions
          v-btn.accentBtn(color="accent" type="submit" :disabled="checkFormValidations") {{ formData.id === null ? 'Agregar' : 'Actualizar' }}
          v-spacer
          v-btn(color="accent" outlined @click="resetForm") Limpiar
          v-spacer
          v-btn(color="grey lighten-1" @click="closeDialog") Cancelar

  //- MODAL CONFIRMACION DELETE CURSO
  v-dialog(v-model="deleteDialog" width="400" persistent)
    v-card.pa-6
      v-card-title.d-flex.flex-column.align-center
        v-icon(color="red" x-large) mdi-alert
      v-card-subtitle.d-flex.flex-column.align-center.mt-4 ¿Estás seguro que deseas eliminar el curso "{{ formData.nombre }}"?
      v-card-actions
        v-btn(color="accent" outlined @click="deleteDialog = false") Cancelar
        v-spacer
        v-btn.accentBtn(color="accent" @click="confirmDeleteCurso") Confirmar

</template>
<script>
import { mapActions, mapGetters } from 'vuex'
export default {
  data () {
    return {
      headers: [
        { text: 'Curso', value: 'nombre', filterable: true },
        { text: 'Cupos', value: 'cupos', align: 'center', sortable: false },
        { text: 'Inscritos', value: 'inscritos', align: 'center', sortable: false },
        { text: 'Duración', value: 'duracion' },
        { text: 'Costo', value: 'costo' },
        { text: 'Terminado', value: 'completado', align: 'center', sortable: false },
        { text: 'Fecha de Registro', value: 'fecha_registro' },
        { text: 'Acciones', value: 'actions', align: 'center', sortable: false }
      ],
      search: '',
      dialog: false,
      valid: true,
      formData: {
        id: null,
        nombre: '',
        img: '',
        cupos: 1,
        inscritos: 0,
        duracion: '',
        fecha_registro: new Date().toISOString().split('T')[0],
        costo: '',
        descripcion: '',
        completado: false
      },
      switchTrue: 'Terminado',
      switchFalse: 'No Terminado',
      deleteDialog: false,
      // Validaciones del Formulario
      rules: {
        nombre: [
          v => !!v || 'El nombre del Curso es requerido.',
          v => (v && v.length <= 30) || 'El nombre del Curso no puede tener más de 30 caracteres.',
        ],
        img: [
          v => !!v || 'La URL de la imagen del curso es requerida.'
        ],
        cupos: [
          v => !!v || 'La cantidad de cupos es requerida.',
          v => (parseInt(v) > 0) || 'La cantidad de cupos no puede ser menor o igual a 0.'
        ],
        inscritos: [
          v => !!v || 'La cantidad de inscritos es requerida.',
          v => (parseInt(v) <= parseInt(this.formData.cupos)) || 'La cantidad de inscritos no puede ser mayor a los cupos disponibles.'
        ],
        duracion: [
          v => !!v || 'La duración del curso es requerida.'
        ],
        fecha_registro: [
          v => !!v || 'La fecha de registro es requerida.'
        ],
        costo: [
          v => !!v || 'El costo del curso es requerida.'
        ],
        descripcion: [
          v => !!v || 'La descripción del curso es requerida.',
          v => (v && v.length <= 100) || 'La descripción no puede tener más de 100 caracteres.'
        ],
      }
    }
  },
  methods: {
    ...mapActions('CursosStore', ['addCurso', 'editCurso', 'deleteCurso']),
    getColor(finishState) {
      return finishState === true ? 'red' : 'green darken-3'
    },
    openModal () {
      this.formData = {
        id: null,
        nombre: '',
        img: '',
        cupos: 1,
        inscritos: 0,
        duracion: '',
        fecha_registro: new Date().toISOString().split('T')[0],
        costo: '',
        descripcion: '',
        completado: false
      }
      this.dialog = true
    },
    resetForm () {
      this.$refs.form.reset()
    },
    submit () {
      const action = this.formData.id ? this.editCurso : this.addCurso
      action(this.formData)
      this.$toast.success('El curso ha sido creado correctamente.')
      this.dialog = false
    },
    openEditCursoDialog (curso) {
      this.formData = {
        id: curso.id,
        nombre: curso.nombre,
        img: curso.img,
        cupos: curso.cupos,
        inscritos: curso.inscritos,
        duracion: curso.duracion,
        fecha_registro: curso.fecha_registro,
        costo: curso.costo,
        descripcion: curso.descripcion,
        completado: curso.completado
      }
      this.dialog = true
    },
    confirmDeleteCurso () {
      this.deleteCurso(this.formData)
      this.deleteDialog = false
      this.$toast.success('El curso ha sido Eliminado.')
    },
    closeDialog () {
      this.resetForm()
      this.dialog = false
    },
    openDeleteCursoDialog (item) {
      this.formData = item
      this.deleteDialog = true
    },
    formatDate (date) {
      const d = date.split('-')
      return `${d[2]}/${d[1]}/${d[0]}`
    }
  },
  computed: {
    ...mapGetters('CursosStore', ['cursos']),
    state () {
      return {
        nombre: this.formData.nombre === '',
        img: this.formData.img === '',
        cupos: this.formData.cupos === 1,
        inscritos: this.formData.inscritos < 0,
        duracion: this.formData.duracion === '',
        costo: this.formData.costo === '',
        descripcion: this.formData.descripcion === ''
      }
    },
    checkFormValidations () {
      return Object.values(this.state).includes(true)
    },
    getTotalStudents () {
      const initial = 0
      return this.cursos.reduce((acc, curr) => acc + curr.cupos, initial)
    },
    getStudentsInscribed () {
      const initial = 0
      return this.cursos.reduce((acc, curr) => acc + parseInt(curr.inscritos), initial)
    },
    getFinishedCurses () {
      return this.cursos.filter(curso => curso.completado === true).length
    }
  },
  watch: {
    formData: {
      handler() {
        if (this.formData.completado) {
          this.formData.inscritos = '0'
        }
      },
      deep: true
    }
  }
}
</script>
<style lang="scss" scoped>
@import '@/styles/main.scss';
#AdminLayout {
  height: 100%;
}
.table {
  color: black;
}
.v-data-table::v-deep .v-data-table-header {
  background-color: $accent-color;
}
.searchInput {
  width: 40%;
  align-self: end;
}
</style>