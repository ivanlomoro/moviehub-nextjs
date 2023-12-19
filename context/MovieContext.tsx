'use client'
import React, { createContext, useContext, ReactNode, useState, useEffect } from 'react';
import { createMovie as createMovieAPI, getAllMoviesByUserId as getAllMoviesByUserIdAPI } from '../services/movie.service';
import { useUser } from '@auth0/nextjs-auth0/client';
import { createUser } from '@/services/user.service';

interface Movie {
    title: string;
    poster_image: string;
    score: number;
    genre: string;
    id: string;
}

interface User {
    id: string;
    name: string;
    email: string;
    createAt?: Date | string;
    updateAt?: Date | string;
}

interface MovieContextProps {
    movies: Movie[];
    fetchMovies: () => void;
    createMovie: (newMovie: Omit<Movie, 'userId'> & { registerUser: User }) => Promise<void>;
}

const MovieContext = createContext<MovieContextProps | undefined>(undefined);

interface MovieProviderProps {
    children: ReactNode;
}

export const MovieProvider: React.FC<MovieProviderProps> = ({ children }) => {
    const [movies, setMovies] = useState<Movie[]>([]);
    const [registerUser, setRegisterUser] = useState<User>();
    const { user } = useUser();
    const [creatingUser, setCreatingUser] = useState(false);

    useEffect(() => {
        const createOrLoginUser = async () => {
            try {
                if (user && !registerUser && !creatingUser) {
                    setCreatingUser(true);
                    const result = await createUser({
                        name: user.name,
                        email: user.email,
                    });

                    if (result.success) {
                        setRegisterUser(result.user);
                    } else {
                        console.error('Error creating or verifying user', result.error);
                    }

                    setCreatingUser(false);
                }
            } catch (error) {
                console.error('Network error creating or verifying user', error);
                setCreatingUser(false);
            }
        };

        createOrLoginUser();
    }, [user, registerUser, creatingUser]);

    const fetchData = async () => {
        if (registerUser) {
            const moviesData = await getAllMoviesByUserIdAPI(registerUser.id);
            setMovies(moviesData);
        }
    };

    const createMovie = async (newMovie: Omit<Movie, 'userId'> & { registerUser: User }): Promise<void> => {
        if (registerUser) {
            await createMovieAPI({ ...newMovie, userId: registerUser.id });
            fetchData();
        }
    };

    const contextValue: MovieContextProps = {
        movies,
        fetchMovies: fetchData,
        createMovie,
    };

    return <MovieContext.Provider value={contextValue}>{children}</MovieContext.Provider>;
};

export const useMovieContext = (): MovieContextProps => {
    const context = useContext(MovieContext);
    if (!context) {
        throw new Error('useMovieContext debe ser utilizado dentro de un MovieProvider');
    }
    return context;
};
