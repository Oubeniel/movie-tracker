"use client";

import PaginationBar from "@/components/PaginationBar";
import { useRouter } from "next/navigation";

interface MoviePaginationBarProps {
    currentPage: number,
    totalPages: number,
}

export default function MovieListPaginationBar({ currentPage, totalPages }: MoviePaginationBarProps) {
    const router = useRouter();

    return (
        <PaginationBar
            currentPage={currentPage}
            pageCount={totalPages}
            onPageItemClicked={(page) => {
                router.push("/movie?page=" + page);
            }}
            className="d-flex justify-content-center mt-4"
        />
    );
}