import { db } from "~/server/db";
import { SignedIn, SignedOut } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";
import { getMyVideos } from "~/server/queries";

export const dynamic = "force-dynamic";

async function Cards() {
  // Fetch videos instead of images
  const videos = await db.query.images.findMany({
    orderBy: (model, { desc }) => desc(model.id),
  });

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {videos.slice(0, 4).map((video) => (  // Limit to 4 videos
        <div key={video.id} className="p-4 bg-white border rounded-md shadow-lg hover:shadow-xl transition-shadow">
          <div className="flex flex-col items-center space-y-4">
            {/* Video player */}
            <video controls className="w-full h-48 object-cover rounded-md">
              <source src={video.url} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            <div className="text-lg font-semibold text-center">{video.name}</div>
          </div>
        </div>
      ))}
    </div>
  );
}

async function Videos() {
  

  // Define an array of texts to display in each grid
  const gridTexts = [
    "Food is love, and love is food",
    "Life is too short to eat boring food",
    "Food is the ultimate therapy",
    "Cooking is like love. It should be entered into with abandon or not at all",
    "Food is the ingredient that binds us together.",
    "Let food be thy medicine and medicine be thy food.",

  ];

  const videos = await getMyVideos();

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {videos.slice(0, 10).map((video, index) => (  
          <div key={video.id} className="p-6 w-full h-96 bg-white border rounded-md shadow-lg hover:shadow-xl transition-shadow">
            <div className="flex flex-col items-center space-y-4">
              {/* Video player */}
              <video controls className="w-full h-48 object-cover rounded-md">
                <source src={video.url} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
              <div className="text-sm font-semibold text-center">{video.name}</div>  {/* Larger text */}
              <div className="text-center">{gridTexts[index]}</div>  {/* Display different text for each grid */}
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
