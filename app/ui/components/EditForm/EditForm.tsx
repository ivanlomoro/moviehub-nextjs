import { useState, ChangeEvent, useEffect } from 'react';
import { useMovieContext } from '../../context/MovieContext';
import { IoMdClose } from 'react-icons/io';
import './EditForm.styles.css';
import { Movie, getMovieById, updateMovieById } from '../../services/movie.service';
import { toast } from 'react-hot-toast';

interface EditFormProps {
  movieId: string | undefined;
  onClose: () => void;
}

const EditForm: React.FC<EditFormProps> = ({ movieId, onClose }) => {
  const { fetchMovies } = useMovieContext();

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

  const handleUpdateClick = async () => {
    try {
      await updateMovieById(movieId || '', editedMovie as Movie);
      onClose();
      fetchMovies();
      toast.success('Movie updated successfully!');
    } catch (error) {
      console.error('Error updating movie', error);
    }
  };

  const genreOptions = ['Action', 'Comedy', 'Drama', 'Fantasy', 'Horror', 'Sci-Fi', 'Thriller','Suspense', 'Other'];

  return (
    <div className="edit-form-overlay">
      <div className="edit-form">
        <input type="text" name="title" placeholder="Title" value={editedMovie.title} onChange={handleInputChange} />
        <input
          type="text"
          name="poster_image"
          placeholder="Poster"
          value={editedMovie.poster_image}
          onChange={handleInputChange}
        />
        <input
          type="text"
          placeholder="Rate (1-10)"
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
            Select Genre
          </option>
          {genreOptions.map((genre, index) => (
            <option key={index} value={genre}>
              {genre}
            </option>
          ))}
        </select>
        <button className="update-button" onClick={handleUpdateClick}>
          Update Movie
        </button>
        <button className="close-update-button" onClick={onClose}>
          <IoMdClose />
        </button>
      </div>
    </div>
  );
};

export default EditForm;
