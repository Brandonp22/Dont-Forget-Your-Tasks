<template>
    <ion-page>
        <div class= "mt-2">
            <h2 class="text-center text-2x1 font-semibold">Registro</h2>
        </div>

        <form action="#" @submit.prevent="register" class="flex flex-col justify-center h-full">
          <div class="field">
            <label class="label">¿Cómo quieres que te llamemos?</label>
            <div class="control flex flex-col">
              <input class="input" type="text" placeholder="Nombre" v-model="name">
            </div>
          </div>

          <div class="field">
            <label class="label">¿Cuál es tu correo electrónico?</label>
            <div class="control flex flex-col h-full ">
              <input class="input" type="email" placeholder="Email" v-model="email">
            </div>
          </div>

          <div class="field">
            <label class="label">Crea una contraseña</label>
            <div class="control flex flex-col">
              <input class="input" type="password" placeholder="Contraseña" v-model="password">
            </div>
          </div>
            <br>
          <ion-button type="submit" class="button is-primary">Registrarme</ion-button>
       
          <ion-text color="danger" v-if="error">{{error}}</ion-text>
        </form>

        <ion-fab vertical="top" horizontal="end" slot="fixed"
            class="cursor-pointer" @click="$emit('close-modal')">
             <ion-icon :icon="close" class="text-3xl" style="color:#FAFAFA"></ion-icon>
        </ion-fab>
  </ion-page>
</template>

<script>
import firebase from '@/firebase.ts';
const db = firebase.firestore();
import {defineComponent} from 'vue';
import { IonPage} from '@ionic/vue';
//import { IonPage,IonFab,IonIcon,IonItem,IonInput,IonButton} from '@ionic/vue';
import {close} from 'ionicons/icons';

export default defineComponent({
    components:{
       IonPage
       //IonPage,IonFab,IonIcon,IonItem,IonInput,IonButton
    },
    name: 'Register',
    data () {
      return {
        name: '',
        email: '',
        password: '',
        error: ''
      }
    },

    methods: {
    register() {
      this.error = ''
      if (this.name && this.email && this.password) {
        firebase.auth().createUserWithEmailAndPassword(this.email, this.password)
          .then(cred => {
            db.collection('users').doc(cred.user.uid).set({
              name: this.name
            })                
          }).catch(err => {
            this.error = err.message
          })
          location.reload();
      }else {
        this.error = 'Todos los campos son requeridos'
      }
    }
  },

    setup(){
        return{
            close
        }
    }
})
</script>

