import React, { useState } from "react";
import PageTemplate from "../components/templateMovieListPage";
import { useQuery } from "@tanstack/react-query";
import Spinner from "../components/spinner";
import AddToFavoritesIcon from "../components/cardIcons/addToFavorites";
import { getTopRatedMovies } from "../api/tmdb-api";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";

const TopRatedMoviesPage = () => {
    const [page, setPage] = useState(1);

    const { data, error, isLoading, isError } = useQuery({
        queryKey: ["topRatedMovies", { page }],
        queryFn: getTopRatedMovies,
        keepPreviousData: true,
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

    //const toDo = () => true;
    const handleNext = () => {
        if (page < data.total_pages) setPage((p) => p + 1);
    };

    const handlePrev = () => {
        if (page > 1) setPage((p) => p - 1);
    };

    return (
        <>
            <PageTemplate
                title="Top Rated Movies"
                movies={movies}
                action={(movie) => <AddToFavoritesIcon movie={movie} />}
            />

            <Stack direction="row" spacing={2} justifyContent="center" sx={{ my: 3 }}>
                <Button
                    variant="contained"
                    color="secondary"
                    disabled={page === 1}
                    onClick={handlePrev}
                >
                    Previous
                </Button>

                <Button
                    variant="contained"
                    color="primary"
                    disabled={page === data.total_pages}
                    onClick={handleNext}
                >
                    Next
                </Button>
            </Stack>
        </>
    );
};

export default TopRatedMoviesPage;