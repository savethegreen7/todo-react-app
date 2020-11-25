import {db} from './firebase.config';

console.log(db)
const collection = "tasks"

db.collection(collection)
	.onSnapshot(snapshot => {
		console.log('onSnapshot watch >> ', snapshot)
	})

async function getDocs(doc, cache = {}, task = collection) {
	let collection = doc.ref.collection(task);
	const snapShot = await collection.get();
	
	const {id, path} = doc.ref; // firestore id , path
	cache = Object.assign(cache, doc.data(), {ref: {id, path}});
	
	if (!snapShot.empty) {
		if (!cache.tasks) cache.tasks = [];
		for (let doc of snapShot.docs) {
			let d = await getDocs(doc);
			cache.tasks.push(d);
		}
	}
	return cache;
}

export const getTasksRequest = async () => {
	const dbCollection = db.collection(collection);
	const snapshot1 = await dbCollection.get();
	console.log('getTasksRequest::snapshot1', snapshot1);
	let tasks = [];
	
	if (!snapshot1.empty) {
		for (const doc of snapshot1.docs) {
			// console.log('>>>doc', doc)
			let fa = await getDocs(doc);
			tasks.push(fa);
			// console.log('>>>fa', fa)
		}
	}
	return tasks;
	
}

export const addTaskRequest = async (task) => {
	console.log(task)
	const res = await db.collection(collection).add(task);
	const ref = await db.doc(res.path).get();
	return Object.assign(ref.data(), {docId: ref.id})
}

export const checkTaskRequest = (id, isChecked) => {
	return db.collection(collection)
		.doc(id)
		.set({
			isChecked: isChecked
		})
}

export const removeTaskRequest = async (id) => {
	db.collection(collection).get().then(querySnapshot => {
		querySnapshot.forEach(doc => {
			console.log('removeTaskRequest doc', `${doc.ref.path}`, id === doc.id)
		})
	})
	
	return await db.collection(collection).doc(id).delete();
}
