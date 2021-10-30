<template>
    <ion-page>

        
        <div class= "mt-2">
            <h2 class="text-center text-2x1 font-semibold">Nueva Tarea</h2>
        </div>

        <Form @submit="addTask()" class="flex flex-col justify-center h-full">

            <div>
                <ion-item>
                    <Field v-slot="{ field }" name="taskField" 
                    :rules="isRequired" v-model="task">
                        <ion-input v-bind="field" type="text" name="taskField"
                        placeholder="¿Qué estas planeando?"></ion-input>
                    </Field>
                </ion-item>

                <ion-item lines="none">

                    <ErrorMessage v-slot="{message}" name="taskField">
                        <ion-text color="danger" v-if="message">{{message}}</ion-text>
                    </ErrorMessage>
                </ion-item>
            </div>

            <div>
                <ion-item>
                    <ion-icon :icon="notifications" color="primary" slot="start"></ion-icon>
                    <ion-label>Fecha y hora</ion-label>
                    <Field v-slot="{field}" name="duedateField" :rules="isRequired">
                        <ion-datetime v-bind="field" v-model="dueDate"
                        display-format="DD MMM, YYYY HH:mm"
                        min="2021" max="2050-12-31"></ion-datetime>
                    </Field>
                </ion-item>
                <ion-item lines="none">
                    <ErrorMessage v-slot="{message}" name="duedateField">
                        <ion-text color="danger" v-if="message">{{message}}</ion-text>
                    </ErrorMessage>
                </ion-item>

                <ion-item>
                     <ion-icon :icon="document" color="primary" slot="start"></ion-icon>
                     <ion-textarea v-model="note" placeholder="Agregar nota..."></ion-textarea>
                </ion-item>

                <ion-item>
                    <ion-icon :icon="grid" color="primary" slot="start"></ion-icon>
                    <ion-label>Categoria</ion-label>

                    <Field v-model="category" :rules="isRequired" v-slot="{field}" name="categoryField">
                        <ion-select v-bind="field" placeholder="Seleccionar">
                            <ion-select-option value="Trabajo">Trabajo</ion-select-option>
                            <ion-select-option value="Musica">Musica</ion-select-option>
                            <ion-select-option value="Viajes">Viajes</ion-select-option>
                            <ion-select-option value="Estudios">Estudios</ion-select-option>
                            <ion-select-option value="Casa">Casa</ion-select-option>
                            <ion-select-option value="Compras">Compras</ion-select-option>
                            <ion-select-option value="Deportes">Deportes</ion-select-option>
                        </ion-select>
                    </Field>
                </ion-item>
                <ion-item lines="none">
                    <ErrorMessage v-slot="{message}" name="categoryField">
                        <ion-text color="danger" v-if="message">{{message}}</ion-text>
                    </ErrorMessage>                    
                </ion-item>
    
            </div>

            <div class="mt-8">
                <ion-button expand=block type="submit">Crear</ion-button>
            </div>

        </Form>

        <ion-fab vertical="top" horizontal="end" slot="fixed"
            class="cursor-pointer" @click="$emit('close-modal')">
             <ion-icon :icon="close" class="text-3xl" style="color:#FAFAFA"></ion-icon>
        </ion-fab>
    </ion-page>
</template>

<script>
import {defineComponent, ref} from 'vue';
import { IonPage,IonFab,IonIcon,IonItem,IonInput,IonText,IonDatetime,IonTextarea,
IonLabel,IonButton,IonSelect,IonSelectOption} from '@ionic/vue';
import {close,notifications,document,grid} from 'ionicons/icons';
import {Form,Field,ErrorMessage} from 'vee-validate';
import firebase from '@/firebase.ts';
const db = firebase.firestore();
export default defineComponent({

    components:{
       IonPage,IonFab,IonIcon,IonItem,IonInput,IonText,IonDatetime,IonTextarea,
       IonLabel,IonButton,IonSelect,IonSelectOption,
       Form,Field,ErrorMessage
    },

    setup(){
        const userIdRef = firebase.auth().currentUser?.uid;
        const task = ref('');
        const dueDate = ref('');
        const note = ref('');
        const category = ref('');
        const isRequired = (value) => {
            if(!value){
                return '*Este campo es requerido';
            }
            return true;
        }

        function addTask(params){
            db.collection('users').doc(userIdRef)
            .collection('tasks')
              .add({
                  task: task.value,
                  note: note.value,
                  dueDate: dueDate.value,
                  category: category.value,
                  done: false
              }) 
              .then(() => {
                  task.value = "";
                  dueDate.value = "";
                  note.value = "";
                  category.value = "";

                  this.$emit('close-modal');

                  console.log('Se ha cargado con exito! ', userIdRef);

              })
              .catch((error) =>{
                  console.log('Error al cargar: ',error);
              })
        }
        return{
            isRequired,task,dueDate,note,category,addTask, 
            close,notifications,document,grid
        }
    }

})
</script>

<style>

</style>