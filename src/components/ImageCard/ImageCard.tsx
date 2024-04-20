import { FC } from "react";
import styles from "./ImageCard.module.css";

interface User {
  name: string;
  total_collections: number;
}

interface Image {
  id: string;
  urls: {
    small: string;
    full: string;
  };
  alt_description: string;
  user: User;
  description: string;
  likes: number;
}

interface ImageCardProps {
  image: Image;
  onOpen: (image: Image) => void;
}

const ImageCard: FC<ImageCardProps> = ({ image, onOpen }) => (
  <div className={styles.box}>
    <img
      className={styles.img}
      src={image.urls.small}
      alt={image.alt_description}
      onClick={() => onOpen(image)}
    />
  </div>
);

export default ImageCard;
