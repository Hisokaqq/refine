import {Lucia, TimeSpan} from "lucia"
import { PrismaAdapter } from "@lucia-auth/adapter-prisma";
import { cookies } from "next/headers";
import prisma from "@/utils/prisma";

const adapter = new PrismaAdapter(prisma.session, prisma.user);
export const lucia = new Lucia(adapter, {
    sessionExpiresIn: new TimeSpan(2, "w"),
    sessionCookie: {
        name: "refine-session",
        expires: true,
        attributes: {
            secure: process.env.NODE_ENV === "production",
        }
    }
});

export const getUser = async () => {
    const sessionId = cookies().get(lucia.sessionCookieName)?.value;
    if (!sessionId) return null;
    const { session, user} = await lucia.validateSession(sessionId);
    try{
        if (session && session.fresh){
            const sessionCookie = lucia.createSessionCookie(session.id);
            cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);
        }
        if (!session){
            const sessionCookie = lucia.createBlankSessionCookie();
            cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);
        }

    }catch(err){
        return null;
    }
    const DBuser = await prisma.user.findUnique({
        where: {
            id: user?.id 
        },
        select: {
            id: true,
            name: true,
            email: true,
            pictureUrl: true
        }
    });
    return DBuser;
};