//
// const arr = []
//
// let cnt = 0;
// var total = 3;
// function tasks(){
// 	let empty = false;
// 	if(cnt > total-2) empty = true;
// 	var docs = ()=>{
// 		return {
// 		empty : empty,
// 		desc:'desc ' +cnt
// 	}};
// 	var _docs = docs();
// 	if( !empty ) {
// 		_docs.docs = [docs()];
// 	}
// 	cnt++;
// 	return _docs
//
// }






// var task = tasks();
// var doc;// = docs.docs;
// doc = {...task};
// for(var i=0; i<total; i++){
// 	// console.log('doc' ,doc)
// 	if( !doc.empty ){
// 		doc = doc.docs[0] = Object.assign( doc.docs[0] , tasks())
// 	}
// }
// // console.log('task' , task , task.docs[0] )
//
//

var total = 3;
function getData(n , k=1,data={}){
	
	const empty = (n+1) === total;
	const doc = (nn=0)=>{
		return {
			empty : empty,
			data: ()=>{
				return {
					desc:'desc ' +nn,
					id: 'id ' + nn
				}
			}
		};
	}
	const __doc = doc(n)
	if( !empty ) {
		__doc.docs = [doc('child ' + n)];
	}
	
	data = {...__doc}
	return data;
}

var store = getData(0)
var _data = store; // 참조
for(var i=1; i< total; i++){
	_data = _data.docs[0] = getData(i , _data.docs[0])
}

// console.log( store.data() )
// console.log( store.docs )
// console.log( store.docs[0].data() )
// console.log( store.docs[0].docs )
// console.log( store.docs[0].docs[0].data() )


async function getA(doc , cache={}){
	
	cache = Object.assign(cache, doc.data());

	if( !doc.empty ) {
		if(!cache.tasks) cache.tasks = [];
		for (const _doc of doc.docs) {
			let d = await getA(_doc);
			cache.tasks.push(d)
			console.log('d,', d)
			
		}
		// return cache;
	}
	
	return cache;
}



async function A(){
	const data = await getA(store);
	console.log('data --'  , data);
	console.log('data --'  , data.tasks);
	console.log('data --'  , data.tasks[0]);
	// console.log('data --'  , data.docs[0]);
}

A();
