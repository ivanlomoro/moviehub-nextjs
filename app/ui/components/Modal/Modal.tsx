'use client'
import React, { useState, ChangeEvent, useEffect } from 'react';
import './Modal.styles.css'
import { IoMdClose } from "react-icons/io";
import { toast } from 'react-hot-toast';
import { uploadRequest } from '@/services/request.service';

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



  const [file, setFile] = useState<File>()
  console.log(file)

  const handleFileInput = async (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files !== null) {
      const file = e.target.files[0];

      try {
        const imageUrl = await uploadRequest(file);

        if (imageUrl) {
          toast.success('Imagen cargada exitosamente');
          setNewMovie((prevMovie) => ({
            ...prevMovie,
            poster_image: imageUrl,
          }));
          toast.success('Imagen cargada exitosamente');
        } else {
          toast.error('Error al cargar la imagen');
        }
      } catch (error) {
        console.error('Error al procesar la carga del archivo:', error);
        toast.error('Error al cargar la imagen');
      }
    }
  };

  const handleCreateMovie = async () => {
    if (!newMovie.poster_image) {
      toast.error('Por favor, carga una imagen antes de crear la película.');
      return;
    }
    try {
      await onCreateMovie(newMovie);
      onClose();
      toast.success('Película añadida exitosamente!');
    } catch (error) {
      console.error('Error al crear la película:', error);
      toast.error('Error al crear la película.');
    }
  };

  const genreOptions = ['Action', 'Comedy', 'Drama', 'Fantasy', 'Horror', 'Sci-Fi', 'Thriller', 'Suspense', 'Other'];

  return (
    <div className={`modal-overlay ${isOpen ? 'open' : ''}`}>
      <div className="modal-movie">
        <input type="text" name="title" placeholder='Title' value={newMovie.title} onChange={handleInputChange} />
        {/* <input type="text" name="poster_image" placeholder='Poster' value={newMovie.poster_image} onChange={handleInputChange} /> */}
        <input accept="image/*" type="file" onChange={handleFileInput} />
        <span>{newMovie.poster_image && `Selected file: ${newMovie.poster_image}`}</span>
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
