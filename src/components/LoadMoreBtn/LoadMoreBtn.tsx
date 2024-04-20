import { FC } from "react";
import styles from "./LoadMoreBtn.module.css";

interface LoadMoreBtnProps {
  onLoadMore: () => void;
  hasMore: boolean;
}

const LoadMoreBtn: FC<LoadMoreBtnProps> = ({ onLoadMore, hasMore }) => {
  if (!hasMore) {
    return null;
  }

  return (
    <button onClick={onLoadMore} className={styles.loadMoreBtn}>
      Load more
    </button>
  );
};

export default LoadMoreBtn;
