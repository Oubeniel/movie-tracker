"use client"
import CardCarouselMovie from "@/components/CardCarouselMovie"
import { Movie, MovieChart, MoviePage } from "@/models/movie"
import { formatDate } from "@/utils/utils"
import Image from "next/image"
import { useState } from "react"
import { Col, Container, Row } from "react-bootstrap"
import placeholder from "@/images/no-image-placeholder.jpg"
import { LineChart } from '@mui/x-charts/LineChart';
import * as React from 'react';
import tooltipStyles from "@/styles/CustomTooltip.module.css"
import imdb from "@/images/imdb-logo.png"
import movieStyles from "@/styles/singularMoviePage.module.css"
interface MoviePageProps {
    movie: Movie,
    directorMovieList: MoviePage,
    movieChartData: MovieChart[]
}

const SingularMoviePage = ({ movie, directorMovieList, movieChartData }: MoviePageProps) => {
    const [imgSrc, setImgSrc] = useState(movie.poster);

    const handleImageError = () => {
        setImgSrc(placeholder.src);
    };
    const movieChartDataMerged = movieChartData
        .map((movie) => ({
            year: movie.year,
            rating: movie.imdb.rating,
            title: movie.title
        }))
        .sort((a, b) => a.year - b.year);

    const AxisContent = (props) => {
        return (
            <div className={tooltipStyles.tooltip}>
                {/* @ts-ignore */}
                <Image
                    src={imdb}
                    alt="imdb logo"
                    width={20}
                    height={20}
                />
                <span className={tooltipStyles.tooltipTitle}>
                    {props.series[0].data[props.axisData.x.index]}
                </span>
                <br />
                {/* @ts-ignore */}
                <span>{movieChartDataMerged[props.axisData.x.index].title}</span>
            </div>
        );
    };

    return (
        <>
            <Container className="mb-4">
                <Row xs={1} sm={1} md={1} lg={2}>
                    <Col xs={4}>
                        <Image
                            src={imgSrc}
                            alt="Movie Poster"
                            width={375}
                            height={500}
                            onError={handleImageError}
                            className={movieStyles.singularMovieImage}
                        />
                    </Col>
                    <Col>
                        <h1 style={{ color: '#00ADB5' }}>{movie.title}</h1>
                        <p>{movie.fullplot}</p>
                        <p><strong>Released: </strong>{movie.released ? formatDate(movie.released) : 'N/A'}</p>
                        <p><strong>Genres: </strong>{movie.genres.length > 0 ? movie.genres.join(', ') : 'N/A'}</p>
                        <p><strong>Cast: </strong>{movie.cast.length > 0 ? movie.cast.join(', ') : 'N/A'}</p>
                        <p><strong>Director/s: </strong>{movie.directors.length > 0 ? movie.directors.join(', ') : 'N/A'}</p>
                        <p><strong>IMDB rating: </strong>{movie.imdb ? movie.imdb.rating : 'N/A'}</p>
                        <p><strong>Tomatoe critics rating: </strong>{movie.tomatoes?.critic?.rating ?? 'N/A'}</p>
                        <p><strong>Tomatoe viewer rating: </strong>{movie.tomatoes?.viewer?.rating ?? 'N/A'}</p>
                        <p><strong>Awards: </strong>{movie.awards ? movie.awards.text : 'N/A'}</p>
                    </Col>
                </Row>
            </Container>
            <h5>More from {movie.directors[0]}:</h5>
            <CardCarouselMovie moviesItem={directorMovieList} movieID={movie._id} />
            {movieChartDataMerged && movieChartDataMerged.length > 1 &&
                <>
                    <h5>Ratings over time: </h5>
                    <LineChart
                        sx={{
                            '& .MuiChartsAxis-root .MuiChartsAxis-tickLabel': {
                                fill: '#00ADB5',
                            },
                            '& .css-195sd4n-MuiChartsGrid-line': {
                                stroke: '#3d3d3d',
                            },
                        }}
                        xAxis={[{ dataKey: 'year', valueFormatter: (value) => value.toString() }]}
                        series={[
                            {
                                dataKey: 'rating',
                            },
                        ]}
                        slots={{
                            axisContent: AxisContent
                        }}
                        dataset={movieChartDataMerged}
                        height={500}
                        grid={{ vertical: true, horizontal: true }}
                    />
                </>
            }
        </>
    )
}

export default SingularMoviePage