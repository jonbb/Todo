import React from 'react'
import { ListGroup, Button } from 'react-bootstrap'

const TodoItem = ({ id, name, isDone, markTodo, deleteTodo }) => (
  <ListGroup.Item>
    <span style={{ textDecoration: isDone ? "line-through" : "" }}>{name}</span>
    <div style={{float: "right"}}>
      <Button variant={ !isDone ? "success" : "light"}  onMouseDown={e => e.preventDefault()} onClick={() => markTodo(id)}>
          {!isDone ? "Merkitse valmiiksi" : "Palauta"}
      </Button>{' '}
      <Button variant="danger" onMouseDown={e => e.preventDefault()} onClick={() => deleteTodo(id)}>
        Poista
      </Button>
    </div>
  </ListGroup.Item>
)

export default TodoItem