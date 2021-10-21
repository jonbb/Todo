import React, { useState, useEffect } from 'react';
import './Todo.css';
import TodoItem from './components/TodoItem'
import { getTodos, saveTodos } from './components/localStorage';
import { Container, Button, InputGroup, FormControl, ListGroup } from 'react-bootstrap';
import { v4 as uuidv4 } from 'uuid';

const Todo = () => {

  const [inputValue, setInputValue] = useState("")

  const [todoItems, setTodoItems] = useState(getTodos('todos') || [])

  // Tallenna muuttunut tehtävälista
  useEffect(() => {
    saveTodos('todos', todoItems)
  }, [todoItems]);

  // Lisää uusi tehtävä
  const addTodoHandler = () => {
    setTodoItems([...todoItems, {id: uuidv4(), name: inputValue}])
    setInputValue("")
  }

  // Merkkaa valmiiksi tai palauta tehtäväksi
  const markTodoHandler = (id) => {
    const todos = [...todoItems]
    const objectIndex = todos.findIndex((obj => obj.id === id))
    todos[objectIndex].isDone = !todos[objectIndex].isDone;
    setTodoItems(todos)
  }

  // Poista tehtävä
  const deleteTodoHandler = (id) => {
    const todos = [...todoItems]
    const objectIndex = todos.findIndex((obj => obj.id === id))
    todos.splice(objectIndex, 1)
    setTodoItems(todos)
  }

  return (
    <Container style={{width: "800px", padding: "50px"}}>
      <h1>Tehtävälista</h1>
      <br/>
      <InputGroup className="mb-3">
        <FormControl
          style={{focus: {boxShadow: "none"}}}
          placeholder="Lisää tehtävä"
          value={inputValue}
          onChange={e => setInputValue(e.target.value)}
          onKeyPress={event => {
            if (event.key === "Enter") {
              addTodoHandler()
            }
          }}
        />
        <Button variant="primary"
                onMouseDown={e => e.preventDefault()}
                onClick={addTodoHandler}>
          Lisää
        </Button>
      </InputGroup>
      <ListGroup>
        {
          todoItems.map(({ id, name, isDone }) =>
            <TodoItem key={id}
                      id={id}
                      name={name}
                      isDone={isDone}
                      markTodo={(id) => markTodoHandler(id)}
                      deleteTodo={(id) => deleteTodoHandler(id)}/>
          )
        }
      </ListGroup>
    </Container>
  );
}

export default Todo;