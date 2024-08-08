"use client"
import { Movie } from "@/models/movie"
import Image from "next/image"
import Link from "next/link";
import { Card } from 'react-bootstrap';
import placeholder from "@/images/no-image-placeholder.jpg"
import imdb from "@/images/imdb-logo.png"
import critic_tomato from "@/images/tomato-logo.png"
import viewer_tomato from "@/images/tomato-viewer-logo.png"
import { useState } from "react";
import MovieInfoToolTip from "./MovieInfoToolTip";

interface MovieCardEntryProps {
    movie: Movie,
    className?: string
}

const MovieCardEntry = ({movie, className}: MovieCardEntryProps) => {
    const [imgSrc, setImgSrc] = useState(movie.poster);

    const handleImageError = () => {
        setImgSrc(placeholder.src);
    };

    return (
        <div>
            <Card className={className}>
                <article>
                    <Link href={`/movie/${movie._id}`}>
                        <Image 
                        src={imgSrc}
                        alt="Movie Poster"
                        width={200}
                        height={300}
                        className='card-img-top object-fit-cover'
                        onError={handleImageError}
                        />
                    </Link>
                    <Card.Body>
                        <Card.Title>
                            <Link href={`/movie/${movie._id}`}><MovieInfoToolTip movie={movie}/></Link>
                        </Card.Title>
                        <div className="d-flex justify-content-between">
                        <Card.Text><Image 
                        src={imdb}
                        alt="IMDB logo"
                        width={30}
                        height={30}
                        /> {movie.imdb.rating}</Card.Text>
                        <Card.Text>
                        <Image 
                        src={critic_tomato}
                        alt="Rotten tomatoes logo"
                        width={30}
                        height={30}
                        /> {!movie.tomatoes?.critic || movie.tomatoes.critic.rating === 0 ? "N/A" : movie.tomatoes.critic.rating}</Card.Text>
                        <Card.Text><Image 
                        src={viewer_tomato}
                        alt="Rotten tomatoes logo"
                        width={30}
                        height={30}
                        /> {!movie.tomatoes?.viewer || movie.tomatoes.viewer.rating === 0 ? "N/A" : movie.tomatoes.viewer.rating}</Card.Text>
                        </div>
                        <Card.Text>{movie.plot ?? <span><strong>No description</strong></span>}</Card.Text>
                    </Card.Body>
                </article>
            </Card>
        </div>
    )
}
export default MovieCardEntry