<template lang="pug">
#HomeView
  .headings
    h1.heading Explora nuestros cursos disponibles y empieza HOY a aprender.
    h2.mt-4.subheading Participa de la comunidad de aprendizaje online que tenemos preparada para tí.
  CardDisplay
  v-divider
  .headings
    h1.heading Miles de estudiantes nos recomiendan en toda Latinoamérica.
    h2.mt-4.subheading Aquí puedes revisar algunas de sus experiencias...
  TestimonialsCarousel
  v-divider.mt-8
  .headings
    h1.heading ¿Tienes dudas sobre nuestros cursos?
    h2.mt-4.subheading No te preocupes, ¡Contáctanos! y te ayudaremos.
  ContactSection
</template>

<script>
  import CardDisplay from '../components/CardDisplay'
  import TestimonialsCarousel from '../components/TestimonialsCarousel'
  import ContactSection from '../components/ContactSection'
  import cursos from '@/shared/cursos.json'
  import { mapActions } from 'vuex'

  export default {
    components: {
      CardDisplay,
      TestimonialsCarousel,
      ContactSection
    },
    methods: {
      ...mapActions('CursosStore', ['getCursos'])
    },
    created () {
      this.getCursos(cursos)
    }
  }
</script>
<style lang="scss">
@import '@/styles/main.scss';
#HomeView {
  background-color: $primary-color;
  height: 100%;
  padding: 100px 0;
}
.headings {
  padding: 3rem 12rem;
}
.heading {
  color: white;
  font-size: 46px;
  text-align: center;
}
.subheading {
  color: $accent-color;
  font-weight: 400;
  text-align: center;
}

</style>

