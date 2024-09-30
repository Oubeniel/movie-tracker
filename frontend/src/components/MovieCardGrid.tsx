"use client"
import { Row, Col } from "react-bootstrap"
import MovieCardEntry from "./MovieCardEntry"
import styles from "@/styles/MovieCardGrid.module.css"
import { Movie } from "@/models/movie"

interface MovieCardGridProps {
    movies: Movie[]
}

export default function MovieCardGrid({ movies }: MovieCardGridProps) {
    return (
        <Row xs={1} sm={2} md={2} lg={4} className="g-4">
            {movies.map((movie) => (
                <Col key={movie._id}>
                    <MovieCardEntry
                        movie={movie}
                        className={styles.entry}
                    />
                </Col>
            ))}

        </Row>
    )
}