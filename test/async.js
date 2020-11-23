async function A(s){
    return new Promise(async resolve=>{
        setTimeout(()=>{
            console.log('A' , s);
            resolve(s)
        },1000)
    })

}


async function getTasksRequest(){
    const arr = [1,2,3]
    for(const s of arr){
        console.log('s' ,s)
        let d = await A(s);
        console.log('d' ,d)
    }
}

async function C(){
    await getTasksRequest();
}

// C();

const a1 = {desc:0}
a1.tasks = [{desc: 2}]
const b1 = {desc:1}
const c1 = Object.assign(a1 , b1)

const d1 = {...a1 , ...b1}
console.log(c1)
console.log(d1)