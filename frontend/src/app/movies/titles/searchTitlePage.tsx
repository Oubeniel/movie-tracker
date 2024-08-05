"use client"
import FormInputField from "@/components/form/FormInputField";
import LoadingButton from "@/components/LoadingButton";
import { Movie } from "@/models/movie";
import * as MovieApi from "@/network/api/movies";
import React, { useState } from "react";
import { Form } from "react-bootstrap";
import { useForm } from "react-hook-form"

interface searchMovieFormData {
    title: string
}

const MovieInfoSection = () => {
    const [titles, setTitles] = useState<[]>();

    async function onSubmit({ title }: searchMovieFormData) {
        console.log("This triggered with title: " + title);

        try {
            const results = await MovieApi.searchMovie(title);
            setTitles(results);

        } catch (error) {
            console.error(error);
        }
    };

    const { register, handleSubmit, formState: { isSubmitting } } = useForm<searchMovieFormData>();

    return (
        <div>
            <Form onSubmit={handleSubmit(onSubmit)}>
                <FormInputField
                    label="Movie Title"
                    register={register("title", { required: true })}
                    placeholder="Search for a movie..."
                    maxLength={100} />
                <LoadingButton type='submit' isLoading={isSubmitting}>Search</LoadingButton>
            </Form>
                {titles?.map(item => (
                    <div key={item._id}>
                        <h3>{item.title}</h3>
                        <p>{item.year}</p>
                        <p>{item.plot}</p>
                    </div>
                ))}
        </div>
    )
}

export default MovieInfoSection;