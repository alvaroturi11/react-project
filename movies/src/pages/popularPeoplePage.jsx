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
import FilterPeopleCard from "../components/filterPeopleCard";

const PopularPeoplePage = () => {
    const [page, setPage] = useState(1);
    const [nameFilter, setNameFilter] = useState("");

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

    // Remove duplicates
    const uniquePeople = Array.from(new Map(people.map((p) => [p.id, p])).values());

    // Filter
    const displayedPeople = uniquePeople.filter((p) =>
        p.name?.toLowerCase().includes(nameFilter.toLowerCase())
    );

    const handleChange = (type, value) => {
        if (type === "name") setNameFilter(value);
    };

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

            <Grid
                container
                spacing={2}
                sx={{ px: 2 }}
                alignItems="flex-start"
                justifyContent="flex-start"
            >
                <Grid item xs={12} sm={6} md={3} lg={3} xl={2} sx={{ display: "flex" }}>
                    <FilterPeopleCard
                        onUserInput={handleChange}
                        nameFilter={nameFilter}
                    />
                </Grid>

                {displayedPeople.map((person) => (
                    <Grid
                        item
                        key={person.id}
                        xs={12}
                        sm={6}
                        md={3}
                        lg={3}
                        xl={2}
                        sx={{ display: "flex" }}
                    >
                        <Card sx={{ width: "100%", height: "100%" }}>
                            <CardActionArea component={Link} to={`/person/${person.id}`}>
                                <CardMedia
                                    component="img"
                                    sx={{ height: 300, objectFit: "cover" }}
                                    image={
                                        person.profile_path
                                            ? `https://image.tmdb.org/t/p/w300${person.profile_path}`
                                            : "https://via.placeholder.com/300x450?text=No+Image"
                                    }
                                    alt={person.name}
                                />
                                <CardContent>
                                    <Typography
                                        variant="subtitle1"
                                        align="center"
                                        sx={{ fontWeight: 500 }}
                                    >
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