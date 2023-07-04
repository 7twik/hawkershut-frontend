import { useEffect, useState } from "react";
import axios from "axios";
import "./todoList.css";
function TodoList({ setCurrentUsername,todoChange,todoDelete }) {
  const myStorage = window.localStorage;
  const [todos, setTodos] = useState(
    myStorage.getItem("todos") ? JSON.parse(myStorage.getItem("todos")) : []
  );
  const [inputValue, setInputValue] = useState("");
  const [editingIndex, setEditingIndex] = useState(-1);
  // const [editValue, setEditValue] = useState("");

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleAddTodo = async (e) => {
    e.preventDefault();

    if (inputValue.trim() !== "") {
      if (editingIndex === -1) {
        setTodos([...todos, inputValue]);
      } else {
        const updatedTodos = [...todos];
        updatedTodos[editingIndex] = inputValue;
        setTodos(updatedTodos);
        setEditingIndex(-1);
      }
      setInputValue("");
    } else {
      console.log("Please input some value");
    }
    const newOrderAdd = {
      username: setCurrentUsername,
      item: inputValue.trim(),
    };
    console.log(newOrderAdd)
    todoChange(inputValue.trim())
    try {
      const res = await axios.post(
        "https://hawkerhut-back.onrender.com/api/items",
        // "http://localhost:8009/api/items",
        newOrderAdd
      );
      console.log(res);
    } catch (err) {
      console.log(err);
    }
  };

  //Get items from local storage
  useEffect(() => {
    myStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  //Deleting an item from item model
  const handleDeleteTodo = async (e, index) => {
    e.preventDefault();
    const updatedTodos = todos.filter((_, i) => i !== index);
    setTodos(updatedTodos);
    todoDelete(index)
    const newOrderDelete = {
      username: setCurrentUsername,
      item: todos[index],
    };
    try {
      const res = await axios.post(
        "https://hawkerhut-back.onrender.com/api/items/del",
        // "http://localhost:8009/api/items/del",
        newOrderDelete
      );
      console.log(res);
    } catch (err) {
      console.log(err);
    }
  };

  // const handleEditTodo = (e,index) => {
  //   e.preventDefault();
  //   setEditingIndex(index);
  //   setEditValue(todos[index]);
  // };

  // const handleCancelEdit = (e) => {
  //   e.preventDefault();
  //   setEditingIndex(-1);
  //   setEditValue("");
  // };
  return (
    <div>
      <input
        type="text"
        placeholder="Type your items here"
        value={inputValue}
        onChange={handleInputChange}
        style={{ width: "210px" }}
      />
      <button
        onClick={(e) => handleAddTodo(e)}
        style={{
          marginLeft: "2vw",
          background: "green",
          padding: "3px 15px",
          color: "white",
          borderRadius: "3px",
        }}
      >
        {/* {editingIndex === -1 ? "Add" : "Save"} */}
        Add
      </button>
      {/* {editingIndex !== -1 && (
        <button onClick={(e) => handleCancelEdit(e)}>Cancel</button>
      )} */}
      <ol>
        {todos.map((todo, index) => (
          <li key={index} style={{ color: "white" }}>
            <span style={{ marginRight: "8vw", minWidth: "40px" }}>{todo}</span>
            {/* {index === editingIndex ? (
              <input
                type="text"
                value={editValue}
                onChange={(e) => setEditValue(e.target.value)}
                style={{
                  width: "510px",
                }}
              />
            ) : (
              todo
            )} */}

            {/* <button onClick={(e) => handleEditTodo(e,index)}>
              {index === editingIndex ? 'Save' : 'Edit'}
            </button> */}
            <button
              className="delete-btn"
              onClick={(e) => handleDeleteTodo(e, index)}
              style={{
                marginLeft: "2vw",
                // marginTop: "1vh",
                background: "red",
                padding: "1px 15px",
                color: "white",
                borderRadius: "3px",
              }}
            >
              Delete
            </button>
          </li>
        ))}
      </ol>
    </div>
  );
}

export default TodoList;
