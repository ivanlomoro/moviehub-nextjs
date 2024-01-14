'use client'
import React, { useState, ChangeEvent, useEffect } from 'react';
import './Modal.styles.css'
import { IoMdClose } from "react-icons/io";
import { toast } from 'react-hot-toast';
import { uploadRequest } from '@/services/request.service';
import Image from 'next/image';
import { Movie, User } from '@/context/MovieContext';
import { useTranslation } from "react-i18next";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreateMovie: (newMovie: NewMovie) => void;
}

export interface NewMovie {
  title: string;
  poster_image: string;
  score: number;
  genre: string;
  registerUser: User;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, onCreateMovie }) => {
  const [newMovie, setNewMovie] = useState<NewMovie>({
    title: '',
    poster_image: '',
    score: 0,
    genre: '',
    registerUser: { id: '', name: '', email: '' },
  });
  const { t } = useTranslation();

  useEffect(() => {
    if (isOpen) {
      setNewMovie({
        title: '',
        poster_image: '',
        score: 0,
        genre: '',
        registerUser: { id: '', name: '', email: '' },
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
          toast.success(t("Image uploaded successfully"));
        } else {
          toast.error(t("Error loading image"));
        }
      } catch (error) {
        console.error(t("Error processing file upload:"), error);
        toast.error(t("Error loading image"));
      }
    }
  };

  const handleCreateMovie = async () => {
    if (!newMovie.poster_image) {
      toast.error(t("Please upload an image before creating the movie."));
      return;
    }
    try {
      await onCreateMovie(newMovie);
      onClose();
      toast.success(t("Movie added successfully!"));
    } catch (error) {
      console.error(t("Error creating movie:"), error);
      toast.error(t("Error creating movie."));
    }
  };

  const genreOptions = [t("Action"), t("Comedy"), "Drama", t("Fantasy"), t("Horror"), t("Sci-Fi"), t("Thriller"), t("Romance"), t("Other")];

  return (
    <div className={`modal-overlay ${isOpen ? 'open' : ''}`}>
      <div className="modal-movie">
        <input type="text" name="title" placeholder={t("Title")} value={newMovie.title} onChange={handleInputChange} />
        <input accept="image/*" type="file" onChange={handleFileInput} />
        {newMovie.poster_image ? (
          <Image src={newMovie.poster_image} alt={t("Selected file")} className="thumbnail" width={200} height={200} />
        ) : (
          <div className="default-image-container">
            <Image src="https://res.cloudinary.com/dgxkfjsbz/image/upload/v1702641917/moviehub/Logo/moviehat_rrk7x2.png" alt="Default" className="default-image" width={200} height={200} />
          </div>
        )}

        <div className="custom-file-input-container">
          <label htmlFor="file-input-modal" className="custom-file-input-label">
            {t("Add cover")}
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
          placeholder={t("Rate (1-10)")}
          value={newMovie.score === 0 ? '' : String(newMovie.score)}
          onChange={(e) => {
            const inputValue = e.target.value;
            if (/^(10|[1-9])$/.test(inputValue)) {
              setNewMovie({ ...newMovie, score: parseInt(inputValue, 10) });
            }
          }}
        />
        <select name="genre" value={newMovie.genre} onChange={handleInputChange}>
          <option value="" disabled>{t("Select Genre")}</option>
          {genreOptions.map((genre, index) => (
            <option key={index} value={genre}>
              {genre}
            </option>
          ))}
        </select>

        <button className="create-button" onClick={handleCreateMovie}>
          {t("Add movie")}
        </button>
        <button className="close-button" onClick={onClose}>
          <IoMdClose />
        </button>
      </div>
    </div>
  );
};

export default Modal;
