import "./globals.css";



export const metadata = {
  title: "GCU Anonymous Posts",
  description:
    "GCU Gossips is an Anonymous Posts Platform made to give students and faculty a safe and easy way to share their thoughts, opinions, and experiences anonymously within their university community. It helps users speak freely without revealing their identity, connect with others in their department, and stay informed about what's happening across different fields of study",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body
        className={` antialiased text-gray-900 bg-white`}
      >
        {children}
      </body>
    </html>
  );
}
