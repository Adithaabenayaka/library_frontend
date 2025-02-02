import { useEffect, useState } from "react";
import { getBooks } from "../../services/HTTPService";
import { useNavigate } from "react-router-dom";
import { isAuthenticated, logout } from "../../services/AuthService";

export default function Hero() {
  console.log("Rendering Hero Component");

  const navigate = useNavigate();
  const [books, setBooks] = useState<
    {
      _id: string;
      title: string;
      author: string;
      genre: string;
      publicationBy: string;
      price: number;
      currency: string;
      description: string;
      imageUrl: string;
    }[]
  >([]);

  const [keyword, setKeyword] = useState("");

  useEffect(() => {
    loadBooks(keyword);
  }, [keyword]);

  const loadBooks = async (keyword?: string) => {
    const data = await getBooks(keyword);
    setBooks(data.data);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setKeyword(value);
  };

  const handleAuthButtonClick = () => {
    if (isAuthenticated()) {
      logout();
      navigate("/")
    } else {
      navigate("/login")
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Top Right Buttons */}
      <div className="absolute top-4 right-4 flex space-x-4">
        <button
          className="btn btn-secondary px-4 py-2 rounded-md shadow-md transition"
          onClick={() => navigate("/configurations")}
        >
          Configurations
        </button>
        <button className="btn btn-primary min-w-[140px]" onClick={handleAuthButtonClick}>
          {isAuthenticated() ? "Log Out" : "Log In"}
        </button>
      </div>

      {/* Hero Section */}
      <div className="bg-[url('/cover-photo.JPG')] bg-cover bg-center text-white text-center py-12">
        <h1 className="text-3xl font-bold drop-shadow-lg">
          Welcome to Our Library
        </h1>
        <p className="text-lg mt-2 font-semibold drop-shadow-lg">
          Explore thousands of books and resources.
        </p>
        <div className="mt-6 flex justify-center">
          <div className="relative w-full max-w-md">
            <input
              type="text"
              placeholder="Search for books / authors / genre / publishers..."
              className="w-full pl-10 pr-4 py-2 rounded-md border border-white focus:outline-none focus:ring-2 focus:ring-blue-400 placeholder-white drop-shadow-lg"
              onChange={handleSearchChange}
            />
          </div>
        </div>
      </div>

      {/* Featured Books */}
      <div className="container mx-auto py-12 px-4">
        <div className="grid sm:grid-cols-1 md:grid-cols-6 gap-6">
          {books.map((book) => (
            <div
              key={book._id}
              className="pb-6 bg-white rounded-lg shadow-md text-center"
            >
              <img
                src={`http://localhost:3200${book.imageUrl}`}
                className="w-full h-40 object-cover rounded-md mb-4"
              />
              <h3 className="text-lg font-semibold">{book.title}</h3>
              <p className="text-gray-500 text-sm">{book.author}</p>

              <p className="text-blue-600 font-bold mt-2">
                {book.currency} {book.price}
              </p>
              <button className="mt-4 px-4 py-2 btn btn-primary ">
                Buy Now
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
