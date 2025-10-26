import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Spinner from "../components/spinner";
import { getPopularPeople } from "../api/tmdb-api";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActionArea from "@mui/material/CardActionArea";
import { Link } from "react-router";

const PopularPeoplePage = () => {
    const [page, setPage] = useState(1);

    const { data, error, isLoading, isError } = useQuery({
        queryKey: ["popularPeople", { page }],
        queryFn: getPopularPeople,
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

    // Extract the list of people from the query result
    const people = data.results;

    //const toDo = () => true;
    const handleNext = () => {
        if (page < data.total_pages) setPage((p) => p + 1);
    };

    const handlePrev = () => {
        if (page > 1) setPage((p) => p - 1);
    };

    return (
        <>
            <Typography variant="h4" align="center" sx={{ my: 3 }}>
                Popular People (Page {page})
            </Typography>

            <Grid container spacing={2} justifyContent="center" sx={{ px: 2 }}>
                {people.map((person) => (
                    <Grid item key={person.id} xs={6} sm={4} md={3} lg={2}>
                        <Card>
                            <CardActionArea component={Link} to={`/person/${person.id}`}>
                                <CardMedia
                                    component="img"
                                    image={
                                        person.profile_path
                                            ? `https://image.tmdb.org/t/p/w300${person.profile_path}`
                                            : "https://via.placeholder.com/300x450?text=No+Image"
                                    }
                                    alt={person.name}
                                />
                                <CardContent>
                                    <Typography variant="subtitle1" align="center">
                                        {person.name}
                                    </Typography>
                                </CardContent>
                            </CardActionArea>
                        </Card>
                    </Grid>
                ))}
            </Grid>

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

export default PopularPeoplePage;