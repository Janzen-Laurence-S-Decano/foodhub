import Link from "next/link";

const mockUrls = [
  "https://99mvyxc675.ufs.sh/f/3T9DhQRBd4jxTr0hnOpD2z8CsRHSevUM5cDrJIL961xbFyVd",
  "https://99mvyxc675.ufs.sh/f/3T9DhQRBd4jxy50EPiICJ3S6fgOmXDqNnjHbEFe2ydr1PsuA",
  "https://99mvyxc675.ufs.sh/f/3T9DhQRBd4jxu7gIq8xMNWyXbox6ds7D0cmHRKLYIFJvuUhO"

];

const mockImages = mockUrls.map((url, index) => ({
    id: index +1,
    url,

}));

export default function HomePage() {
  return (
    <main className="">
      <div className="flex flex-wrap gap-4">
        {/*{mockImages.map((image) => (
          <div key={image.id} className="w-48">
            <img src={image.url}/>
          </div>
        ))} */}

          {[...mockImages, ...mockImages, ...mockImages].map((image) => (
            <div key={image.id} className="w-48">
              <img src={image.url}/>
            </div>
          ))}

      </div>
    </main>
  );
}
