import { createApp } from 'vue'
import { valueToBoolean } from 'zeed'

const isE2E = valueToBoolean(import.meta.env.APP_E2E, false)
const isMobile = valueToBoolean(import.meta.env.APP_MOBILE, false)

if (isE2E) {
  import('./app-e2e.vue').then(app => createApp(app.default).mount('#app'))
}
else if (isMobile) {
  // import('./app-mobile.vue').then(app => createApp(app.default).mount('#app'))
  // import('./sandbox.demo.vue').then(app => createApp(app.default).mount('#app'))
  // import('./app-mobile-body-scroll.vue').then(app => createApp(app.default).mount('#app'))
  import('./app-mobile-using-oui.vue').then(app => createApp(app.default).mount('#app'))
}
else {
  import('./app.vue').then(app => createApp(app.default).mount('#app'))
}
