import { db } from './firebase.config';

const collection = "tasks"

export const getTasksRequest = async () => {
    return  await db.collection(collection).get().then(res => {
        let tasks = [];
        
        res.docs.map(task => {
            let data = task.data();
            tasks.push({
                id: data.id,
                isChecked: data.isChecked,
                description: data.description,
                created: data.created
            })
        })
        return  tasks;
    })
}

export const addTaskRequest = async (task) => {
    return await db.collection(collection)
        .add(task)
}

export const checkTaskRequest = (id, isChecked) => {
    return db.collection(collection)
        .doc(id)
        .set({
            isChecked: isChecked
        })
}

export const removeTaskRequest = async(id) => {
    return await db.collection(collection)
            .db.collection(collection)
            .doc(id)
            .delete()
}