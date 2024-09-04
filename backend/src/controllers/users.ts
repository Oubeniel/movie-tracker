import { RequestHandler } from "express";
import UserModel from "../models/user";
import createHttpError from "http-errors";
import bcrypt from 'bcrypt'
import assertIsDefined from "../utils/assertIsDefined";
import sharp from "sharp";
import env from "../env";
import { SignUpBody, UpdateUserBody } from "../validation/users";

export const getAuthenticatedUser: RequestHandler = async (req, res, next) => {
    const authenticatedUser = req.user;
    try {
        assertIsDefined(authenticatedUser);
        const user = await UserModel.findById(authenticatedUser._id)
            .select("favoriteMovies")
            .exec();
        res.status(200).json(user);
    } catch (error) {
        next(error);
    }
}

export const getUserByUsername: RequestHandler = async (req, res, next) => {
    try {
        const user = await UserModel.findOne({ username: req.params.username }).exec();

        if (!user) {
            throw createHttpError(404, "User not found!")
        }
        res.status(200).json(user);
    } catch (error) {
        next(error);
    }
}

export const signUp: RequestHandler<unknown, unknown, SignUpBody, unknown> = async (req, res, next) => {
    const { username, email, password: passwordRaw } = req.body;

    try {
        const existingUsername = await UserModel.findOne({ username })
            .collation({ locale: 'en', strength: 2 })
            .exec();

        if (existingUsername) {
            throw createHttpError(409, 'Username already taken.');
        }

        const passwordHashed = await bcrypt.hash(passwordRaw, 10);

        const result = await UserModel.create({
            username,
            displayName: username,
            email,
            password: passwordHashed,
        });

        const newUser = result.toObject();

        delete newUser.password; //remove the password so the user info can be sent to frontend

        req.logIn(newUser, error => { // this requires an Express.user, but this works, because it was set up with userid before using passport-user.d.ts, otherwise would not work
            if (error) throw error;
            res.status(201).json(newUser);
        });
    } catch (error) {
        next(error);
    }
}

export const logOut: RequestHandler = (req, res) => {
    req.logout(error => {
        if (error) throw error;
        res.sendStatus(200);
    });
}

export const updateUser: RequestHandler<unknown, unknown, UpdateUserBody, unknown> = async (req, res, next) => {
    const { username, displayName, about, favoriteMovies } = req.body;
    //const profilePicture = req.file;
    const authenticatedUser = req.user;


    try {
        assertIsDefined(authenticatedUser);
        if (username) {
            const existingUsername = await UserModel.findOne({ username })
                .collation({ locale: 'en', strength: 2 })
                .exec();

            if (existingUsername) {
                throw createHttpError(409, 'Username already taken.');
            }
        }
        let profilePictureDestinationPath: string | undefined = undefined;

        /* if (profilePicture) {
            profilePictureDestinationPath = "/uploads/profile-pictures/" + authenticatedUser._id + ".png";

            await sharp(profilePicture.buffer)
                .resize(500, 500, { withoutEnlargement: true })
                .toFile("./" + profilePictureDestinationPath);
        } */
                
        const updatedUser = await UserModel.findByIdAndUpdate(authenticatedUser._id, {
            $set: { //do not replace whole user object with partially filled info, only change the info according to changes provided
                ...(username && { username }), //only if username data exists, then we populate username with new data
                ...(displayName && { displayName }),
                ...(about && { about }),
                ...(favoriteMovies && { favoriteMovies }),
                /* ...(profilePicture && { profilePictureUrl: env.SERVER_URL + profilePictureDestinationPath + "?lastupdated=" + Date.now() }), */
            }
        }, { new: true }).exec();

        res.status(200).json(updatedUser);
    } catch (error) {
        next(error);
    }
}