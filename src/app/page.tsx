import { db } from "~/server/db";
import { SignedIn, SignedOut } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";

export const dynamic = "force-dynamic";

async function Cards() {
  // Fetch videos instead of images
  const videos = await db.query.images.findMany({
    orderBy: (model, { desc }) => desc(model.id),
  });

  return (
    <div className="grid grid-cols-3 gap-4">
      {videos.slice(0, 3).map((video) => (  // Limit to 3 videos
        <div key={video.id} className="p-4 bg-white border rounded-md shadow-md">
          <div className="flex items-center space-x-4">
            {/* Use <video> tag for video files */}
            <video controls className="w-24 h-24 object-cover rounded-md">
              <source src={video.url} type="video/mp4" /> {/* Assuming the videos are MP4 */}
              Your browser does not support the video tag.
            </video>
            <div>
              <div className="text-lg font-semibold">{video.name}</div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

async function Videos() {
  const user = await auth();
  console.log("User ID:", user.userId); // Log the userId
  if (!user.userId) throw new Error("Unauthorized");

  // Fetch videos specific to the logged-in user
  const videos = await db.query.images.findMany({
    where: (model) => eq(model.userId, String(user.userId)),
    orderBy: (model, { desc }) => desc(model.id),
  });

  // Define an array of texts to display in each grid
  const gridTexts = [
    
    "Food is love, and love is food",
    "Life is too short to eat boring food",
    "Food is the ultimate therapy",
  ];

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="grid grid-cols-1 gap-6">
        {videos.slice(0, 3).map((video, index) => (  // Limit to 3 videos
          <div key={video.id} className="p-6 w-80 h-96 bg-white border rounded-md shadow-md">  {/* Increased width and height */}
            <div className="flex flex-col items-center space-y-4">
              {/* Use <video> tag for video files */}
              <video controls className="w-48 h-48 object-cover rounded-md">
                <source src={video.url} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
              <div className="text-sm font-semibold text-center">{video.name}</div>  {/* Larger text */}
              <div>{gridTexts[index]}</div>  {/* Display different text for each grid */}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default async function HomePage() {
  return (
    <main className="p-6">
      <SignedOut>
        <div className="h-full w-full text-2xl text-center font-fancy">Please Sign to Upload Your Video.</div>
      </SignedOut>
      <SignedIn>
        <Videos /> {/* Display the video cards instead of images */}
      </SignedIn>
    </main>
  );
}