<template>
  
    <ion-page>
        <div class="flex w-full flex-col overflow-auto">
            <div class="mt-2">
                        <ion-toolbar>
                            <ion-title class="text-2xl pl-5 font-semibold">Dont Forget Your Tasks</ion-title>
                            <ion-buttons slot="end">
                            </ion-buttons>
                        </ion-toolbar>
            </div>

            <div>    
                <br>
                <ion-item>
                    <ion-icon :icon="person" color="primary" slot="start"></ion-icon>
                    <ion-input
                    name="username"
                    type="text"
                    placeholder="Correo electrónico"
                    @ionChange="handleChange"
                    />
                </ion-item>
                <br>
                <ion-item>
                    <ion-icon :icon="key" color="primary" slot="start"></ion-icon>
                    <ion-input
                    name="password"
                    type="password"
                    placeholder="Contraseña"
                    @ionChange="handleChange"
                    />
                </ion-item>

                <br>
                <br>
                     <ion-fab horizontal="start" vertical="end" >
                        <ion-button class="font-semibold" horizontal="end" @click="doLogin">Iniciar Sesion </ion-button> 
                    </ion-fab>
            </div>  

            <div>     
                <ion-fab @click="isOpenRegister = true" horizontal="end" vertical="end" >
                    <ion-button class="font-semibold" color="light">
                        <ion-icon color="primary" :icon="person"></ion-icon>
                        Crear Cuenta
                    </ion-button>
                </ion-fab>

                <ion-modal 
                :is-open="isOpenRegister"
                :backdrop-dismiss="false">
                    <new-task @closeModal="isOpenRegister = false"></new-task>    
                </ion-modal>
            </div>

        </div>  
    </ion-page>

</template>

<script lang="ts">
import {defineComponent,ref} from 'vue';
import {IonPage,IonIcon,IonFab,IonModal,alertController} from '@ionic/vue';
import {person,key} from 'ionicons/icons'; 
import NewTask from '@/components/Auth/Register.vue';
import { useRouter } from "vue-router";
import useFirebaseAuth from "@/hooks/firebase-auth";
export default defineComponent({
    name: 'Lists',
    components:{
       IonPage,IonIcon,IonFab,IonModal,NewTask
    },

    setup(){   
        const isOpenRegister = ref(false);
        const state = useFirebaseAuth();
        const router = useRouter();
        const credentials = ref<{ [key: string]: string }>({
        username: "",
        password: "",
        });

        const handleChange = (e: CustomEvent) => {
        console.log(e);
        const name: string = (e?.target as any)?.name;
        credentials.value[name as string] = e.detail.value;
        };
        /**
         *
         */
        const handleAlert = (message: string, isError = false) => {
        alertController
            .create({
            header: isError ? "Error" : "Notice",
            message: message,
            buttons: ["OK"],
            })
            .then((t) => t.present());
        };

        /**
         *
         *
         */

    const doLogin = async () => {
      try {
        const { username, password } = credentials.value;
        await state.login(username, password);
        router.push({ name: "Lists", replace: true });
      } catch (error) {
        console.log(error);
        handleAlert(error.message, true);
      }
    };

    const createUser = async () => {
      router.replace({ path: "/Register"});
    }

        return{
            ...state,credentials,doLogin,createUser, handleChange,isOpenRegister,
            person,key
        }
    }

})
</script>

<style>

</style>