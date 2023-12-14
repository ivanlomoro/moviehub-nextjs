// HomeComponent.tsx
import React, { useEffect, useState } from 'react';
import { useMovieContext } from '../../context/MovieContext';
import MovieCard from '../MovieCard/MovieCard';
import "./HomeComponent.styles.css";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { EffectCoverflow, Pagination } from 'swiper/modules';
import Modal from '../Modal/Modal';
import { FaCirclePlus } from "react-icons/fa6";
import { deleteMovieById } from '../../services/movie.service';
import Swal from 'sweetalert2';
import EditForm from '../EditForm/EditForm';
import Loader from '../Loader/Loader';

const HomeComponent: React.FC = () => {
    const { movies, createMovie, fetchMovies } = useMovieContext();
    const [isLoading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEditFormOpen, setIsEditFormOpen] = useState(false);
    const [selectedMovieId, setSelectedMovieId] = useState<string | undefined>(undefined);

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const openEditForm = (movieId: string) => {
        setSelectedMovieId(movieId);
        setIsEditFormOpen(true);
    };

    const closeEditForm = () => {
        setSelectedMovieId(undefined);
        setIsEditFormOpen(false);
    };

    useEffect(() => {
        const loadData = async () => {
            try {
                await fetchMovies();
            } finally {
                setTimeout(() => {
                    setLoading(false);
                }, 1500);
            }
        };
    
        if (movies.length === 0) {
            loadData();
        }
    }, [fetchMovies, movies]);
    

    const handleDeleteMovie = async (movieId: string) => {
        try {
            const result = await Swal.fire({
                title: 'Are you sure delete this movie?',
                text: 'You won\'t be able to revert this.',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#FF3B4B',
                cancelButtonColor: '#677580',
                confirmButtonText: 'Yes, delete it!'
            });

            if (result.isConfirmed) {
                await deleteMovieById(movieId);
                fetchMovies();
                Swal.fire(
                    'Deleted!',
                    'Your movie has been deleted.',
                    'success'
                );
            }
        } catch (error) {
            console.error('Error deleting movie', error);
            Swal.fire(
                'Error',
                'There was an error trying to delete the movie.',
                'error'
            );
        }
    };

    return (
        <div>
            <div className="title-and-button-container">
                <h1 className='title-home'>{movies.length > 0 ? 'Your added movies ' : 'No movies added '}</h1>
                <div>
                    <button className="icon-button" onClick={openModal}>
                        <FaCirclePlus className="add-icon" />
                    </button>
                    <Modal isOpen={isModalOpen} onClose={closeModal} onCreateMovie={createMovie} />
                </div>
            </div>

            {isLoading ? (
                <Loader /> 
            ) : (
                <div className='container-swiper'>
                    <Swiper
                        effect={'coverflow'}
                        spaceBetween={10}
                        slidesPerView={4}
                        navigation
                        pagination={{ clickable: true }}
                        grabCursor={true}
                        centeredSlides={true}
                        coverflowEffect={{
                            rotate: 50,
                            stretch: 0,
                            depth: 100,
                            modifier: 1,
                            slideShadows: false,
                        }}
                        modules={[EffectCoverflow, Pagination]}
                        className="mySwiper"
                    >
                        {movies.map((movie, index) => (
                            <SwiperSlide key={index}>
                                <MovieCard
                                    title={movie.title}
                                    genre={movie.genre}
                                    score={movie.score}
                                    posterImage={movie.poster_image}
                                    onDelete={() => handleDeleteMovie(movie.id)}
                                    onEdit={() => openEditForm(movie.id)}
                                />
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            )}

            {isEditFormOpen && selectedMovieId && <EditForm movieId={selectedMovieId} onClose={closeEditForm} />}
        </div>
    );
};

export default HomeComponent;
