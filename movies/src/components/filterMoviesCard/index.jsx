//import React, { useState, useEffect } from "react";
import React from "react";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import SearchIcon from "@mui/icons-material/Search";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import img from '../../images/pexels-dziana-hasanbekava-5480827.jpg'
import { getGenres } from "../../api/tmdb-api";
import { useQuery } from '@tanstack/react-query';
import Spinner from '../spinner';
import Slider from "@mui/material/Slider";

const formControl =
{
    margin: 1,
    minWidth: "90%",
    backgroundColor: "rgb(255, 255, 255)"
};

export default function FilterMoviesCard(props) {
    const { data, error, isPending, isError } = useQuery({
        queryKey: ['genres'],
        queryFn: getGenres,
    });

    if (isPending) {
        return <Spinner />;
    }

    if (isError) {
        return <h1>{error.message}</h1>;
    }
    const genres = data.genres;
    if (genres[0].name !== "All") {
        genres.unshift({ id: "0", name: "All" });
    }

    const handleChange = (e, type, value) => {
        e.preventDefault();
        props.onUserInput(type, value);
    };

    const handleTextChange = (e, props) => {
        handleChange(e, "name", e.target.value);
    };

    const handleGenreChange = (e) => {
        handleChange(e, "genre", e.target.value);
    };

    const handleRatingChange = (e, newValue) => {
        props.onUserInput("rating", newValue);
    };

    const handleLanguageChange = (e) => {
        handleChange(e, "language", e.target.value);
    };

    const handleSortChange = (e) => {
        handleChange(e, "sort", e.target.value);
    };

    return (
        <Card
            sx={{
                backgroundColor: "rgb(204, 204, 0)"
            }}
            variant="outlined">
            <CardContent>
                <Typography variant="h5" component="h1">
                    <SearchIcon fontSize="large" />
                    Filter the movies.
                </Typography>
                <TextField
                    sx={{ ...formControl }}
                    id="filled-search"
                    label="Search field"
                    type="search"
                    variant="filled"
                    value={props.titleFilter}
                    onChange={handleTextChange}
                />

                <FormControl sx={{ ...formControl }}>
                    <InputLabel id="genre-label">Genre</InputLabel>
                    <Select
                        labelId="genre-label"
                        id="genre-select"
                        defaultValue=""
                        value={props.genreFilter}
                        onChange={handleGenreChange}
                    >

                        {genres.map((genre) => {
                            return (
                                <MenuItem key={genre.id} value={genre.id}>
                                    {genre.name}
                                </MenuItem>
                            );
                        })}
                    </Select>
                </FormControl>

                <Typography sx={{ mt: 2 }} gutterBottom>
                    Minimum Rating: {props.ratingFilter ?? 0}
                </Typography>
                <Slider
                    value={props.ratingFilter ?? 0}
                    onChange={handleRatingChange}
                    step={0.5}
                    min={0}
                    max={10}
                    valueLabelDisplay="auto"
                    sx={{ width: "90%", ml: 1 }}
                />

                <FormControl sx={{ ...formControl, mt: 2 }}>
                    <InputLabel id="language-label">Language</InputLabel>
                    <Select
                        labelId="language-label"
                        id="language-select"
                        value={props.languageFilter}
                        onChange={handleLanguageChange}
                    >
                        <MenuItem value="All">All</MenuItem>
                        <MenuItem value="en">English</MenuItem>
                        <MenuItem value="es">Spanish</MenuItem>
                        <MenuItem value="fr">French</MenuItem>
                        <MenuItem value="de">German</MenuItem>
                        <MenuItem value="it">Italian</MenuItem>
                        <MenuItem value="ja">Japanese</MenuItem>
                        <MenuItem value="ko">Korean</MenuItem>
                        <MenuItem value="zh">Chinese</MenuItem>
                    </Select>
                </FormControl>

                <FormControl sx={{ ...formControl, mt: 2 }}>
                    <InputLabel id="sort-label">Sort by</InputLabel>
                    <Select
                        labelId="sort-label"
                        id="sort-select"
                        value={props.sortOrderFilter ?? "none"}
                        onChange={handleSortChange}
                    >
                        <MenuItem value="none">None</MenuItem>
                        <MenuItem value="date_desc">Release date: New → Old</MenuItem>
                        <MenuItem value="date_asc">Release date: Old → New</MenuItem>
                        <MenuItem value="rating_desc">Rating: High → Low</MenuItem>
                        <MenuItem value="rating_asc">Rating: Low → High</MenuItem>
                        <MenuItem value="title_asc">Title: A → Z</MenuItem>
                        <MenuItem value="title_desc">Title: Z → A</MenuItem>
                    </Select>
                </FormControl>
            </CardContent>
            <CardMedia
                sx={{ height: 300 }}
                image={img}
                title="Filter"
            />
            <CardContent>
                <Typography variant="h5" component="h1">
                    <SearchIcon fontSize="large" />
                    Filter the movies.
                    <br />
                </Typography>
            </CardContent>
        </Card>
    );
}
