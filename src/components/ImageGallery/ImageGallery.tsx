import { FC } from "react";
import ImageCard from "../ImageCard/ImageCard";
import styles from "./ImageGallery.module.css";

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

interface ImageGalleryProps {
  images: Image[];
  onOpen: (image: Image) => void;
}

const ImageGallery: FC<ImageGalleryProps> = ({ images, onOpen }) => (
  <ul className={styles.list}>
    {images.map((image) => (
      <li key={image.id} className={styles.item}>
        <ImageCard image={image} onOpen={onOpen} />
      </li>
    ))}
  </ul>
);

export default ImageGallery;
