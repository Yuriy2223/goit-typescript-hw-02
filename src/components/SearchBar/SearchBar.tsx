import { FC, ChangeEvent, FormEvent, useState } from "react";
import styles from "./SearchBar.module.css";
import { FaSearch } from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface SearchBarProps {
  onSubmit: (input: string) => void;
}

const SearchBar: FC<SearchBarProps> = ({ onSubmit }) => {
  const [input, setInput] = useState("");

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    if (input.trim() === "") {
      toast.error("Type text before searching", { className: "custom-toast" });
    } else {
      onSubmit(input);
    }
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInput(event.target.value);
  };

  return (
    <header className={styles.heder}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <button type="submit" className={styles.button}>
          <FaSearch className={styles.icon} />
        </button>
        <input
          className={styles.input}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          onChange={handleChange}
        />
      </form>
      <ToastContainer />
    </header>
  );
};

export default SearchBar;
