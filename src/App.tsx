import { useState, useEffect } from "react";
import axios, { AxiosResponse } from "axios";
import {
  SearchBar,
  ImageGallery,
  ImageModal,
  ErrorMessage,
  LoadMoreBtn,
} from "./components";
import "./App.css";

type Image = {
  id: string;
  urls: { small: string; full: string };
  alt_description: string;
  user: { name: string; total_collections: number };
  description: string;
  likes: number;
};

type ApiResponse = {
  results: Image[];
};

const App = () => {
  const [images, setImages] = useState<Image[]>([]);
  const [selectedImage, setSelectedImage] = useState<Image | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState<number>(1);
  const [query, setQuery] = useState<string>("");

  useEffect(() => {
    if (!query) return;
    const searchImages = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response: AxiosResponse<ApiResponse> = await axios.get(
          "https://api.unsplash.com/search/photos",
          {
            params: {
              query,
              per_page: 30,
              page,
            },
            headers: {
              Authorization: `Client-ID qD2GYDXWg5EC5y_EzEv2s4JMoh993bSyc3trPfmyaDM`,
            },
          }
        );
        if (response.data.results.length === 0) {
          setError("No images found for this query. Please try again.");
        } else {
          setImages((prevImages) => [...prevImages, ...response.data.results]);
        }
      } catch (error) {
        console.error("Error during fetch:", error);
        setError("Something went wrong. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };

    searchImages();
  }, [query, page]);

  const openModal = (image: Image) => {
    setSelectedImage(image);
  };

  const closeModal = () => {
    setSelectedImage(null);
  };

  const handleLoadMore = () => {
    setPage((prevPage) => prevPage + 1);
  };

  return (
    <div className="App">
      <SearchBar
        onSubmit={(q: string) => {
          setQuery(q);
          setImages([]);
          setPage(1);
        }}
      />
      {error ? (
        <ErrorMessage message={error} />
      ) : isLoading ? (
        <p className="loading">Loading...</p>
      ) : (
        <>
          <ImageGallery images={images} onOpen={openModal} />
          <LoadMoreBtn
            onLoadMore={handleLoadMore}
            hasMore={images.length > 0}
          />{" "}
        </>
      )}
      {selectedImage && (
        <ImageModal
          src={selectedImage.urls.full}
          alt={selectedImage.alt_description}
          author={selectedImage.user.name}
          comments={selectedImage.user.total_collections.toString()}
          likes={selectedImage.likes}
          description={selectedImage.description}
          isOpen={!!selectedImage}
          onClose={closeModal}
        />
      )}
    </div>
  );
};

export default App;
