import uuid from 'uuid/v1';

export const Action = {
    ADD_TASK: "add-task",
    CHECK_TASK: "check-task",
    REMOVE_TASK: "remove-task",
    GET_ALL_TASKS: "get-all-task"
}


export const taskReducer = (state, action) => {

    switch (action.type) {
        case Action.ADD_TASK: {
            return [...state, action.task]
        }
        case Action.CHECK_TASK:
            let taskIndex = state.findIndex( (t) =>{
                return t.id === action.task.id
            });
            state[taskIndex].isChecked = action.task.isChecked
            return state.filter(task => task.id !== action.id);

        case Action.REMOVE_TASK: {
            let f = state.filter(task => task.id !== action.id);
            console.log('f', f)
            return f;
        }
        case Action.GET_ALL_TASKS:{
            return [...state , ...action.res]
        }
        default:
            return state;
    }
}