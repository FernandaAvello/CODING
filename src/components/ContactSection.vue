<template lang="pug">
v-container.d-flex.justify-center.mx-auto
  v-card.contactForm(dark elevation="24")
    v-card-title
      h4.mb-4 Envíanos tu Información y pronto nos pondremos en contacto contigo.
    v-card-text
      v-text-field(label="Tu Nombre" type="text" outlined dense prepend-inner-icon="mdi-account")
      v-text-field(label="Tu Teléfono" type="text" outlined dense prepend-inner-icon="mdi-phone")
      v-text-field(label="Tu Email" type="email" outlined dense prepend-inner-icon="mdi-email")
      v-textarea(label="Tu Mensaje" outlined prepend-inner-icon="mdi-message")
    v-card-actions.justify-center
      v-btn.contactBtn(plain) Enviar
</template>
<style lang="scss" scoped>
@import '@/styles/main.scss';
.ilustration {
  background-image: url('../assets/contact-ilustration.png');
  background-color: whitesmoke;
  background-position: center;
  background-size: contain;
  background-repeat: no-repeat;
  border-radius: 16px;
  height: 400px;
  width: 400px;
}
.contactForm {
  border-radius: 10px;
  box-sizing: border-box;
  box-shadow: 0 15px 25px rgba(0,0,0,.6);
  padding: 5%;
}
.contactForm .contactBtn:hover {
  background: $accent-color;
  color: #fff;
  border-radius: 5px;
  box-shadow: 0 0 5px $accent-color,
              0 0 25px $accent-color,
              0 0 50px $accent-color,
              0 0 100px $accent-color;
}
.contactForm .contactBtn span {
  position: absolute;
  display: block;
}
@keyframes btn-anim {
  0% {
    left: -100%;
  }
  50%,100% {
    left: 100%;
  }
}
.contactForm .contactBtn span:nth-child(1) {
  bottom: 2px;
  left: -100%;
  width: 100%;
  height: 2px;
  background: linear-gradient(90deg, transparent, $accent-color);
  animation: btn-anim 2s linear infinite;
}
</style>