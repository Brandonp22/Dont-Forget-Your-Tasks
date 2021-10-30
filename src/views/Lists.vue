<template>
  
    <ion-page>
        <div class="flex w-full flex-col overflow-auto">
            <div class="mt-2">
                        <ion-toolbar>
                            <ion-title class="text-2xl pl-5 font-semibold">Lista de Tareas</ion-title>
                            <ion-buttons slot="end">
                                <ion-button @click="doLogout">Cerrar Sesión</ion-button>
                            </ion-buttons>
                        </ion-toolbar>
            </div>

            <div class="flex w-full flex-row flex-wrap justify-around mt-2">

                <ion-card class="w-2/5">
                    <router-link :to="{name:'All'}">
                        <ion-card-header>

                            <ion-icon :icon="clipboard" color="primary" size="large"></ion-icon>

                        </ion-card-header>

                        <ion-card-content>
                            <ion-card-title class="text-2xl">Todo</ion-card-title>
                            <ion-card-subtitle>{{state.lengthOfAllTasks}} Tareas</ion-card-subtitle>
                        </ion-card-content>

                    </router-link>
                </ion-card>

                <ion-card class="w-2/5">
                    <router-link :to="{name:'Work'}">
                        <ion-card-header>

                            <ion-icon :icon="briefcase" size="large" class="text-yellow-600"></ion-icon>

                        </ion-card-header>

                        <ion-card-content>
                            <ion-card-title class="text-2xl">Trabajo</ion-card-title>
                            <ion-card-subtitle>{{state.lengthOfWorkTasks}} Tareas</ion-card-subtitle>
                        </ion-card-content>

                    </router-link>
                </ion-card>

                 <ion-card class="w-2/5">
                    <router-link :to="{name:'Music'}">
                        <ion-card-header>

                            <ion-icon :icon="headset" size="large" class="text-red-400"></ion-icon>

                        </ion-card-header>

                        <ion-card-content>
                            <ion-card-title class="text-2xl">Musica</ion-card-title>
                            <ion-card-subtitle>{{state.lengthOfMusicTasks}} Tareas</ion-card-subtitle>
                        </ion-card-content>

                    </router-link>
                </ion-card>
                <ion-card class="w-2/5">
                    <router-link :to="{name:'Travel'}">
                        <ion-card-header>

                            <ion-icon :icon="airplane" size="large" class="text-green-400"></ion-icon>

                        </ion-card-header>

                        <ion-card-content>
                            <ion-card-title class="text-2xl">Viajes</ion-card-title>
                            <ion-card-subtitle>{{state.lengthOfTravelTasks}} Tareas</ion-card-subtitle>
                        </ion-card-content>

                    </router-link>
                </ion-card>

                <ion-card class="w-2/5">
                    <router-link :to="{name:'Study'}">
                        <ion-card-header>

                            <ion-icon :icon="book" size="large" class="text-indigo-400"></ion-icon>

                        </ion-card-header>

                        <ion-card-content>
                            <ion-card-title class="text-2xl">Estudios</ion-card-title>
                            <ion-card-subtitle>{{state.lengthOfStudyTasks}} Tareas</ion-card-subtitle>
                        </ion-card-content>

                    </router-link>
                </ion-card>

                <ion-card class="w-2/5">
                    <router-link :to="{name:'Home'}">
                        <ion-card-header>

                            <ion-icon :icon="home" size="large" style="color:#2DD4BF"></ion-icon>

                        </ion-card-header>

                        <ion-card-content>
                            <ion-card-title class="text-2xl">Casa</ion-card-title>
                            <ion-card-subtitle>{{state.lengthOfHomeTasks}} Tareas</ion-card-subtitle>
                        </ion-card-content>

                    </router-link>
                </ion-card>

                <ion-card class="w-2/5">
                    <router-link :to="{name:'Sport'}">
                        <ion-card-header>

                            <ion-icon :icon="football" size="large" style="color:#FAFAFA"></ion-icon>

                        </ion-card-header>

                        <ion-card-content>
                            <ion-card-title class="text-2xl">Deportes</ion-card-title>
                            <ion-card-subtitle>{{state.lengthOfSportTasks}} Tareas</ion-card-subtitle>
                        </ion-card-content>

                    </router-link>
                </ion-card>

                <ion-card class="w-2/5">
                    <router-link :to="{name:'Shopping'}">
                        <ion-card-header>

                            <ion-icon :icon="cart" size="large" style="color:#F44336"></ion-icon>

                        </ion-card-header>

                        <ion-card-content>
                            <ion-card-title class="text-2xl">Compras</ion-card-title>
                            <ion-card-subtitle>{{state.lengthOfShoppingTasks}} Tareas</ion-card-subtitle>
                        </ion-card-content>

                    </router-link>
                </ion-card>

            </div>  

            <div>
                <ion-fab @click="isOpenNewTask = true" vertical="bottom" horizontal="end" slot="fixed">
                    <ion-fab-button>
                        <ion-icon :icon="add"></ion-icon>
                    </ion-fab-button>
                </ion-fab>

                <ion-modal 
                :is-open="isOpenNewTask"
                :backdrop-dismiss="false">
                    <new-task @closeModal="isOpenNewTask = false"></new-task>    
                </ion-modal>
            </div>


        </div>  
    </ion-page>

</template>

<script lang="ts">
import {computed, defineComponent,onMounted,ref,reactive} from 'vue';
import { IonPage,IonCard,IonCardHeader,IonIcon,IonCardContent,IonCardTitle,IonCardSubtitle,
IonFab,IonFabButton,IonModal,} from '@ionic/vue';
import { clipboard,briefcase,headset,airplane,book,home,football,cart,add} from 'ionicons/icons'; 
import NewTask from '@/components/NewTask.vue';
import {useStore} from 'vuex';
import useFirebaseAuth from "@/hooks/firebase-auth";
import firebase from '@/firebase';
import { useRouter } from "vue-router";
export default defineComponent({
    name: 'Lists',
    components:{
       IonPage,IonCard,IonCardHeader,IonIcon,IonCardContent,IonCardTitle,IonCardSubtitle,
       IonFab,IonFabButton,IonModal,NewTask
    },

    setup(){
        const isOpenNewTask = ref(false);
        const store = useStore();
        const {logout } = useFirebaseAuth();
        const router = useRouter();
        const state = reactive({
            lengthOfAllTasks: computed(() => {
                return store.state.tasks.length;
            }),
            lengthOfWorkTasks: computed(() => {
                return store.getters.lengthTasksByCategory('Trabajo');
            }),
            lengthOfMusicTasks: computed(() => {
                return store.getters.lengthTasksByCategory('Musica');
            }),
            lengthOfTravelTasks: computed(() => {
                return store.getters.lengthTasksByCategory('Viajes');
            }),
            lengthOfStudyTasks: computed(() => {
                return store.getters.lengthTasksByCategory('Estudios');
            }),
            lengthOfHomeTasks: computed(() => {
                return store.getters.lengthTasksByCategory('Casa');
            }),
            lengthOfSportTasks: computed(() => {
                return store.getters.lengthTasksByCategory('Deportes');
            }),
            lengthOfShoppingTasks: computed(() => {
                return store.getters.lengthTasksByCategory('Compras');
            }),
        })

        function getTasks(){
            store.commit('getTasks', firebase.auth().currentUser?.uid);
            console.log("USER LOG",  firebase.auth().currentUser?.uid);
        }

        onMounted(() => {
            if(store.state.tasks.length == 0) {
                getTasks();
            }
        })
        const doLogout = async () => {
            await logout();
            router.replace({ path: "/PrincipalPage"});
            location.reload();
    };

        return{
            isOpenNewTask,store,state,getTasks,doLogout,
            clipboard,briefcase,headset,airplane,book,home,football,cart,add
        }
    }

})
</script>

<style>

</style>