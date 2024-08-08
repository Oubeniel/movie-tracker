"use client"
import React, { useEffect, useState } from "react";
import SearchInputField from "./SearchInputField";
import { useRouter } from "next/navigation";

const MovieSearchBar = () => {

    const [query, setQuery] = useState("");

    const [filterType, setFilterType] = useState("title");

    const router = useRouter();

    useEffect(() => {
        
        
        const timeoutId = setTimeout(async () => {
            if(query) router.push(`/movie/search?page=1&search=${query}&filter=${filterType}`);
        }, 500);
        return () => clearTimeout(timeoutId);
    }, [query]);

    return (
        <div>
            <SearchInputField 
            placeholder="Search for a movie..."
            query={query}
            setQuery={setQuery}
            setFilterType={setFilterType}
            filter={filterType}
            />
        </div>
    )
}

export default MovieSearchBar;