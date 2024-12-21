'use server'

import User from '../models/user.models';
import { connectToDB } from '../mongoose';

export async function updateUser(
    userId: string,
    username: string,
    name: string,
    bio: string,
    image: string,
    path: string,
): Promise<void> {
    connectToDB(); 

try {
    await User.findOneAndUpdate(
        { id: userId },
        {username: username.toLowerCase(),
        name,
        bio,
        image,
        onboarded: true, 
        },
        {upsert: true},
    );

    if(path === '/profile/edit') {
        revalidatePath(path);
    }
    } catch (error: any) {
        throw new Error(`Failed to create/update user: ${error.message}`)
    }
}