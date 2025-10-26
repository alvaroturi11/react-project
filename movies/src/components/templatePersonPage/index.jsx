import React from "react";
import PersonHeader from "../headerPerson";
import Grid from "@mui/material/Grid";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import Spinner from "../spinner";
import { useQuery } from "@tanstack/react-query";
import { getPersonImages } from "../../api/tmdb-api";

const TemplatePersonPage = ({ person, children }) => {
  const { data, error, isPending, isError } = useQuery({
    queryKey: ["person-images", { id: person.id }],
    queryFn: getPersonImages,
  });

  if (isPending) {
    return <Spinner />;
  }

  if (isError) {
    return <h1>{error.message}</h1>;
  }

  //const images = data.profiles
  const images = data?.profiles?.length ? data.profiles : [{ file_path: person.profile_path }];

  return (
    <>
      <PersonHeader person={person} />

      <Grid container spacing={5} style={{ padding: "15px" }}>
        <Grid size={{ xs: 3 }}>
          <div
            sx={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "space-around",
            }}
          >
            <ImageList
              sx={{
                height: "100vh",
              }}
              cols={1}
            >
              {images.map((image) => (
                <ImageListItem key={image.file_path} cols={1}>
                  <img
                    src={
                      image.file_path
                        ? `https://image.tmdb.org/t/p/w500/${image.file_path}`
                        : "https://via.placeholder.com/500x750?text=No+Image"
                    }
                    alt={person.name}
                  />
                </ImageListItem>
              ))}
            </ImageList>
          </div>
        </Grid>

        <Grid size={{ xs: 9 }}>{children}</Grid>
      </Grid>
    </>
  );
};

export default TemplatePersonPage;
