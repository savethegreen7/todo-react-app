import React, { useContext,useState } from 'react';

import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import TextField from "@material-ui/core/TextField";
import IconButton from '@material-ui/core/IconButton';
import * as Icon from '@material-ui/icons';
import * as UI from '@material-ui/core';
import CropFreeIcon from '@material-ui/icons/CropFree';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import LibraryAddCheckIcon from '@material-ui/icons/LibraryAddCheck';

import { TaskContext } from '../../contexts/TaskContext';
import { Action } from '../../reducers/TaskReducer';
import {TextFields} from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
    root: {
        // width: '100%',
        flex: 1,
        backgroundColor: theme.palette.background.transparent,
    },
    marked: {
        flex: 1,
        textDecoration: 'line-through'
    },
    label: {
        textTransform: 'capitalize',
    },
    disableUnderline: {
        '& .MuiInput-underline:before' :{
            borderBottom: '0'
        }
    },
    listItem:{
        minWidth: '80px'
    },
    textField :{
        padding: '0 10px'
    },
    formRoot :{
        width: '100%',
        backgroundColor: theme.palette.background.transparent,
        '& .MuiInput-underline:before' :{
            borderBottom: '0'
        }
    }
}));


const TaskListComponent = () => {

    const {
        tasks,
        dispatch,
        removeTaskRequest
    } = useContext(TaskContext);


    const classes = useStyles();

    const [disableUnderline , setDisableUnderline] = useState(false);
    const now = ()=>{
        let date =new Date()
        // date  =date.replace(/\s+/g, '-')
        date = `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}T:0:0`
        console.log('date' , date )
        date  ='2017-05-24T10:30'
        return date;
    }

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

        const ref = task.ref;
        const d = await removeTaskRequest(task);
        console.log('d' , d )
        dispatch({
            type: Action.REMOVE_TASK,
            task : {ref}
        })
    }
    return (
        <List className={classes.root}>
            {tasks.map((task) => {
                // console.log('task -- ' ,task)
                return (
                    <ListItem key={task.ref.id}
                        role={undefined}
                        dense
                        button={false} type={'text'}>
                        <IconButton color="primary" onClick={() => {
                            onChecked(task)
                        }}>
                            {
                                !task.isChecked ? (<CropFreeIcon />) : (<LibraryAddCheckIcon />)
                            }
                        </IconButton>
                        {/*<form className={classes.root}>*/}
                        <TextField id="standard-basic"  defaultValue={task.title}
                                   classes={{root: task.isChecked ? classes.marked : classes.root}}
                                   disabled={false}
                                     onFocus={()=>{
                                         setDisableUnderline(false);
                                     }}
                                     onBlur={()=>{
                                         setDisableUnderline(true);
                                     }}
                        />
                        <TextField
                            id="datetime-local"
                            type="datetime-local"
                            defaultValue={now()}
                            className={classes.textField}
                            InputLabelProps={{
                                shrink: false,
                            }}
                        />
                        {/*</form>*/}
                        {/*<ListItemText className={classes.listItem} primary={task.expired} button="true"/>*/}
                        <IconButton  aria-label="menu">
                            <Icon.Menu />
                        </IconButton>
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
