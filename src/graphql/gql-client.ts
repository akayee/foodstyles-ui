import { ApolloClient, InMemoryCache, gql, createHttpLink, DefaultOptions } from '@apollo/client'
import { setContext } from '@apollo/client/link/context'



const defaultOptions: DefaultOptions = {
    query: {
        fetchPolicy: 'no-cache',
    },
}

const client = new ApolloClient({
    link: 
        createHttpLink({
            uri: 'http://localhost:4000/',
        }
    ),
    cache: new InMemoryCache(),
    defaultOptions: defaultOptions,
})

export async function getTodos() {
    return await client.query({
        query: gql`
            query {
                listTodos {
                    count,
                    data
                    {
                        id,
                        completed,
                        title
                    }
                }
            }
        `,
    })
}

export async function createTodo(TodoInput:{title: string, completed: boolean}): Promise<any> {
    let results = await client.mutate({
        mutation: gql`
           mutation mymutation($TodoInput:TodoInput) {createTodo(Mutation:$TodoInput){
            id,
            completed,
            title
        }}
        `,
        variables: {
            TodoInput
            
        },
    })

    return results
}

export async function markTodoCompleted(TodoUpdateInput:{
    id: string
}): Promise<any> {
    let results = await client.mutate({
        mutation: gql`
           mutation mymutation($TodoUpdateInput:TodoUpdateInput) {markTodoCompleted(Mutation:$TodoUpdateInput){
            id,
            completed,
            title
        }}
        `,
        variables: {
            TodoUpdateInput            
        },
    })

    return results
}

export async function markTodoUncompleted(TodoUpdateInput:{
    id: string
}): Promise<any> {
    let results = await client.mutate({
        mutation: gql`
           mutation mymutation($TodoUpdateInput:TodoUpdateInput) {markTodoUncompleted(Mutation:$TodoUpdateInput){
            id,
            completed,
            title
        }}
        `,
        variables: {
            TodoUpdateInput            
        },
    })

    return results
}

export async function deleteTodo(TodoUpdateInput:{
    id: string
}): Promise<any> {
    let results = await client.mutate({
        mutation: gql`
           mutation mymutation($TodoUpdateInput:TodoUpdateInput) {deleteTodo(Mutation:$TodoUpdateInput)
           }
        `,
        variables: {
            TodoUpdateInput            
        },
    })

    return results
}