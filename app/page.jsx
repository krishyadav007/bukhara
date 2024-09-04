"use client";
import Navbar from "../components/Navbar";
import Stories from "../components/Stories";
import PostCard from "../components/PostCard";
import {
  HomeIcon,
  BookmarkIcon,
  PlusIcon,
  UserIcon,
  MapPinIcon,
} from "@heroicons/react/24/outline";




export default function Home() {


  return (
    <>
      <div className="min-h-screen bg-gray-100">
        <div className="container mx-auto px-4">
          <Navbar />
          <PostCard />
        </div>
      </div>
      {/* <footer className="fixed bottom-0 w-full bg-[#F9F16F] flex justify-around rounded p-4">
        <button className="p-2 rounded" aria-label="Home">
          <HomeIcon className="w-6 h-6 text-[#3A1B0F] fill-current" />
        </button>
        <button className="p-2 rounded" aria-label="User">
          <UserIcon className="w-6 h-6 text-[#3A1B0F] fill-current" />
        </button>
        <button className="p-2 rounded" aria-label="Add">
          <PlusIcon className="w-6 h-6 text-[#3A1B0F] fill-current" />
        </button>
        <button className="p-2 rounded" aria-label="Bookmark">
          <BookmarkIcon className="w-6 h-6 text-[#3A1B0F] fill-current" />
        </button>
        <button className="p-2 rounded" aria-label="Location">
          <MapPinIcon className="w-6 h-6 text-[#3A1B0F] fill-current" />
        </button>
      </footer> */}
    </>
  );
}
