<template>
  <div class="container mt-50">
    <div class="columns">
      <div class="column is-6 is-offset-3">
        <h3 class="title is-3">Crear una cuenta</h3><hr>
        <form action="#" @submit.prevent="register">
          
          <div class="field">
            <label class="label">¿Cómo quieres que te llamemos?</label>
            <div class="control">
              <input class="input" type="text" placeholder="Nombre" v-model="name">
            </div>
          </div>

          <div class="field">
            <label class="label">¿Cuál es tu correo electrónico?</label>
            <div class="control">
              <input class="input" type="email" placeholder="Email" v-model="email">
            </div>
          </div>

          <div class="field">
            <label class="label">Crea una contraseña</label>
            <div class="control">
              <input class="input" type="Contraseña" v-model="password">
            </div>
          </div>

          <button type="submit" class="button is-primary">Registrarme</button>
        </form>

        <div class="notification is-danger mt-10" v-if="error">          
          {{ error }}
        </div>

      </div>
    </div>
  </div>
</template>

<script>
import firebase from '@/firebase.ts';
const db = firebase.firestore();
export default {
  data () {
    return {
      name: '',
      email: '',
      password: '',
      error: ''
    }
  },
  name: 'Register',
  methods: {
    register() {
      this.error = ''
      if (this.name && this.email && this.password) {
        firebase.auth().createUserWithEmailAndPassword(this.email, this.password)
          .then(user => {
            //actualizar el usuario
            if (user) {
              user.updateProfile({
                displayName: this.name                
              }).then((u) => {
                this.name = ''
                this.email = ''
                this.password = ''
                this.$router.push({name: 'dashboard'})                                
              }).catch((err) => {
                this.error = err.message
              })             
            }            
          }).catch(err => {
            this.error = err.message
          })
      }else {
        this.error = 'Todos los campos son requeridos'
      }
    }
  }
}
</script>

