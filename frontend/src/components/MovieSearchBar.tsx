"use client"
import FormInputField from "@/components/form/FormInputField";
import LoadingButton from "@/components/LoadingButton";
import * as MovieApi from "@/network/api/movies";
import React, { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import { useForm } from "react-hook-form"
import MovieCardGrid from "@/components/MovieCardGrid";
import SearchInputField from "./SearchInputField";
import { useRouter } from "next/navigation";

interface searchMovieFormData {
    page: number
}

const MovieSearchBar = ({page}: searchMovieFormData) => {

    const [query, setQuery] = useState("");

    const router = useRouter();


    useEffect(() => {
        const timeoutId = setTimeout(async () => {
            if(query) router.push(`/movie/search?page=${page}&search=${query}`);
        }, 500);
        return () => clearTimeout(timeoutId);
    }, [query]);

    return (
        <div>
            <SearchInputField 
            placeholder="Search for a movie..."
            query={query}
            setQuery={setQuery}
            />
        </div>
    )
}

export default MovieSearchBar;