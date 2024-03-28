import styles from "./Posts.module.css";

import { useEffect, useState } from "react";

import Card from "../UI/Card";
import Button from "../UI/Button";
import AddForm from "../form/AddForm";
import PostListItem from "./PostListItem";

const Posts = ({ posts, userId, onAddPost }) => {
  const [selectedIdClicked, setSelectedIdClicked] = useState(false);
  const [userIdClicked, setUserIdClicked] = useState(0);

  // If changed user after clicked on addPost button, will close the add input
  useEffect(() => {
    if (userId !== userIdClicked) {
      setSelectedIdClicked(false);
    }
  }, [userId]);

  const addPostClickHandler = () => {
    setSelectedIdClicked(true);
    setUserIdClicked(userId);
  };

  const submitHandler = (newData) => {
    setSelectedIdClicked(false);

    const newPost = { ...newData, userId, id: posts[posts.length - 1].id + 1 };

    onAddPost(newPost);
  };

  return (
    <>
      <div className={styles.header}>
        <h3>Posts - User {userId}</h3>
        <Button
          type="button"
          title="Add"
          onClick={addPostClickHandler}
          className={styles.btn}
        />
      </div>

      <Card className={styles.main_container}>
        {!selectedIdClicked && (
          <ul className={styles.post_list}>
            {posts.map((post) => (
              <PostListItem post={post} key={post.id} />
            ))}
          </ul>
        )}

        {selectedIdClicked && (
          <AddForm
            titleName="Title:"
            bodyName="Body:"
            onAdd={submitHandler}
            onCancel={() => setSelectedIdClicked(false)}
          />
        )}
      </Card>
    </>
  );
};

export default Posts;
