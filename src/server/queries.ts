import "server-only";
import { auth } from "@clerk/nextjs/server";
import { db } from "./db";
import { eq } from "drizzle-orm";
export async function getMyVideos() {
    const user = await auth();
  console.log("User ID:", user.userId); // Log the userId
  if (!user.userId) throw new Error("Unauthorized");

  // Fetch videos specific to the logged-in user
  const videos = await db.query.images.findMany({
    where: (model) => eq(model.userId, String(user.userId)),
    orderBy: (model, { desc }) => desc(model.id),
  });

  return videos;
}