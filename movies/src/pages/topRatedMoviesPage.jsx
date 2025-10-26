import React from "react";
import PageTemplate from "../components/templateMovieListPage";
import { useQuery } from "@tanstack/react-query";
import Spinner from "../components/spinner";
import AddToFavoritesIcon  from "../components/cardIcons/addToFavorites";
import { getTopRatedMovies } from "../api/tmdb-api";

const TopRatedMoviesPage = () => {
    const { data, error, isLoading, isError } = useQuery({
        queryKey: ["topRatedMovies"],
        queryFn: getTopRatedMovies,
    });

    // Check if the query is still loading.
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
            title="Top Rated Movies"
            movies={movies}
            action={(movie) => <AddToFavoritesIcon movie={movie} />}
        />
    );
};

export default TopRatedMoviesPage;