import React, { useContext, useEffect, useState } from 'react'

import Grid from '@material-ui/core/Grid'
import TextField from '@material-ui/core/TextField';
import { TaskContext } from '../../contexts/TaskContext';
import { Action, initState } from '../../reducers/TaskReducer';
import uuid from 'uuid/v1';
const AddTaskComponent = () => {

    const { dispatch, addTaskRequest } = useContext(TaskContext);
    const [title, setTitle] = useState('');

    const onAddTask = async(e) => {

        e.preventDefault();
        let _title = !title ? '새할일' : title;
        const task =  {...initState(), ...{title:_title}};


        const fixedTask = await addTaskRequest(task);
        console.log('fixedTask' , fixedTask)

        dispatch({
            type: Action.ADD_TASK,
            task: fixedTask
        });
        setTitle('')
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
                    value={title}
                    onChange={
                        (e) => {
                            let value=e.target.value;
                            setTitle(value);
                        }
                    }
                />

            </Grid>
        </form>
    );
}

export default AddTaskComponent;
