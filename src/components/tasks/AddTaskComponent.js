import React, { useContext, useEffect, useState } from 'react'

import Grid from '@material-ui/core/Grid'
import TextField from '@material-ui/core/TextField';
import { TaskContext } from '../../contexts/TaskContext';
import { Action } from '../../reducers/TaskReducer';
import uuid from 'uuid/v1';
const AddTaskComponent = () => {

    const { dispatch, addTaskRequest } = useContext(TaskContext);
    const [description, setDescription] = useState('');

    const onAddTask = async(e) => {

        e.preventDefault();
        const task =  {
            id:uuid(),
            isChecked:false,
            created:new Date(),
            description:description
        }
        
        const fixedTask = await addTaskRequest(task);       
        console.log('fixedTask' , fixedTask)

        dispatch({
            type: Action.ADD_TASK,
            task: fixedTask
        });
        setDescription('')
    }
    return (
        <form onSubmit={onAddTask}>
            <Grid
                container
                direction="row"
                justify="center"
                alignItems="center">

                <TextField
                    label="Add Task"
                    variant="outlined"
                    size="small"
                    value={description}
                    onChange={
                        (e) => {
                            setDescription(e.target.value)
                        }
                    }
                />

            </Grid>
        </form>
    );
}

export default AddTaskComponent;