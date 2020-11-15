import React, { createContext, useReducer, useEffect, useState } from 'react';
import { taskReducer, Action } from '../reducers/TaskReducer';
import {
    getTasksRequest,
    addTaskRequest
} from '../firebase/Firebase';

export const TaskContext = createContext();

const TaskContextProvider = (props) => {

    
    const [tasks, dispatch] = useReducer(taskReducer, [])
    const [sortedTasks,setTasks] = useState([]);

    const count = sortedTasks.length;
    useEffect(()=>{
        getTasksRequest().then(res=>{
            setTasks(res.sort((t, f) =>  (f.isChecked === t.isChecked)? 0 : f.isChecked? -1 : 1))
            dispatch({
                type:Action.GET_ALL_TASKS,
                res
            })
        })
    },[])
    return (
        <TaskContext.Provider value={{ count, sortedTasks, dispatch, addTaskRequest }}>
            {props.children}
        </TaskContext.Provider>
    )
}
export default TaskContextProvider;