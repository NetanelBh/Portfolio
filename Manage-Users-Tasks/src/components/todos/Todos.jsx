import styles from "./Todos.module.css";

import { useState, useEffect } from "react";

import Card from "../UI/Card";
import Button from "../UI/Button";
import Input from "../input/Input";
import TodosListItem from "./TodosListItem";

const Todos = ({ todos, userId, onMarkComplete, onAddTodo }) => {
  const [addIdClicked, setAddIsClicked] = useState(false);
  const [title, setTitle] = useState("");
  const [userIdClicked, setUserIdClicked] = useState(0);

  // If changed user after clicked on addTodo button, will close the add input
  useEffect(() => {
    if (userId !== userIdClicked) {
      setAddIsClicked(false);
    }
  }, [userId]);

  const addTodoClickHandler = () => {
    setAddIsClicked(true);
    setUserIdClicked(userId);
  };

  const submitHandler = (event) => {
    event.preventDefault();

    const newTodo = {
      userId,
      id: todos[todos.length - 1].id + 1,
      title,
      completed: false,
    };

    setTitle("");
    setAddIsClicked(false);
    onAddTodo(newTodo);
  };

  return (
    <>
      <div className={styles.header}>
        <h3>Todos - User {userId}</h3>
        <Button
          type="button"
          title="Add"
          onClick={addTodoClickHandler}
          className={styles.btn}
        />
      </div>

      <Card className={styles.main_container}>
        {!addIdClicked && (
          <ul className={styles.todo_list}>
            {todos.map((todo) => (
              <TodosListItem
                key={todo.id}
                todo={todo}
                onMarkComplete={(title) => onMarkComplete(title)}
              />
            ))}
          </ul>
        )}

        {addIdClicked && (
          <form onSubmit={submitHandler}>
            <div className={styles.container}>
              <Input
                title="Title:"
                type="text"
                name="title"
                value={title}
                onChange={(value) => setTitle(value)}
                containerStyle={styles.add_todos_container}
              />

              <div className={styles.actions}>
                <Button
                  type="submit"
                  title="Add"
                  className={`${styles.action_btn} ${styles.update}`}
                />
                <Button
                  type="button"
                  title="cancel"
                  onClick={() => setAddIsClicked(false)}
                  className={`${styles.action_btn} ${styles.delete}`}
                />
              </div>
            </div>
          </form>
        )}
      </Card>
    </>
  );
};

export default Todos;
