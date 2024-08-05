export interface Movie {
    _id: string,
    title: string,
    year: number,
    released: Date,
    directors: [string],
    cast: [string],
    genres: [string],
    plot: string,
    poster: string
}