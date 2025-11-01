//import React, { useState, useEffect } from "react";
import React from "react";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import SearchIcon from "@mui/icons-material/Search";
import img from "../../images/pexels-dziana-hasanbekava-5480827.jpg";

const formControl = {
    margin: 1,
    minWidth: "90%",
    backgroundColor: "rgb(255, 255, 255)",
};

export default function FilterPeopleCard(props) {
    const handleTextChange = (e) => {
        e.preventDefault();
        props.onUserInput("name", e.target.value);
    };

    return (
        <Card
            elevation={0}
            sx={{
                bgcolor: "#ffffff",
                borderRadius: 3,
                boxShadow: "0 8px 24px rgba(0,0,0,0.08)",
                border: "1px solid",
                borderColor: "divider",
            }}
        >
            <CardContent>
                <Typography variant="h5" component="h1" sx={{ fontWeight: 700 }}>
                    <SearchIcon fontSize="medium" sx={{ color: "text.primary" }} />
                    Filter the people.
                </Typography>

                <TextField
                    sx={{ ...formControl }}
                    id="filled-search"
                    label="Search field"
                    type="search"
                    variant="filled"
                    value={props.nameFilter}
                    onChange={(e) => props.onUserInput("name", e.target.value)}
                />
            </CardContent>

            <CardMedia sx={{ height: 180 }} image={img} title="Filter" />
        </Card>
    );
}
