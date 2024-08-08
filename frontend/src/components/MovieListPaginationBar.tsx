"use client";

import PaginationBar from "@/components/PaginationBar";
import { useRouter } from "next/navigation";

interface MoviePaginationBarProps {
    currentPage: number,
    totalPages: number,
    search?: string
    filter?: string
}

export default function MovieListPaginationBar({ currentPage, totalPages, search, filter }: MoviePaginationBarProps) {
    const router = useRouter();

    return (
        <PaginationBar
            currentPage={currentPage}
            pageCount={totalPages}
            onPageItemClicked={(page) => {
                let url = "";
                if (search) { url = `/movie/search?page=${page}&search=${search}&filter=${filter}` }
                else { url = "/movie?page=" + page };
                router.push(url);
            }}
            className="d-flex justify-content-center mt-4"
        />
    );
}
