<template>
    <ion-page>
        <ion-toolbar>
            <ion-buttons slot="start">
                <ion-back-button default-href="/Lists"></ion-back-button>
            </ion-buttons>

            <ion-icon :icon="ellipsisVertical" slot="end" class="text-2xl"></ion-icon>
        </ion-toolbar>

    <ion-content class="overflow-auto">
        <div class="flex flex-col justify-center items-center mt-2">
            <div class="text-center">
                <ion-icon :icon="clipboard" size="large" color="primary"></ion-icon>
            </div>
            <div class="text-center">
                <ion-card-title class="text-2xl">Todo</ion-card-title>
            </div>
        </div>

        <div>
            <ion-list>
                <ion-list-header>
                    <ion-label>Tarde <span class="text-gray-600 text-base">0</span></ion-label>
                </ion-list-header>
                <ion-item-sliding>
                    <ion-item-options side="start">
                        <ion-item-option color="danger" expandable>
                            <ion-icon :icon="trash" size="large"></ion-icon>
                        </ion-item-option>
                    </ion-item-options>
                    <ion-item detail="true">
                        <ion-label>
                            <h2></h2>
                            <p style="color:red"></p>
                        </ion-label>
                    </ion-item>
                    <ion-item-options side="end">
                        <ion-item-option color="primary" expandable>
                            <ion-checkbox></ion-checkbox>
                        </ion-item-option>
                    </ion-item-options>
                </ion-item-sliding>
            </ion-list>
                        <ion-list>
                <ion-list-header>
                    <ion-label>Hoy <span class="text-gray-600 text-base">0</span></ion-label>
                </ion-list-header>
                <ion-item-sliding>
                    <ion-item-options side="start">
                        <ion-item-option color="danger" expandable>
                            <ion-icon :icon="trash" size="large"></ion-icon>
                        </ion-item-option>
                    </ion-item-options>
                    <ion-item detail="true">
                        <ion-label>
                            <h2></h2>
                            <p style="color:red"></p>
                        </ion-label>
                    </ion-item>
                    <ion-item-options side="end">
                        <ion-item-option color="primary" expandable>
                            <ion-checkbox></ion-checkbox>
                        </ion-item-option>
                    </ion-item-options>
                </ion-item-sliding>
            </ion-list>
                        <ion-list>
                <ion-list-header>
                    <ion-label>Más Tarde <span class="text-gray-600 text-base">0</span></ion-label>
                </ion-list-header>
                <ion-item-sliding>
                    <ion-item-options side="start">
                        <ion-item-option color="danger" expandable>
                            <ion-icon :icon="trash" size="large"></ion-icon>
                        </ion-item-option>
                    </ion-item-options>
                    <ion-item detail="true">
                        <ion-label>
                            <h2></h2>
                            <p style="color:red"></p>
                        </ion-label>
                    </ion-item>
                    <ion-item-options side="end">
                        <ion-item-option color="primary" expandable>
                            <ion-checkbox></ion-checkbox>
                        </ion-item-option>
                    </ion-item-options>
                </ion-item-sliding>
            </ion-list>
                        <ion-list>
                <ion-list-header>
                    <ion-label>Terminado <span class="text-gray-600 text-base">0</span></ion-label>
                </ion-list-header>
                <ion-item-sliding>
                    <ion-item-options side="start">
                        <ion-item-option color="danger" expandable>
                            <ion-icon :icon="trash" size="large"></ion-icon>
                        </ion-item-option>
                    </ion-item-options>
                    <ion-item detail="true">
                        <ion-label>
                            <h2></h2>
                            <p style="color:red"></p>
                        </ion-label>
                    </ion-item>
                    <ion-item-options side="end">
                        <ion-item-option color="primary" expandable>
                            <ion-checkbox></ion-checkbox>
                        </ion-item-option>
                    </ion-item-options>
                </ion-item-sliding>
            </ion-list>
        </div>
    </ion-content>
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
    </ion-page>
</template>

<script>
import {defineComponent,reactive, ref, computed, onMounted} from 'vue';
import { IonPage, IonToolbar,IonButtons,IonBackButton,IonIcon, IonContent,
IonCardTitle,IonListHeader,IonItemSliding,IonItemOptions,IonItemOption,
IonLabel,IonCheckbox,IonList,IonItem,IonFab,IonFabButton,IonModal} from '@ionic/vue';
import {ellipsisVertical,clipboard,trash,add} from 'ionicons/icons'; 
import NewTask from '@/components/NewTask.vue';
import {useStore} from 'vuex'; 
export default defineComponent({

    components:{
       IonPage,IonToolbar,IonButtons,IonBackButton,IonIcon,IonContent,
       IonCardTitle,IonListHeader,IonItemSliding,IonItemOptions,IonItemOption,
       IonLabel,IonCheckbox,IonList,IonItem,IonFab,IonFabButton,IonModal,
       NewTask
    },

    setup(){
        const isOpenNewTask = ref(false);
        const store = useStore();
        const state = reactive({
            tasks: computed(() => {
                return store.state.tasks;
            })
        })

        function getTasks(params){
            store.commit('getTasks');
        }

        onMounted(() => {
            getTasks();
        })

        return{
            isOpenNewTask,store,getTasks,
            ellipsisVertical,clipboard,trash,add
        }
    }

})
</script>

<style>

</style>