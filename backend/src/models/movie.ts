import { InferSchemaType, model, Schema } from "mongoose";

const movieSchema = new Schema({
    title: { type: String, required: true },
    year: { type: Number, required: true },
    plot: { type: String, required: true },
    poster: { type: String },
    imdbRating: { type: Number },
    tomatoesViewerRating: { type: Number },
    tomatoesCriticRating: { type: Number },
});

type MovieItem = InferSchemaType<typeof movieSchema>;

export default model<MovieItem>("movie", movieSchema)