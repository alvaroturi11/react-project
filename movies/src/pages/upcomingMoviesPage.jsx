/*import React, { useContext } from "react";
import PageTemplate from "../components/templateMovieListPage";
import { MoviesContext } from "../contexts/moviesContext";
import { useQueries } from "@tanstack/react-query";
import { getMovie } from "../api/tmdb-api";
import Spinner from '../components/spinner'
import AddToFavoritesIcon from "../components/cardIcons/addToFavorites";


const UpcomingMoviesPage = () => {
    const { upcoming: movieIds } = useContext(MoviesContext);

    // Create an array of queries and run in parallel.
    const upcomingMovieQueries = useQueries({
        queries: movieIds.map((movieId) => {
            return {
                queryKey: ['movie', { id: movieId }],
                queryFn: getMovie,
            }
        })
    });

    // Check if any of the parallel queries is still loading.
    const isPending = upcomingMovieQueries.find((m) => m.isPending === true);

    if (isPending) {
        return <Spinner />;
    }

    const movies = upcomingMovieQueries.map((q) => {
        q.data.genre_ids = q.data.genres.map(g => g.id)
        return q.data
    });

    const toDo = () => true;

    return (
        <PageTemplate
            title="Upcoming Movies"
            movies={movies}
            action={(movie) => {
                return (
                    <>
                        <AddToFavoritesIcon movie={movie} />
                    </>
                );
            }}
        />
    );
};

export default UpcomingMoviesPage;*/

import React from "react";
import PageTemplate from "../components/templateMovieListPage";
import { useQuery } from "@tanstack/react-query";
import Spinner from "../components/spinner";
import AddToFavoritesIcon from "../components/cardIcons/addToFavorites";
import { getUpcomingMovies } from "../api/tmdb-api";

const UpcomingMoviesPage = () => {
    // Run a single query to fetch all upcoming movies from TMDB
    const { data, error, isLoading, isError } = useQuery({
        queryKey: ["upcomingMovies"],
        queryFn: getUpcomingMovies,
    });

    // If the data is still loading, show the spinner
    if (isLoading) {
        return <Spinner />;
    }

    // If there’s an error, display it
    if (isError) {
        return <h1>{error.message}</h1>;
    }

    // Extract the list of movies from the query result
    const movies = data.results;

    const toDo = () => true;

    return (
        <PageTemplate
            title="Upcoming Movies"
            movies={movies}
            action={(movie) => {
                return (
                    <>
                        <AddToFavoritesIcon movie={movie} />
                    </>
                );
            }}
        />
    );
};

export default UpcomingMoviesPage;

