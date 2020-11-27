import uuid from 'uuid/v1';

export const Action = {
    ADD_TASK: "add-task",
    CHECK_TASK: "check-task",
    REMOVE_TASK: "remove-task",
    GET_ALL_TASKS: "get-all-task"
}

export const initState = ()=>{
    const date = new Date();
    // console.log(date.getTime() ,date.setDate(date.getDate()+1)  )
    return {
        id: uuid(),
        isChecked: false,
        desc: '', // todo설명
        blob: '', // 본문 내용 데이터 맵
        title: '새할일',
        created: date,
        expired: parseInt(new Date().setDate(date.getDate()+1)+''), // 남은 시간 ms 기본 하루
        ref:{} ,// firestore 레퍼 id {id, path}
        tasks: [] // 하위 태스크 배열
    }
}
//console.log(initState())
// initState()

// const date = new Date();
// console.log(date.getTime() ,new Date().setDate(date.getDate()+1) )

export const taskReducer = (state=initState(), action) => {

    switch (action.type) {
        case Action.ADD_TASK: {
            return [...state, action.task]
        }
        case Action.CHECK_TASK:
            let taskIndex = state.findIndex( (t) =>{
                return t.ref.id === action.task.ref.id;
            });
            state[taskIndex].isChecked = action.task.isChecked;
            return [...state]
        case Action.REMOVE_TASK: {
            let f = state.filter(task => task.ref.id !== action.task.ref.id);
            console.log('f' , f)
            return f;
        }
        case Action.GET_ALL_TASKS:{
            return [...state , ...action.res]
        }
        default:
            return state;
    }
}
