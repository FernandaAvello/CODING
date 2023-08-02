<template lang="pug">
v-container.d-flex.justify-center.mx-auto
  v-carousel(cycle height="400" hide-delimiter-background show-arrows-on-hover)
    v-carousel-item(v-for="(slide, i) in slides" :key="i")
      v-sheet(height="100%" dark elevation="24")
        v-row.fill-height.align-center.justify-center
          div.text-h5.d-flex.text-center {{ slide.text }}
          div.d-flex #[em {{ slide.student }} ]

</template>
<script>
export default {
  data () {
    return {
      slides: [
        { student: 'Ana, 25 años, web developer.', text: '"Antes de unirme a CODING, mis conocimientos eran mínimos. Gracias a sus lecciones interactivas y proyectos prácticos, ahora puedo construir sitios web desde cero. La plataforma me brindó una base sólida para mi carrera en desarrollo web, ¡y estoy emocionada por lo que me depara el futuro!"'},
        { student: 'Carlos, 20 años, estudiante de analista programador.', text: '"Como estudiante de desarrollo de aplicaciones móviles, CODING ha sido una verdadera revelación. Sus tutoriales bien estructurados y los ejercicios de codificación me permitieron aprender rápidamente los conceptos clave."'},
        { student: 'Juan, 35 años, diseñador web.', text: '"Mi experiencia en CODING fue realmente enriquecedora. Aprendí a usar herramientas de diseño y técnicas avanzadas para crear sitios web visualmente impresionantes. Los profesores siempre estaban disponibles para responder preguntas y brindar retroalimentación."'},
        { student: 'Laura, 28 años, frontend developer.', text: '"Un amigo me recomendó CODING para mejorar mis habilidades de desarrollo front-end, y fue la mejor decisión que tomé. Los cursos me llevaron desde los fundamentos hasta conceptos más complejos.. Ahora, tengo la confianza para enfrentar proyectos desafiantes y construir experiencias web interactivas y responsivas."'}
      ]
    }
  }
}
</script>
<style lang="scss" scoped>
.v-sheet {
  padding: 10%;
  border-radius: 16px;
}
</style>