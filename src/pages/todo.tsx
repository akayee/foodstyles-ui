import React, { Dispatch, useState, useEffect }  from 'react'
import { setAllTodos } from '../store/actions'
import { connect } from 'react-redux'
import { getTodos, createTodo } from '../graphql/gql-client'
import { Todo } from '../types/entities'
import TodoListMember from '../components/todoListMember'

import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';

function Todos(updateAllTodos:any){ 
    
    
    const [todo, setTodo] = useState<string>('')
    const [allTodos, setAllTodos] = useState<Array<Todo>>([])
    const [filteredTodos, setFilteredTodos] = useState<Array<Todo>>([])

    useEffect(()=>{ 
        //If I had enough time i will not use useEffect for fetch       
        fetchData()
    },[])
    useEffect(() => {
        const listener = (event:any) => {
          if (event.code === "Enter" || event.code === "NumpadEnter") {
            console.log("Enter key was pressed. Run your function.");
            event.preventDefault();
            saveTodo();
          }
        };
        document.addEventListener("keydown", listener);
        return () => {
          document.removeEventListener("keydown", listener);
        };
    }, [todo])

    const fetchData =async() => {
        const todos = await getTodos()
        setAllTodos(todos.data.listTodos.data)
    }

    async function saveTodo () {
        await createTodo({title:todo,completed:false})
        await fetchData()

    }
    function handleChange (e:any) {       
        setTodo(e.target.value)
    }
    
    function handleFilterData(e:any,completed:boolean) {
        if(e.target.name !== 'All') setFilteredTodos(allTodos.filter((todo)=> todo.completed === completed))
        else setFilteredTodos(allTodos)
    }
    return <div className='Todos---Web'>
        <div className='Rectangle'>
                <div className='img.Group '>
                    <img src={require('../assets/150CBC45-AE9E-420F-A820-01723ACE30E8.svg').default} alt='mySvgImage' />
                </div>
                <div className='Todo-List'>
                    Todo List
                </div>
                <input value={todo} onChange={handleChange} className='Line-Copy' type="text" id="inputID" placeholder="Add new todo" />
                {filteredTodos.map( (todo:Todo,index:any)=> <TodoListMember key={index} fetchData={fetchData} listmember={todo} />)}
                <ButtonGroup className='filter' variant="text" color='inherit' aria-label="text button group">
                    <Button name='All' onClick={(e)=>handleFilterData(e,false)}>All</Button>
                    <Button name='Completed' onClick={(e)=>handleFilterData(e,true)}>Completed</Button>
                    <Button name='Incompleted' onClick={(e)=>handleFilterData(e,false)}>Incompleted</Button>
                </ButtonGroup> 
            </div> 
                
    </div>
}
const mapStateToProps = (state: any) => ({ ...state })

const mapDispatchToProps = (dispatch: Dispatch<any>) => ({
    updateAllTodos: (allTodos: Todo[]) => dispatch(setAllTodos(allTodos)),
})
export default connect(mapStateToProps, mapDispatchToProps)(Todos)