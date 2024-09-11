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
import styles from "@/styles/MovieCardEntry.module.css"
import BookmarkAddIcon from '@mui/icons-material/BookmarkAdd';
import BookmarkAddedIcon from '@mui/icons-material/BookmarkAdded';
import { User } from "@/models/user";
import * as UsersApi from "@/network/api/users";
import { favoriteMoviesActions } from "@/store/slices/favoriteMoviesSlice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";

interface MovieCardEntryProps {
    movie: Movie,
    className?: string,
}

const MovieCardEntry = ({ movie, className }: MovieCardEntryProps) => {
    const favorites = useAppSelector(state => state.favoriteMovies.favorites);
    const dispatch = useAppDispatch();
    const [imgSrc, setImgSrc] = useState(movie.poster);
    const [isExpanded, setIsExpanded] = useState(false);

    const handleImageError = () => {
        setImgSrc(placeholder.src);
    };

    const toggleExpand = () => {
        setIsExpanded(!isExpanded);
    };

    const toggleFavorite = () => {
        let tempFavorites = [...favorites];
        if (tempFavorites?.includes(movie._id)) {
            tempFavorites = tempFavorites.filter((id) => id !== movie._id);
        } else if (tempFavorites) {
            tempFavorites.push(movie._id);
        }
        dispatch(favoriteMoviesActions.setFavoriteMovies(tempFavorites));

        UsersApi.updateUser({ favoriteMovies: tempFavorites });
    }

    return (
        <div>
            <Card className={className}>
                <article>
                    <div className={styles.iconContainer}>
                        {favorites.includes(movie._id) ? <BookmarkAddedIcon className={styles.favoriteIcon} sx={{ color: 'yellow' }} onClick={toggleFavorite} /> : <BookmarkAddIcon className={styles.notFavoriteIcon} onClick={toggleFavorite} />}
                        <Image
                            src={imgSrc}
                            alt="Movie Poster"
                            width={200}
                            height={300}
                            className='card-img-top object-fit-cover'
                            onError={handleImageError}
                        />
                    </div>
                    <Card.Body>
                        <Card.Title
                            className={isExpanded ? '' : styles.expandableTitle}
                        >
                            <Link href={`/movie/${movie._id}`}><MovieInfoToolTip movie={movie} /></Link>
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
                        <Card.Text
                            className={isExpanded ? '' : styles.expandableText}
                        >{movie.plot ?? <span><strong>No description</strong></span>}</Card.Text>
                        <Card.Footer>
                            <button onClick={toggleExpand} className="btn btn-link">
                                {isExpanded ? "Show Less" : "Read More"}
                            </button>
                        </Card.Footer>
                    </Card.Body>
                </article>
            </Card>
        </div>
    )
}
export default MovieCardEntry