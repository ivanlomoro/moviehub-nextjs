import Image from 'next/image';
import './MovieCard.styles.css'
import { FaTrash } from "react-icons/fa";
import { FaEdit } from "react-icons/fa";

interface MovieCardProps {
    title: string;
    genre: string;
    score: number;
    posterImage: string;
    id?: string;
    onDelete: () => void;
    onEdit: () => void;
}

const MovieCard: React.FC<MovieCardProps> = ({ title, genre, score, posterImage, onDelete, onEdit }) => {

    return (
        <div className="movie-card">
            <Image src={posterImage} alt={title} className="movie-card__image" width={150} height={200} priority />
            <div className="movie-card__info">
                <h2 className="movie-card__title">{title}</h2>
                <p className="movie-card__genre">Genre: {genre}</p>
                <p className="movie-card__score">Rate: {score}</p>
                <button className="edit-button" onClick={onEdit}>
                    <FaEdit className="edit-icon"/>
                </button>
                <button className="delete-button-trash" onClick={onDelete}>
                    <FaTrash className="delete-icon-trash" />
                </button>
            </div>
        </div>
    );
};

export default MovieCard;
