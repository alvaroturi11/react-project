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