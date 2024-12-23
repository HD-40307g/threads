'use server'

import { revalidatePath } from "next/cache";
import { connectToDB } from "../mongoose";
import Thread from '../models/thread.model';
import User from "../models/user.models";

interface Params {
    text: string,
    author: string,
    communityId: string,
    path: string,
}

export async function createThread({ text, author, communityId, path }: Params) {
    try {
        connectToDB();
        const createThread = await Thread.create({
            text,
            author,
            community: null,
        });
        // Update user model
        await User.findByIdAndUpdate(author, {
            $push: { threads: createThread._id }
        })

        revalidatePath(path);
    } catch(error: any) {
        throw new Error(`Error creating thread: ${error.message}`)
    }
}