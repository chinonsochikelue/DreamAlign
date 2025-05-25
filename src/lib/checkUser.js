import { currentUser } from "@clerk/nextjs/server";
import { db } from "./prisma";

export const checkUser = async () => {
  const user = await currentUser();

  if (!user) return null;

  try {
    const email = user.emailAddresses?.[0]?.emailAddress;
    if (!email) throw new Error("User email not found");

    // Try finding by Clerk user ID
    let loggedInUser = await db.user.findUnique({
      where: { clerkUserId: user.id },
    });

    // If not found, try finding by email (user might already exist with this email)
    if (!loggedInUser) {
      loggedInUser = await db.user.findUnique({
        where: { email },
      });

      // Optional: You can also update the `clerkUserId` if needed
      if (loggedInUser) {
        await db.user.update({
          where: { email },
          data: { clerkUserId: user.id },
        });
      }
    }

    // If found by either, return user
    if (loggedInUser) return loggedInUser;

    // Else, create new user
    const name = `${user.firstName ?? ""} ${user.lastName ?? ""}`.trim();

    const newUser = await db.user.create({
      data: {
        clerkUserId: user.id,
        name,
        imageUrl: user.imageUrl,
        email,
      },
    });

    return newUser;
  } catch (error) {
    console.error("Error in checkUser:", error.message);
    return null;
  }
};
