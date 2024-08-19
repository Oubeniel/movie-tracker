"use client"
import React, { useEffect, useState } from "react";
import SearchInputField from "./SearchInputField";
import { useRouter } from "next/navigation";
import { Dropdown } from "react-bootstrap";

const MovieSearchBar = () => {

    const [query, setQuery] = useState<string>();

    const [pageSize, setPageSize] = useState<number>();

    const [filterType, setFilterType] = useState("title");

    const router = useRouter();

    useEffect(() => {


        const timeoutId = setTimeout(async () => {
            if (query) {
                if (pageSize) { router.push(`/movie/search?page=1&search=${query}&filter=${filterType}&pageSize=${pageSize}`); }
                else { router.push(`/movie/search?page=1&search=${query}&filter=${filterType}`); }
            }
        }, 500);
        return () => clearTimeout(timeoutId);
    }, [query]);

    useEffect(() => {
        const timeoutId = setTimeout(async () => {
            if (pageSize) {
                if (query) { router.push(`/movie/search?page=1&search=${query}&filter=${filterType}&pageSize=${pageSize}`); }
                else { router.push(`/movie/search?page=1&pageSize=${pageSize}`); }
            }
        }, 500);
        return () => clearTimeout(timeoutId);
    }, [pageSize]);

    return (
        <div>
            <div className="float-end">
                <Dropdown>
                    <Dropdown.Toggle variant="secondary">Page size</Dropdown.Toggle>

                    <Dropdown.Menu>
                        <Dropdown.Item onClick={() => setPageSize(12)}>12</Dropdown.Item>
                        <Dropdown.Item onClick={() => setPageSize(24)}>24</Dropdown.Item>
                        <Dropdown.Item onClick={() => setPageSize(36)}>36</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
            </div>
            <SearchInputField
                placeholder="Search for a movie..."
                query={query}
                filter={filterType}
                setQuery={setQuery}
                setFilterType={setFilterType}
            />
        </div>
    )
}

export default MovieSearchBar;