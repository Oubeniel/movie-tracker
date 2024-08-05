import { InferSchemaType, model, Schema } from "mongoose";

const movieSchema = new Schema({
    title: { type: String, required: true },
    year: { type: Number, required: true },
    plot: { type: String, required: true },
});

type MovieItem = InferSchemaType<typeof movieSchema>;

export default model<MovieItem>("movie", movieSchema)