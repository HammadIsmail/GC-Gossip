// app/about/page.js

import Link from "next/link";

export default function AboutPage() {
  return (
    <>
      {/* Header */}
      <header className="bg-blue-600 text-white p-4 shadow-md">
        <div className="container mx-auto flex justify-between items-center">
          <Link href={"/"}>
            {" "}
            <h1 className="text-2xl cursor-pointer font-bold">{`GCU Gossips`}</h1>
          </Link>

          <Link href={"/about"}>
            {" "}
            <button className="bg-white text-blue-600 px-4 py-2 rounded-md hover:bg-blue-100 font-medium">
              About This Site
            </button>
          </Link>
        </div>
      </header>

      <div className="p-8">
        <h1 className="text-3xl font-bold mb-4">About Us</h1>
        <p className="text-gray-700">
          GCU Gossips is a Anonymous Posts Platform is made to give
          students and faculty a safe and easy way to share their thoughts,
          opinions, and experiences anonymously within their university
          community. It helps users speak freely without revealing their
          identity, connect with others in their department, and stay informed
          about what's happening across different fields of study — all through
          a simple and mobile-friendly website.
        </p>
      </div>
    </>
  );
}
