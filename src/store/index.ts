import { createStore } from "vuex";

import firebase from "@/firebase";
const db = firebase.firestore();
const store = createStore({

    state:{
        tasks: Array<any>(),
        options:{
            year: "numeric", month: "short", day: "numeric",
            hour: "2-digit", minute: '2-digit',hourCycle: 'h24'
        },
    },
    getters:{

    },
    mutations:{

        getTasks: (state) => {

            state.tasks = [];
            db.collection('tasks')
            .onSnapshot((querySnapshot: any) => {
                state.tasks = [];

                querySnapshot.forEach((doc: any) => {
                    state.tasks.push({
                        id: doc.id,
                        task: doc.data().task,
                        dueDate: new Date(doc.data().dueDate).toLocaleDateString('en-US',state.options),
                        category: doc.data().category,
                        note: doc.data().note,
                        done: doc.data().done
                    });

                    console.log(doc.id, " => ", doc.data());
                  })
            })
        }
    }
});


export default store;