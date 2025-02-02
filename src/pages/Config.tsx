import { useEffect, useState } from "react";
import {
  getBooks,
  updateBook,
  deleteBook,
} from "../services/HTTPService";
import { useNavigate } from "react-router-dom";
import { isAuthenticated, logout } from "../services/AuthService";
import AddBooks from "./components/AddBooks";
import Footer from "./components/Footer";

export default function Confi() {
  const navigate = useNavigate();

  const [keyword, setKeyword] = useState("");
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
    }[]
  >([]);
  const [editingBookId, setEditingBookId] = useState<string | null>(null);
  const [editedBook, setEditedBook] = useState({
    _id: "",
    title: "",
    author: "",
    genre: "",
    publicationBy: "",
    price: 0,
    currency: "",
    description: "",
  });

  useEffect(() => {
    loadBooks(keyword);
  }, [keyword]);

  const loadBooks = async (keyword?: string) => {
    const data = await getBooks(keyword);
    setBooks(data.data);
  };

  const handleSaveEdit = async () => {
    await updateBook(editedBook._id, editedBook);
    setEditingBookId(null);
    loadBooks();
  };

  const handleDelete = async (bookId: string) => {
    await deleteBook(bookId);
    loadBooks();
  };


  const handleAuthButtonClick = () => {
    if (isAuthenticated()) {
      logout();
      navigate("/");
    } else {
      navigate("/");
    }
  };

  const handleEditClick = (book: any) => {
    setEditingBookId(book._id);
    setEditedBook({ ...book });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditedBook((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const addingProducts = ()=> {
    console.log("Adding Products")
    setKeyword("");
    loadBooks();
  }

  return (
    <>
      <div className="min-h-screen bg-gray-100">
        {/* Top Right Buttons */}
        <div className="absolute top-4 right-4 flex space-x-4">
          <button
            className="btn btn-secondary px-4 py-2 rounded-md shadow-md transition"
            onClick={() => navigate("/")}
          >
            Home Page
          </button>
          <button
            className="btn btn-primary min-w-[140px]"
            onClick={handleAuthButtonClick}
          >
            {isAuthenticated() ? "Log Out" : "Log In"}
          </button>
        </div>

        {/* Search */}
        <div className="bg-[url('/cover-photo.JPG')] bg-cover bg-center text-white text-center py-10 top-4">
          <div className="flex justify-start ml-10">
            <div className="relative w-full max-w-md">
              <input
                type="text"
                placeholder="Search for books / authors / genre / publishers..."
                className="w-full pl-10 pr-4 py-2 rounded-md border border-white focus:outline-none focus:ring-2 focus:ring-blue-400 placeholder-white drop-shadow-lg"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
              />
            </div>
          </div>
        </div>
        <AddBooks onAddBook={addingProducts} />

        {/* Books Table */}
        <div className="flex items-center justify-center bg-gray-100">
          <div className="w-full pl-6 pr-6 pt-2 pb-6 bg-white rounded-lg shadow-md">
            {/* Books Table */}
            <table className="w-full table-auto">
              <thead>
                <tr className="bg-gray-200">
                  <th className="border border-gray-300 px-4 py-2">Title</th>
                  <th className="border border-gray-300 px-4 py-2">Author</th>
                  <th className="border border-gray-300 px-4 py-2">Genre</th>
                  <th className="border border-gray-300 px-4 py-2">
                    Published By
                  </th>
                  <th className="border border-gray-300 px-4 py-2">Price</th>
                  <th className="border border-gray-300 px-4 py-2">Currency</th>
                  <th className="border border-gray-300 px-4 py-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {books.map((book) => (
                  <tr
                    key={book._id}
                    className="text-center border border-gray-300"
                  >
                    <td className="border border-gray-300 px-4 py-2">
                      {editingBookId === book._id ? (
                        <input
                          type="text"
                          name="title"
                          value={editedBook.title}
                          onChange={handleChange}
                          className="border p-2 rounded w-full max-w-xs"
                        />
                      ) : (
                        book.title
                      )}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {editingBookId === book._id ? (
                        <input
                          type="text"
                          name="author"
                          value={editedBook.author}
                          onChange={handleChange}
                          className="border p-2 rounded w-full max-w-xs"
                        />
                      ) : (
                        book.author
                      )}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {editingBookId === book._id ? (
                        <input
                          type="text"
                          name="genre"
                          value={editedBook.genre}
                          onChange={handleChange}
                          className="border p-2 rounded w-full max-w-xs"
                        />
                      ) : (
                        book.genre
                      )}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {editingBookId === book._id ? (
                        <input
                          type="text"
                          name="publicationBy"
                          value={editedBook.publicationBy}
                          onChange={handleChange}
                          className="border p-2 rounded w-full max-w-xs"
                        />
                      ) : (
                        book.publicationBy
                      )}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {editingBookId === book._id ? (
                        <input
                          type="number"
                          name="price"
                          value={editedBook.price}
                          onChange={handleChange}
                          className="border p-2 rounded w-full max-w-xs"
                        />
                      ) : (
                        book.price
                      )}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {editingBookId === book._id ? (
                        <input
                          type="text"
                          name="currency"
                          value={editedBook.currency}
                          onChange={handleChange}
                          className="border p-2 rounded w-full max-w-xs"
                        />
                      ) : (
                        book.currency
                      )}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {editingBookId === book._id ? (
                        <>
                          <button
                            className="btn btn-green px-4 py-1 rounded m-2 min-w-[80px] font-normal"
                            onClick={handleSaveEdit}
                          >
                            Save
                          </button>
                          <button
                            className="btn btn-secondary px-4 py-1 rounded m-2 min-w-[80px] font-normal"
                            onClick={() => setEditingBookId(null)}
                          >
                            Cancel
                          </button>
                        </>
                      ) : (
                        <>
                          <button
                            className="btn btn-yellow text-white px-4 py-1 rounded m-2 min-w-[80px]"
                            onClick={() => handleEditClick(book)}
                          >
                            Edit
                          </button>

                          <button
                            className="btn btn-red px-4 py-1 rounded m-2"
                            onClick={() => handleDelete(book._id)}
                          >
                            Delete
                          </button>
                        </>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <Footer></Footer>
    </>
  );
}
