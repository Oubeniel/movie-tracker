export interface User {
    _id: string,
    username?: string,
    email?: string,
    displayName?: string,
    about?: string,
    profilePictureUrl?: string,
    createdAt: string,
    favoriteMovies?: string[]
} //dont need password or other social ids because it only matters to the backend