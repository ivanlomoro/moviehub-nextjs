const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export interface Movie {
    title: string;
    poster_image: string;
    score: number;
    genre: string;
    userId?: string;
    id?:string
}

export const getAllMovies = async () => {
    try {
        const response = await fetch(`${apiUrl}/movie`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error getting movies', error);
        return [];
    }
};

export const createMovie = async (newMovie: Movie) => {
    try {
        const response = await fetch(`${apiUrl}/movie/${newMovie.userId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newMovie),
        });

        if (!response.ok) {
            throw new Error(`Error creating movie: ${response.statusText}`);
        }
    } catch (error) {
        console.error('Error creating movie', error);
    }
};

export const getAllMoviesByUserId = async (userId: string) => {
    try {
        const response = await fetch(`${apiUrl}/movie/user/${userId}`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error(`Error getting user's movies ${userId}`, error);
        return [];
    }
};

export const deleteMovieById = async (movieId: string) => {
    try {
        const response = await fetch(`${apiUrl}/movie/${movieId}`, {
            method: 'DELETE',
        });

        if (!response.ok) {
            throw new Error(`Error deleting movie: ${response.statusText}`);
        }
    } catch (error) {
        console.error(`Error deleting movie`, error);
    }
};


export const updateMovieById = async (movieId: string, updatedMovie: Movie) => {
    try {
        const response = await fetch(`${apiUrl}/movie/${movieId}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedMovie),
        });

        if (!response.ok) {
            throw new Error(`Error updating movie: ${response.statusText}`);
        }
    } catch (error) {
        console.error(`Error updating movie`, error);
    }
};

export const getMovieById = async (movieId: string) => {
    try {
        const response = await fetch(`${apiUrl}/movie/${movieId}`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error(`Error getting movie by ID ${movieId}`, error);
        throw error; 
    }
};
