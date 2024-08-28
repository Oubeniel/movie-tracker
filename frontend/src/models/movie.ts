export interface Movie {
    _id: string,
    title: string,
    year: number,
    released: string,
    directors: [string],
    cast: [string],
    genres: [string],
    plot: string,
    fullplot: string,
    poster: string
    imdb: {
        rating: number
    },
    tomatoes: {
        critic: {
            rating: number
        },
        viewer: {
            rating: number
        }
    },
    awards: {
        wins: number,
        nominations: number,
        text: string
    }
}

export interface MoviePage {
    movies: Movie[],
    page: number,
    totalPages: number
}

export interface MovieChart {
    year: number,
    imdb: {
        rating: number
    },
    title: string
}