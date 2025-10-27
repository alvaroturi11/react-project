import React from "react";
import { useQuery } from "@tanstack/react-query";
import { getMovieCredits } from "../../api/tmdb-api";
import Spinner from "../spinner";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import { Link } from "react-router";

const avatarSx = {
  width: 90,
  height: 120,
  borderRadius: 2,
  mx: "auto",
  mb: 1,
  boxShadow: 1,
};

const MovieCast = ({ movie }) => {
  const { data, error, isPending, isError } = useQuery({
    queryKey: ["credits", { id: movie.id }],
    queryFn: getMovieCredits,
  });

  if (isPending) return <Spinner />;
  if (isError) return <Typography color="error">{error.message}</Typography>;

  const cast = (data?.cast || []).slice(0, 16); // muestra 16 actores (ajustable)

  return (
    <Box sx={{ mt: 2 }}>
      <Typography variant="h5" component="h3" sx={{ mb: 1.5 }}>
        Cast
      </Typography>

      <Grid container spacing={2}>
        {cast.map((p) => (
          <Grid item key={p.id} xs={6} sm={4} md={3} lg={2} xl={2}>
            <Link to={`/person/${p.id}`} style={{ textDecoration: "none", color: "inherit" }}>
              <Avatar
                alt={p.name}
                src={p.profile_path ? `https://image.tmdb.org/t/p/w185${p.profile_path}` : undefined}
                sx={avatarSx}
                variant="rounded"
              />
              <Typography variant="body2" align="center" noWrap>
                {p.name}
              </Typography>
              <Typography variant="caption" align="center" color="text.secondary" noWrap>
                {p.character}
              </Typography>
            </Link>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default MovieCast;
