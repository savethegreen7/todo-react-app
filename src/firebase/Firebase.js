import { db } from './firebase.config';

console.log(db)
const collection = "tasks"

db.collection(collection)
.onSnapshot(snapshot=>{
    console.log('snapshot'  ,snapshot)
})

async function getDocs(doc , data={}, task=collection) {
    let collection = doc.ref.collection(task);
    const snapShot = await collection.get();
    console.log('0-data -- ', data , doc.data())
    // todo ?? assign 과 스프레드 차이 확인 필요.. 스프레드는 오브젝트가 동적으로 변경이 안되는구나..
    data = Object.assign(data,doc.data());
    const d2 = {...doc.data(), ...data}

    console.log('1-data -- ' , data , d2)
    console.log('1-snapShot.empty',snapShot.empty , 'doc.id' , doc.id , doc.data());
    if( !snapShot.empty ){
        console.log('data.tasks' , data.tasks)
        if(!data.tasks) data.tasks = [];
        //data.tasks = [];
        let item;
        for( let doc of snapShot.docs){
            item = {...doc.data()}
            //item = Object.assign({}, doc.data())
            data.tasks.push(item);
            let d = await getDocs(doc, item );
            console.log('--d-- ' , d )
            //data = {...data , ...d}
        }
        console.log('not empty' , data)
        return data
    }
    return data;
}

export const getTasksRequest = async () => {
    const dbCollection =  db.collection(collection);
    const snapshot1 = await dbCollection.get();
    console.log('getTasksRequest::snapshot1' , snapshot1);
    let d;
    if( !snapshot1.empty ){
        for (const doc of snapshot1.docs) {
            console.log('>>>doc' , doc)
            let fa = await getDocs(doc);
            console.log('>>>fa', fa )
        }
        // console.log('d-----' );
    }


    return [];

    return  await dbCollection.get().then(querySnapshot => {
        let tasks = [];
        // console.log('querySnapshot' , querySnapshot)
        let tasklist = [];
        querySnapshot.forEach(async(doc) => {
            console.log(`doc.id:${doc.id} => `,doc.data() , doc);
            
            // 하위 컬렉셭 체크 
            //doc.ref.collection('tasks')
           // tasklist = await getDocs(doc);
            
            let subCollect = doc.ref.collection('tasks');
            console.log(`doc.ref.collection('tasks'`, subCollect);
            subCollect.get().then(q1=>{
                console.log('q1 --' , q1)
                if( !q1.empty ){
                    q1.forEach((doc)=>{
                        console.log('q1 -- doc' ,doc.exists,  doc.data(), doc.id, doc)
                        if( doc.exists){
                            let subCollect2 = doc.ref.collection('tasks');
                            console.log(`subCollect2 : ` , subCollect2)
                            subCollect2.get().then(q2=>{
                                console.log( `q2 --` , q2);
                                if(!q2.empty){
                                    q2.forEach(doc=>{
                                        console.log('q2 -- doc' ,  doc.data() , doc.id , doc )
                                    })
                                }
                            })
                        }
                    });
                }
            })
 
            // console.log( 'coll' , doc.ref.collection);


            console.log('data load complete' , doc.data())
            let data = doc.data();
            tasks.push({
                docId: doc.id,
                id: data.id,
                isChecked: data.isChecked,
                description: data.description,
                created: data.created
            })
        });

        console.log('end foreach', tasks)
        console.log('end foreach tasklist : ', tasklist)
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