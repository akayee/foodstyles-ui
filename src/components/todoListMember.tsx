import React from 'react';
import { Todo } from '../types/entities';
import IconButton from '@mui/material/IconButton';
import ClearIcon from '@mui/icons-material/Clear';
import { deleteTodo, markTodoCompleted, markTodoUncompleted } from '../graphql/gql-client';


export default function TodoListMember( props:{fetchData:() => Promise<void>,listmember:Todo}) {
    const handleChangeCompleted = async() =>{
        props.listmember.completed? await markTodoUncompleted({id:props.listmember.id}): await markTodoCompleted({id:props.listmember.id})
        await props.fetchData()
    }
    const handleDelete = async() => {
        await deleteTodo({id:props.listmember.id})
        await props.fetchData()
    }
    return <div className='List-Member'>        
        <input checked={props.listmember.completed} onChange={handleChangeCompleted}  type='checkbox'/>        
        <div className='Make-a-todo-list'>
        {props.listmember.title}
        </div>
        <IconButton onClick={handleDelete} aria-label="delete">
            <ClearIcon />
        </IconButton>
        
    </div>
}