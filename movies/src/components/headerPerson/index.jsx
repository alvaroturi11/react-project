import React from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import HomeIcon from "@mui/icons-material/Home";
import { useNavigate } from "react-router";

const PersonHeader = (props) => {
    const person = props.person;
    const navigate = useNavigate();

    return (
        <Paper
            component="div"
            sx={{
                display: "flex",
                justifyContent: "space-around",
                flexWrap: "wrap",
                padding: 1.5,
                margin: 0,
            }}
        >
            <IconButton aria-label="go back" onClick={() => navigate(-1)}>
                <ArrowBackIcon color="primary" fontSize="large" />
            </IconButton>

            <Typography variant="h4" component="h3">
                {person.name}
                {person.homepage && (
                    <a href={person.homepage} target="_blank" rel="noreferrer">
                        <HomeIcon color="primary" />
                    </a>
                )}
                <br />
                {person.known_for_department && (
                    <span sx={{ fontSize: "1.5rem" }}>{`   ${person.known_for_department}`}</span>
                )}
            </Typography>

            <IconButton aria-label="go forward" onClick={() => navigate(+1)}>
                <ArrowForwardIcon color="primary" fontSize="large" />
            </IconButton>
        </Paper>
    );
};

export default PersonHeader;
