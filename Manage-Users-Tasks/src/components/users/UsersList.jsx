import styles from "./UsersList.module.css";

import { useState } from "react";

import Card from "../UI/Card";
import UserListItem from "./UserListItem";

const UsersList = ({ users, todos, onUpdate, onDelete, onIdSelect }) => {
  const [selectedUserId, setSelectedUserId] = useState(0);

  const selectedUserHandler = (id) => {
    // If the same id pressed, will remove the user choice
    if (id === selectedUserId) {
      setSelectedUserId(0);
    } else {
      setSelectedUserId(id);
    }
    // Tell the parent that specific id selected, and want to show posts & todos
    onIdSelect(id);
  };

  return (
    <ul>
      {users.map((user) => {
        let style = 'completed_border';
        let backgnd = '';
        // Check if user id label pressed, to change the background color
        if (user.id === selectedUserId) {
          backgnd = 'orange_background';
        }

        todos.forEach((todo) => {
          if (user.id === todo.userId && todo.completed === false) {
            style = "uncompleted_border";
          }
        });

        return (
          <Card className={`${styles[style]} ${styles[backgnd]}`} key={user.id}>
            <UserListItem
              user={user}
              onUpdate={(updatedUser) => onUpdate(updatedUser)}
              onDelete={(id) => onDelete(id)}
              onSelectUser={selectedUserHandler}
            />
          </Card>
        );
      })}
    </ul>
  );
};

export default UsersList;
