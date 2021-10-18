<template>
  
    <ion-page>
        <div class="flex w-full flex-col overflow-auto">
            <div class="mt-2">
                <h1 class="text-4xl pl-5 font-semibold">Lista de Tareas</h1>
            </div>

            <div class="flex w-full flex-row flex-wrap justify-around mt-2">

                <ion-card class="w-2/5">
                    <router-link :to="{name:'All'}">
                        <ion-card-header>

                            <ion-icon :icon="clipboard" color="primary" size="large"></ion-icon>

                        </ion-card-header>

                        <ion-card-content>
                            <ion-card-title class="text-2xl">Todo</ion-card-title>
                            <!--<ion-card-subtitle>{{state.lengthOfAllTasks}} Tasks</ion-card-subtitle>-->
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
                            <!--<ion-card-subtitle>{{state.lengthOfAllTasks}} Tasks</ion-card-subtitle>-->
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
                            <!--<ion-card-subtitle>{{state.lengthOfAllTasks}} Tasks</ion-card-subtitle>-->
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
                            <!--<ion-card-subtitle>{{state.lengthOfAllTasks}} Tasks</ion-card-subtitle>-->
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
                            <!--<ion-card-subtitle>{{state.lengthOfAllTasks}} Tasks</ion-card-subtitle>-->
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
                            <!--<ion-card-subtitle>{{state.lengthOfAllTasks}} Tasks</ion-card-subtitle>-->
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
                            <!--<ion-card-subtitle>{{state.lengthOfAllTasks}} Tasks</ion-card-subtitle>-->
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
                            <!--<ion-card-subtitle>{{state.lengthOfAllTasks}} Tasks</ion-card-subtitle>-->
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
import {defineComponent,ref} from 'vue';
import { IonPage,IonCard,IonCardHeader,IonIcon,IonCardContent,IonCardTitle,
IonFab,IonFabButton,IonModal,} from '@ionic/vue';
import { clipboard,briefcase,headset,airplane,book,home,football,cart,add} from 'ionicons/icons'; 
import NewTask from '@/components/NewTask.vue';
export default defineComponent({
    name: 'Lists',
    components:{
       IonPage,IonCard,IonCardHeader,IonIcon,IonCardContent,IonCardTitle,
       IonFab,IonFabButton,IonModal,NewTask
    },

    setup(){

        const isOpenNewTask = ref(false);
        return{
            isOpenNewTask,
            clipboard,briefcase,headset,airplane,book,home,football,cart,add
        }
    }

})
</script>

<style>

</style>