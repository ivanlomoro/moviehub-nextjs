import React, { useState, ChangeEvent, useEffect } from 'react';
import './Modal.styles.css'
import { IoMdClose } from "react-icons/io";
import { toast } from 'react-hot-toast';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreateMovie: (newMovie: NewMovie) => void;
}

interface NewMovie {
  title: string;
  poster_image: string;
  score: number;
  genre: string;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, onCreateMovie }) => {
  const [newMovie, setNewMovie] = useState<NewMovie>({
    title: '',
    poster_image: '',
    score: 0,
    genre: '',
  });

  useEffect(() => {
    if (isOpen) {
      setNewMovie({
        title: '',
        poster_image: '',
        score: 0,
        genre: '',
      });
    }
  }, [isOpen]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setNewMovie((prevMovie) => ({
      ...prevMovie,
      [name]: value,
    }));
  };

  const handleCreateMovie = () => {
    onCreateMovie(newMovie);
    onClose();
    toast.success('Movie added successfully!');
  };

  const genreOptions = ['Action', 'Comedy', 'Drama', 'Fantasy', 'Horror', 'Sci-Fi', 'Thriller','Suspense', 'Other'];

  return (
    <div className={`modal-overlay ${isOpen ? 'open' : ''}`}>
      <div className="modal-movie">
        <input type="text" name="title" placeholder='Title' value={newMovie.title} onChange={handleInputChange} />
        <input type="text" name="poster_image" placeholder='Poster' value={newMovie.poster_image} onChange={handleInputChange} />
        <input
          type="text"
          placeholder="Rate (1-10)"
          value={newMovie.score === 0 ? '' : String(newMovie.score)}
          onChange={(e) => {
            const inputValue = e.target.value;
            if (/^(10|[1-9])$/.test(inputValue)) {
              setNewMovie({ ...newMovie, score: parseInt(inputValue, 10) });
            }
          }}
        />
        <select name="genre" value={newMovie.genre} onChange={handleInputChange}>
          <option value="" disabled>Select Genre</option>
          {genreOptions.map((genre, index) => (
            <option key={index} value={genre}>
              {genre}
            </option>
          ))}
        </select>

        <button className="create-button" onClick={handleCreateMovie}>
          Add movie
        </button>
        <button className="close-button" onClick={onClose}>
          <IoMdClose />
        </button>
      </div>
    </div>
  );
};

export default Modal;
