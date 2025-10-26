import React from "react";
import { useParams } from "react-router";
import PersonDetails from "../components/personDetails";
import PageTemplate from "../components/templatePersonPage";
import { getPerson, getPersonMovieCredits } from "../api/tmdb-api";
import { useQuery } from "@tanstack/react-query";
import Spinner from "../components/spinner";

const PersonDetailsPage = () => {
    const { id } = useParams();
    const { data: person, error, isPending, isError } = useQuery({
        queryKey: ["person", { id }],
        queryFn: getPerson,
    });

    const { data: credits, error: creditsError, isPending: creditsPending, isError: creditsIsError } = useQuery({
        queryKey: ["person-movie-credits", { id }],
        queryFn: getPersonMovieCredits,
    });

    if (isPending || creditsPending) {
        return <Spinner />;
    }

    if (isError) {
        return <h1>{error.message}</h1>;
    }
    if (creditsIsError) {
        return <h1>{creditsError.message}</h1>;
    }

    return (
        <>
            {person ? (
                <>
                    <PageTemplate person={person}>
                        <PersonDetails person={person} credits={credits} />
                    </PageTemplate>
                </>
            ) : (
                <p>Waiting for person details</p>
            )}
        </>
    );
};

export default PersonDetailsPage;
