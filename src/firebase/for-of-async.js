
const arr = []

let cnt = 0;
var total = 3;
function tasks(){
	let empty = false;
	if(cnt > total-2) empty = true;
	var docs = ()=>{
		return {
		empty : empty,
		desc:'desc ' +cnt
	}};
	var _docs = docs();
	if( !empty ) {
		_docs.docs = [docs()];
	}
	cnt++;
	return _docs
	
}


var task = tasks();
var doc;// = docs.docs;
doc = {...task};
for(var i=0; i<total; i++){
	// console.log('doc' ,doc)
	if( !doc.empty ){
		doc = doc.docs[0] = Object.assign( doc.docs[0] , tasks())
	}
}
// console.log('task' , task , task.docs[0] )

async function getA(doc , cache={}){
	
	var data = Object.assign(doc, cache);
	console.log('cache -- ' , data)
	if( !data.empty ) {
		if(!cache.tasks) cache.tasks = [];
		
		for (const _doc of doc.docs) {
			let d = await getA(_doc);
			cache.tasks.push(d)
			console.log('d,', d)
			
		}
		return data;
	}
	return data;
}


async function A(){
	const data = await getA(task);
	console.log('data --'  , data);
	// console.log('data --'  , data.docs);
	console.log('data --'  , data.docs[0]);
}

A();
