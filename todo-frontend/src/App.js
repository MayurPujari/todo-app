import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API_URL = 'https://todo-app-murex-alpha.vercel.app/';

function App() {
    const [todos, setTodos] = useState([]);
    const [title, setTitle] = useState('');
    const [editId, setEditId] = useState(null);

    useEffect(() => {
        fetchTodos();
    }, []);

    const fetchTodos = async () => {
        const response = await axios.get(API_URL);
        setTodos(response.data);
    };

    const saveTodo = async () => {
        try {
            if (editId) {
                await axios.put(`${API_URL}${editId}/`, { title });
                setEditId(null);
            } else {
                await axios.post(API_URL, { title });
            }
            setTitle('');
            fetchTodos();
        } catch (error) {
            console.error('Error saving todo:', error);
        }
    };

    const deleteTodo = async (id) => {
        try {
            await axios.delete(`${API_URL}${id}/`);
            fetchTodos();
        } catch (error) {
            console.error('Error deleting todo:', error);
        }
    };

    const deleteAllTodos = async () => {
        try {
            await axios.delete(`${API_URL}delete-all/`);
            fetchTodos();
        } catch (error) {
            console.error('Error deleting all todos:', error);
        }
    };

    const editTodo = (todo) => {
        setTitle(todo.title);
        setEditId(todo.id);
    };

    return (
        <div className="container mt-5">
            <h1 className="text-center text-primary mb-4">To-Do App</h1>
            <div className="mb-3">
                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="form-control"
                    placeholder="Enter a task"
                />
                <button onClick={saveTodo} className="btn btn-success mt-2 w-100">
                    {editId ? 'Update Task' : 'Add Task'}
                </button>
            </div>
            <ul className="list-group">
                {todos.map((todo) => (
                    <li key={todo.id} className="list-group-item d-flex justify-content-between align-items-center">
                        {todo.title}
                        <div>
                            <button
                                onClick={() => editTodo(todo)}
                                className="btn btn-warning btn-sm me-2"
                            >
                                Edit
                            </button>
                            <button
                                onClick={() => deleteTodo(todo.id)}
                                className="btn btn-danger btn-sm"
                            >
                                Delete
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
            {todos.length > 0 && (
                <button onClick={deleteAllTodos} className="btn btn-danger mt-3 w-100">
                    Delete All Tasks
                </button>
            )}
        </div>
    );
}

export default App;
