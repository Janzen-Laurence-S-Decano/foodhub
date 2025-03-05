"use client";

import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { UploadButton } from "~/utils/uploadthing";

export default function TopNav() {
    const router = useRouter();

    return (
      <nav className="flex w-full items-center justify-between p-4">
        {/* Logo in the center */}
        <div className="text-3xl font-medium text-black">
  FoodHub
</div>


    
        {/* Authentication and Upload Buttons */}
        <div className="flex flex-row space-x-4">
          <SignedOut>
            <SignInButton />
          </SignedOut>
          <SignedIn>
            <UploadButton
              endpoint="videoUploader"
              onClientUploadComplete={(res) => {
                router.refresh();
              }}
            />
            <UserButton />
          </SignedIn>
        </div>
      </nav>
    );
    
}