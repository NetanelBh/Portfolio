import styles from "./PostListItem.module.css";

import Card from "../UI/Card";

const PostListItem = ({ post }) => {
  return (
    <Card className={styles.li_container}>
      <li>
        <p className={styles.title}>
          <span className={styles.prefix}>Title:</span> {post.title}
        </p>
        <p className={styles.title}>
          <span className={styles.prefix}>Body:</span> {post.body}
        </p>
      </li>
    </Card>
  );
};

export default PostListItem;
