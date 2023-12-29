'use client'
import React, { useState, ChangeEvent, useEffect } from 'react';
import './Modal.styles.css'
import { IoMdClose } from "react-icons/io";
import { toast } from 'react-hot-toast';
import { uploadRequest } from '@/services/request.service';
import Image from 'next/image';

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
          setNewMovie((prevMovie) => ({
            ...prevMovie,
            poster_image: imageUrl,
          }));
          toast.success('Image uploaded successfully');
        } else {
          toast.error('Error loading image');
        }
      } catch (error) {
        console.error('Error processing file upload:', error);
        toast.error('Error loading image');
      }
    }
  };

  const handleCreateMovie = async () => {
    if (!newMovie.poster_image) {
      toast.error('Please upload an image before creating the movie.');
      return;
    }
    try {
      await onCreateMovie(newMovie);
      onClose();
      toast.success('Movie added successfully!');
    } catch (error) {
      console.error('Error creating movie:', error);
      toast.error('Error creating movie.');
    }
  };

  const genreOptions = ['Action', 'Comedy', 'Drama', 'Fantasy', 'Horror', 'Sci-Fi', 'Thriller', 'Suspense', 'Other'];

  return (
    <div className={`modal-overlay ${isOpen ? 'open' : ''}`}>
      <div className="modal-movie">
        <input type="text" name="title" placeholder='Title' value={newMovie.title} onChange={handleInputChange} />
        <input accept="image/*" type="file" onChange={handleFileInput} />
        {newMovie.poster_image ? (
          <Image src={newMovie.poster_image} alt="Selected file" className="thumbnail" width={200} height={200} />
        ) : (
          <div className="default-image-container">
            <Image src="https://res.cloudinary.com/dgxkfjsbz/image/upload/v1702641917/moviehub/Logo/moviehat_rrk7x2.png" alt="Default" className="default-image" width={200} height={200} />
          </div>
        )}

        <div className="custom-file-input-container">
          <label htmlFor="file-input-modal" className="custom-file-input-label">
            Add cover
          </label>
          <input
            id="file-input-modal"
            accept="image/*"
            type="file"
            onChange={handleFileInput}
          />
        </div>
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
