"use server";
import { db } from '/lib/db'
import { hash } from "bcryptjs";

const signup = async (FormData) => {
    try {
        const name = FormData.get("name");
        const email = FormData.get("email");
        const password = FormData.get("password");

        if (!email || !name || !password) {
            return { error: "Please provide all fields" };
        }

        const user = await db.user.findUnique({
            where: { email },
        });

        if (user) return { error: "User already exists" };

        const hashedPassword = await hash(password, 10);
        await db.user.create({
            data: {
                name,
                email,
                password: hashedPassword,
            },
        });

        return { success: true };
    } catch (error) {
        console.error(error);
        return { error: "An unexpected error occurred" };
    }
};

export default signup;