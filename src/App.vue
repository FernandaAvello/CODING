<template lang="pug">
v-app
  v-app-bar(app color="primary" elevation="0")
    div(class="d-flex align-center")
      router-link.d-flex(:to="{ name: 'home' }")
        v-icon.ml-4(x-large color="white") mdi-code-json
        h1.ml-4.logo CODING
    v-spacer
    v-btn(plain color="white") CURSOS
    v-divider(vertical inset color="white")
    v-btn(plain color="white") CARRERAS
    v-divider(vertical inset color="white")
    v-btn(plain color="white") PARA EMPRESAS
    v-spacer
    v-btn(icon dark)
      v-icon mdi-magnify
    v-menu(bottom dark left)
      template(v-slot:activator="{ on, attrs }")
        v-btn(icon dark v-bind="attrs" v-on="on")
          v-icon mdi-dots-vertical
      v-list
        v-list-item(:to="{ name: 'home' }" link)
          v-list-item-title Home
        v-list-item
          v-list-item-title Nosotros
        v-list-item
          v-list-item-title Blog
        v-list-item(:to="{ name: 'administrador' }" link)
          v-list-item-title Administración
  v-main(style="padding: 0;")
    v-banner.d-flex.flex-column.align-center(color="accent" light height="50px" style="top: 65px" v-if="$route.name === 'home'") 📢 Revisa nuestras OFERTAS de hasta un #[strong 50% OFF] para el próximo mes! 📢
    router-view
  v-footer(padless)
    v-card.text-center.px-6(flat tile color="accent")
      v-card-text
        v-btn.mx-4(v-for="icon in icons" :key="icon" icon)
          v-icon(size="24px") {{ icon }}
      v-card-text Phasellus feugiat arcu sapien, et iaculis ipsum elementum sit amet. Mauris cursus commodo interdum. Praesent ut risus eget metus luctus accumsan id ultrices nunc. Sed at orci sed massa consectetur dignissim a sit amet dui. Duis commodo vitae velit et faucibus. Morbi vehicula lacinia malesuada. Nulla placerat augue vel ipsum ultrices, cursus iaculis dui sollicitudin. Vestibulum eu ipsum vel diam elementum tempor vel ut orci.
      v-divider
      v-card-text {{ new Date().getFullYear() }} - #[strong M. Fernanda Avello]
</template>

<script>

export default {
  name: 'App',
  data: () => ({
    icons: [
      'mdi-facebook',
      'mdi-twitter',
      'mdi-linkedin',
      'mdi-instagram'
    ]
  }),
};
</script>
<style lang="scss">
@import '@/styles/main.scss';
.v-app {
  display: flexbox;
  height: 100%;
  width: 100vw;
}
.logo {
  color: white;
}
.v-toolbar__content {
  border-bottom: 1px solid gray;
}
.theme--light.v-card > .v-card__text, .theme--light.v-btn.v-btn--icon {
  color: rgba(0, 0, 0, 1);
}
</style>
