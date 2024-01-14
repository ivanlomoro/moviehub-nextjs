'use client'
import { useState, ChangeEvent, useEffect } from 'react';
import { IoMdClose } from 'react-icons/io';
import './EditForm.styles.css';
import { toast } from 'react-hot-toast';
import { useMovieContext } from '@/context/MovieContext';
import { Movie, getMovieById, updateMovieById } from '@/services/movie.service';
import { uploadRequest } from '@/services/request.service';
import Image from 'next/image';
import { useTranslation } from "react-i18next";

interface EditFormProps {
  movieId: string | undefined;
  onClose: () => void;
}

const EditForm: React.FC<EditFormProps> = ({ movieId, onClose }) => {
  const { fetchMovies } = useMovieContext();
  const { t } = useTranslation();

  const [editedMovie, setEditedMovie] = useState<Partial<Movie>>({
    title: '',
    poster_image: '',
    score: 0,
    genre: '',
    userId: '',
  });

  useEffect(() => {
    const fetchMovieData = async () => {
      if (movieId) {
        try {
          const movie = await getMovieById(movieId);
          setEditedMovie(movie);
        } catch (error) {
          console.error('Error fetching movie', error);
        }
      }
    };

    fetchMovieData();
  }, [movieId]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setEditedMovie((prevMovie) => ({
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
          setEditedMovie((prevMovie) => ({
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

  const handleUpdateClick = async () => {
    try {
      await updateMovieById(movieId || '', editedMovie as Movie);
      onClose();
      fetchMovies();
      toast.success(t("Movie updated successfully!"));
    } catch (error) {
      console.error(t("Error updating movie"), error);
    }
  };

  const genreOptions = [t("Action"), t("Comedy"), "Drama", t("Fantasy"), t("Horror"), t("Sci-Fi"), t("Thriller"), t("Romance"), t("Other")];

  return (
    <div className="edit-form-overlay">
      <div className="edit-form">
        <input type="text" name="title" placeholder={t("Title")} value={editedMovie.title} onChange={handleInputChange} />
        {editedMovie.poster_image && (
          <Image src={editedMovie.poster_image} alt={t("Selected file")} className="thumbnail" width={200} height={200} />
        )}
        <div className="custom-file-input-container">
          <label htmlFor="file-input-edit" className="custom-file-input-label">
            {t("Change cover")}
          </label>
          <input
            id="file-input-edit"
            accept="image/*"
            type="file"
            onChange={handleFileInput}
          />
        </div>
        <input
          type="text"
          placeholder={t("Rate (1-10)")}
          value={editedMovie.score === 0 ? '' : String(editedMovie.score)}
          onChange={(e) => {
            const inputValue = e.target.value;
            if (/^(10|[1-9])$/.test(inputValue)) {
              setEditedMovie({ ...editedMovie, score: parseInt(inputValue, 10) });
            }
          }}
        />
        <select name="genre" value={editedMovie.genre} onChange={handleInputChange}>
          <option value="" disabled>
            {t("Select Genre")}
          </option>
          {genreOptions.map((genre, index) => (
            <option key={index} value={genre}>
              {genre}
            </option>
          ))}
        </select>
        <button className="update-button" onClick={handleUpdateClick}>
          {t("Update Movie")}
        </button>
        <button className="close-update-button" onClick={onClose}>
          <IoMdClose />
        </button>
      </div>
    </div>
  );
};

export default EditForm;
