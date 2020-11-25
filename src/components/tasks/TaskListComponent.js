import React, { useContext } from 'react';

import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import IconButton from '@material-ui/core/IconButton';
import CropFreeIcon from '@material-ui/icons/CropFree';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import LibraryAddCheckIcon from '@material-ui/icons/LibraryAddCheck';

import { TaskContext } from '../../contexts/TaskContext';
import { Action } from '../../reducers/TaskReducer';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        backgroundColor: theme.palette.background.transparent,
    },
    marked: {
        textDecoration: 'line-through'
    }
}));


const TaskListComponent = () => {

    const {
        tasks,
        dispatch,
        removeTaskRequest
    } = useContext(TaskContext);


    const classes = useStyles();

    const onChecked = (task) => {
        
        const ref = task.ref;
        const isChecked = !task.isChecked;
    
        console.log('id, isChecked' , ref, isChecked);
        // return;
        dispatch({
            type: Action.CHECK_TASK,
            task: {
                ref, isChecked
            }
        })
    };

    const onDelete = async(task)=>{
        console.log('onDelete' ,  task );

        const d = await removeTaskRequest(task);
        console.log('d' , d )
        dispatch({
            type: Action.REMOVE_TASK,
            id: task.id
        })
    }
    return (
        <List className={classes.root}>
            {tasks.map((task) => {
                return (
                    <ListItem key={task.id}
                        role={undefined}
                        dense
                        button={false} >
                        <IconButton color="primary" onClick={() => {
                            onChecked(task)
                        }}>
                            {
                                !task.isChecked ? (<CropFreeIcon />) : (<LibraryAddCheckIcon />)
                            }
                        </IconButton>
                        <ListItemText primary={task.title}
                            className={task.isChecked ? classes.marked : ''} />
                        <ListItemSecondaryAction>
                            <IconButton
                                edge="end"
                                aria-label="comments"
                                onClick={(e) => {
                                    e.preventDefault();
                                    onDelete(task)
                                }}>
                                <DeleteOutlineIcon />
                            </IconButton>
                        </ListItemSecondaryAction>
                    </ListItem>
                );
            })}
        </List>
    );
}

export default TaskListComponent;
