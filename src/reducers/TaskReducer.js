// import uuid from 'uuid/v1';

export const Action = {
    ADD_TASK: "add-task",
    CHECK_TASK: "check-task",
    REMOVE_TASK: "remove-task",
    GET_ALL_TASKS: "get-all-task"
}

export const initState = ()=>{
    return {
        id: '',
        isChecked: false,
        desc: '', // todo설명
        blob: {}, // 본문 내용 데이터 맵
        title: '',
        created: '',
        ref:{} ,// firestore 레퍼 id {id, path}
        tasks: [] // 하위 태스크 배열
    }
}

export const taskReducer = (state=initState(), action) => {

    switch (action.type) {
        case Action.ADD_TASK: {
            return [...state, action.task]
        }
        case Action.CHECK_TASK:
            let taskIndex = state.findIndex( (t) =>{
                return t.ref.id === action.task.ref.id;
            });
            console.log('taskIndex', taskIndex , state , action.task)
            // return state
            state[taskIndex].isChecked = action.task.isChecked;
            const _state =state.filter(task => {
                console.log('task.ref.id === action.task.ref.id' ,task.ref.id ,action.task.ref.id )
                return task.ref.id !== action.task.ref.id
            });
            console.log('_state' , state)
            return [...state]
        case Action.REMOVE_TASK: {
            let f = state.filter(task => task.id !== action.id);
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
