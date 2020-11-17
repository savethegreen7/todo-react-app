import { db } from './firebase.config';

console.log(db)
const collection = "tasks"

db.collection(collection)
.onSnapshot(snapshot=>{
    console.log('snapshot'  ,snapshot)
})

export const getTasksRequest = async () => {
    return  await db.collection(collection).get().then(querySnapshot => {
        let tasks = [];
        querySnapshot.forEach((doc) => {
            console.log(`${doc.id} => ${doc.data()}`);
            let data = doc.data();
            tasks.push({
                docId: doc.id,
                id: data.id,
                isChecked: data.isChecked,
                description: data.description,
                created: data.created
            })
        });

        // res.docs.map(task => {
        //     let data = task.data();
        //     tasks.push({
        //         id: data.id,
        //         isChecked: data.isChecked,
        //         description: data.description,
        //         created: data.created
        //     })
        // })
        return  tasks;
    })
}

export const addTaskRequest = async (task) => {
    console.log( task)
    const res = await db.collection(collection).add(task);
    const ref = await db.doc(res.path).get();
    return Object.assign(ref.data() , {docId:ref.id})
}

export const checkTaskRequest = (id, isChecked) => {
    return db.collection(collection)
        .doc(id)
        .set({
            isChecked: isChecked
        })
}

export const removeTaskRequest = async(id) => {
    db.collection(collection).get().then(querySnapshot => {
        querySnapshot.forEach(doc=>{
            console.log( 'removeTaskRequest doc' , `${doc.ref.path}` , id===doc.id)
        })
    })
    
    return await db.collection(collection).doc(id).delete();
}