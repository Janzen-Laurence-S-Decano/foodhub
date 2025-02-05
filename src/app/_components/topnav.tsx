"use client";

import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { UploadButton } from "~/utils/uploadthing";

export default function TopNav() {
    const router = useRouter();

    return (
      <nav className="flex w-full items-center justify-between border-b p-4 text-xl font-semibold">
     <div className="text-4xl font-bold text-center text-black bg-yellow-300 p-6 rounded-lg shadow-lg">
  FoodHub
</div>


        <div className="flex flex-row">
            <SignedOut>
                <SignInButton />
            </SignedOut>
            <SignedIn>
             < UploadButton endpoint="videoUploader" 
             onClientUploadComplete={(res) => {
              router.refresh();
             }} />
                <UserButton />
            </SignedIn>
        </div>

      </nav>
    );
}