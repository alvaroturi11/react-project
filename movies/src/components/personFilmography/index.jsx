import React from "react";
import { useQuery } from "@tanstack/react-query";
import { getPersonCredits } from "../../api/tmdb-api";
import Spinner from "../spinner";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActionArea from "@mui/material/CardActionArea";
import { Link } from "react-router";

const PersonFilmography = ({ person }) => {
    const { data, error, isPending, isError } = useQuery({
        queryKey: ["personCredits", { id: person.id }],
        queryFn: getPersonCredits,
    });

    if (isPending) {
        return <Spinner />;
    }

    if (isError) {
        return <h1>{error.message}</h1>;
    }

    const credits = (data.cast || []).filter((c) => c.poster_path); // solo pelis con imagen

    return (
        <>
            <Typography variant="h5" component="h3" sx={{ my: 2 }}>
                Filmography
            </Typography>

            <Grid container spacing={2} justifyContent="center">
                {credits.slice(0, 20).map((c) => (
                    <Grid item key={c.id} xs={6} sm={4} md={3} lg={2}>
                        <Card>
                            <CardActionArea component={Link} to={`/movies/${c.id}`}>
                                <CardMedia
                                    component="img"
                                    image={`https://image.tmdb.org/t/p/w300${c.poster_path}`}
                                    alt={c.title || c.name}
                                />
                                <CardContent>
                                    <Typography variant="subtitle2" align="center" noWrap>
                                        {c.title || c.name}
                                    </Typography>
                                </CardContent>
                            </CardActionArea>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </>
    );
};

export default PersonFilmography;
