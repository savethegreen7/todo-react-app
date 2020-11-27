import React, { useContext,useState } from 'react';

import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import IconButton from '@material-ui/core/IconButton';
import * as Icon from '@material-ui/icons';
import * as UI from '@material-ui/core';
import CropFreeIcon from '@material-ui/icons/CropFree';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import LibraryAddCheckIcon from '@material-ui/icons/LibraryAddCheck';
import moment from "moment";

import { TaskContext } from '../../contexts/TaskContext';
import { Action } from '../../reducers/TaskReducer';

const useStyles = makeStyles((theme) => ({
    root: {
        display:'grid',
        gridTemplateColumns: '1fr',
        flextDirection:'row',
        justifyContent: 'space-between',
        backgroundColor: theme.palette.background.transparent,
    },
    marked: {
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
        // minWidth: '80px'
    },
    textField :{
        padding: '0 10px'
    },
    listItemRoot :{
        display:'grid',
        flexDirection:'row',
        gridTemplateColumns: '3em 2fr 1fr 60px',
        justifyContent: 'space-between',
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

    // const [disableUnderline , setDisableUnderline] = useState(false);
    const [isExpired , setExpired] = useState(false);

    const expired = (expired)=>{
        const date =moment(new Date(expired)).format(`YYYY-MM-DDTHH:mm`);
        var now = new Date().getTime();
        // setExpired(true);
        // isExpired = now > expired;
        console.log('목표일' ,date , expired  , now > expired)
        return date;
    }
    
   
   

    const onChecked = (task) => {
        
        const ref = task.ref;
        const isChecked = !task.isChecked;
        
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

        dispatch({
            type: Action.REMOVE_TASK,
            task : {ref}
        })
    }
    return (
        <List className={classes.root}>
            {tasks.map((task) => {
                return (
                    <ListItem key={task.ref.id} className={classes.listItemRoot}
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
                        <UI.TextField id="standard-basic"  defaultValue={task.title}
                                   classes={{root: task.isChecked ? classes.marked : classes.root}}
                                   disabled={false}
                                     onFocus={()=>{
                                         // setDisableUnderline(false);
                                     }}
                                     onBlur={()=>{
                                         // setDisableUnderline(true);
                                     }}
                        />
                        <UI.TextField
                            id="datetime-local"
                            type="datetime-local"
                            defaultValue={''/*expired(task.expired)*/}
                            className={classes.textField}
                            InputLabelProps={{
                                shrink: false,
                            }}
                        />
                        {/*</form>*/}
                        {/*<ListItemText className={classes.listItem} primary={task.expired} button="true"/>*/}
                        {/*<IconButton  aria-label="menu">*/}
                        {/*    <Icon.Menu />*/}
                        {/*</IconButton>*/}
                        {/*<ListItemSecondaryAction>*/}
                            <IconButton
                                edge="end"
                                aria-label="comments"
                                onClick={(e) => {
                                    e.preventDefault();
                                    onDelete(task)
                                }}>
                                <DeleteOutlineIcon />
                            </IconButton>
                        {/*</ListItemSecondaryAction>*/}
                    </ListItem>
                );
            })}
        </List>
    );
}

export default TaskListComponent;
