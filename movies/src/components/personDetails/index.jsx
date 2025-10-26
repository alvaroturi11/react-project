import React, { useState } from "react";
import Drawer from "@mui/material/Drawer";
import Chip from "@mui/material/Chip";
import Paper from "@mui/material/Paper";
import StarRate from "@mui/icons-material/StarRate";
import NavigationIcon from "@mui/icons-material/Navigation";
import Fab from "@mui/material/Fab";
import Typography from "@mui/material/Typography";
import CakeIcon from "@mui/icons-material/Cake";
import PlaceIcon from "@mui/icons-material/Place";
import WorkIcon from "@mui/icons-material/Work";
import BadgeIcon from "@mui/icons-material/Badge";
import Grid from "@mui/material/Grid";
import { Link } from "react-router";

const root = {
    display: "flex",
    justifyContent: "center",
    flexWrap: "wrap",
    listStyle: "none",
    padding: 1.5,
    margin: 0,
};
const chip = { margin: 0.5 };

const PersonDetails = ({ person, credits }) => {
    const [drawerOpen, setDrawerOpen] = useState(false);

    const castMovies = (credits?.cast || []).sort(
        (a, b) => (b.popularity ?? 0) - (a.popularity ?? 0)
    );

    return (
        <>
            <Typography variant="h5" component="h3">
                Biography
            </Typography>

            <Typography variant="h6" component="p">
                {person.biography || "No biography available."}
            </Typography>

            <Paper component="ul" sx={{ ...root }}>
                {person.known_for_department && (
                    <Chip icon={<WorkIcon />} label={`Dept: ${person.known_for_department}`} sx={{ ...chip }} />
                )}
                {person.popularity != null && (
                    <Chip icon={<StarRate />} label={`Popularity: ${person.popularity.toFixed(1)}`} sx={{ ...chip }} />
                )}
                {person.birthday && (
                    <Chip icon={<CakeIcon />} label={`Born: ${person.birthday}`} sx={{ ...chip }} />
                )}
                {person.place_of_birth && (
                    <Chip icon={<PlaceIcon />} label={person.place_of_birth} sx={{ ...chip }} />
                )}
            </Paper>

            {/* “Filmography” button */}
            <Fab
                color="secondary"
                variant="extended"
                onClick={() => setDrawerOpen(true)}
                sx={{
                    position: "fixed",
                    bottom: "1em",
                    right: "1em",
                }}
            >
                <NavigationIcon />
                Filmography
            </Fab>

            <Drawer anchor="top" open={drawerOpen} onClose={() => setDrawerOpen(false)}>
                <div style={{ padding: 24 }}>
                    <Typography variant="h5" component="h3" sx={{ mb: 2 }}>
                        Filmography
                    </Typography>

                    <Grid container spacing={2}>
                        {castMovies.length === 0 && (
                            <Typography variant="body1">No movies found.</Typography>
                        )}
                        {castMovies.map((m) => (
                            <Grid item key={m.id} xs={6} sm={4} md={3} lg={2}>
                                <Link to={`/movies/${m.id}`} style={{ textDecoration: "none" }}>
                                    <img
                                        src={
                                            m.poster_path
                                                ? `https://image.tmdb.org/t/p/w300${m.poster_path}`
                                                : "https://via.placeholder.com/300x450?text=No+Image"
                                        }
                                        alt={m.title}
                                        style={{ width: "100%", borderRadius: 8 }}
                                    />
                                    <Typography variant="subtitle2" align="center" sx={{ mt: 0.5 }}>
                                        {m.title} {m.character ? `as ${m.character}` : ""}
                                    </Typography>
                                </Link>
                            </Grid>
                        ))}
                    </Grid>
                </div>
            </Drawer>
        </>
    );
};

export default PersonDetails;
