"use client"
import CardCarouselMovie from "@/components/CardCarouselMovie"
import { Movie, MoviePage } from "@/models/movie"
import { formatDate } from "@/utils/utils"
import Image from "next/image"
import { useState } from "react"
import { Col, Container, Row } from "react-bootstrap"
import placeholder from "@/images/no-image-placeholder.jpg"

interface MoviePageProps {
    movie: Movie,
    directorMovieList: MoviePage
}

const SingularMoviePage = ({movie, directorMovieList}: MoviePageProps) => {
    const [imgSrc, setImgSrc] = useState(movie.poster);

    const handleImageError = () => {
        setImgSrc(placeholder.src);
    };
    return (
        <>
        <Container className="mb-4">
        <Row>
        <Col xs={4}>
            <Image 
            src={imgSrc}
            alt="Movie Poster"
            width={375}
            height={500}
            onError={handleImageError}
            />
        </Col>
        <Col>
        <h1 style={{color: '#00ADB5'}}>{movie.title}</h1>
        <p>{movie.fullplot}</p>
        <p><strong>Released: </strong>{movie.released ? formatDate(movie.released) : 'N/A'}</p>
        <p><strong>Genres: </strong>{movie.genres.length > 0 ? movie.genres.join(', ') : 'N/A'}</p>
        <p><strong>Cast: </strong>{movie.cast.length > 0 ? movie.cast.join(', ') : 'N/A'}</p>
        <p><strong>Director/s: </strong>{movie.directors.length > 0 ? movie.directors.join(', ') : 'N/A'}</p>
        <p><strong>IMDB rating: </strong>{movie.imdb ? movie.imdb.rating : 'N/A'}</p>
        <p><strong>Tomatoe critics rating: </strong>{movie.tomatoes && movie.tomatoes.critic ? movie.tomatoes.critic.rating : 'N/A'}</p>
        <p><strong>Tomatoe viewer rating: </strong>{movie.tomatoes && movie.tomatoes.viewer ? movie.tomatoes.viewer.rating : 'N/A'}</p>
        <p><strong>Awards: </strong>{movie.awards ? movie.awards.text : 'N/A'}</p>
        </Col>
        </Row>
        </Container>
        <h5>More from {movie.directors[0]}:</h5>
        <CardCarouselMovie moviesItem={directorMovieList} movieID={movie._id}/>
        </>
    )
}

export default SingularMoviePage