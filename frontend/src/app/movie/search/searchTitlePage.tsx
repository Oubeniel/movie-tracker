"use client"
import FormInputField from "@/components/form/FormInputField";
import LoadingButton from "@/components/LoadingButton";
import * as MovieApi from "@/network/api/movies";
import React, { useState } from "react";
import { Form } from "react-bootstrap";
import { useForm } from "react-hook-form"
import MovieCardGrid from "@/components/MovieCardGrid";

interface searchMovieFormData {
    title: string
}

const MovieInfoSection = () => {
    const [movies, setMovies] = useState<[]>();

    async function onSubmit({ title }: searchMovieFormData) {
        try {
            const results = await MovieApi.searchMovie(title);
            setMovies(results);

        } catch (error) {
            console.error(error);
        }
    };

    const { register, handleSubmit, formState: { isSubmitting } } = useForm<searchMovieFormData>();

    return (
        <div>
            <Form onSubmit={handleSubmit(onSubmit)}>
                <FormInputField
                    register={register("title", { required: true })}
                    placeholder="Search for a movie..."
                    maxLength={100} />
                <LoadingButton type='submit' isLoading={isSubmitting}>Search</LoadingButton>
            </Form>
            <div>
                {movies && movies.length > 0 && <MovieCardGrid movies={movies}/>}
            </div>
        </div>
    )
}

export default MovieInfoSection;