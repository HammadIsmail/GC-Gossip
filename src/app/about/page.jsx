// app/about/page.js

import Link from "next/link";

export default function AboutPage() {
  return (
    <>
        {/* Header */}
          <header className="bg-blue-600 text-white p-4 shadow-md">
            <div className="container mx-auto flex justify-between items-center">
            <Link href={"/"}> <h1 className="text-2xl cursor-pointer font-bold">{`UET (FSD) Gossips`}</h1></Link> 
            
              <Link href={"/about"}> <button 
               
                className="bg-white text-blue-600 px-4 py-2 rounded-md hover:bg-blue-100 font-medium"
              >
                About This Site
              </button>
              </Link>
            </div>
          </header>
   
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-4">About Us</h1>
      <p className="text-gray-700">
        We're building modern web applications using Next.js and other awesome technologies!
      </p>
    </div>
     </>
  );
}
