import { useState } from "react";
import { addBook } from "../../services/HTTPService";

export default function AddBooks() {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    genre: "",
    publicationBy: "",
    price: "",
    currency: "",
    description: "",
    image: null as File | null,
  });

  const toggleDrawer = () => setIsOpen(!isOpen);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData((prev) => ({ ...prev, image: e.target.files![0] }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const data = new FormData();
    data.append("title", formData.title);
    data.append("author", formData.author);
    data.append("genre", formData.genre);
    data.append("publicationBy", formData.publicationBy);
    data.append("price", formData.price);
    data.append("currency", formData.currency);
    data.append("description", formData.description);
    if (formData.image) {
      data.append("image", formData.image);
    }

    try {
      await addBook(data);
      alert("Book added successfully!");
      toggleDrawer();
    } catch (error) {
      console.error("Failed to add book:", error);
      alert("Failed to add book");
    }
  };

  return (
    <div className="bg-white">
      <button className="btn btn-primary px-6 py-2 mt-2  ml-10" onClick={toggleDrawer}>
        Add Books
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-transparent bg-opacity-50 z-50" onClick={toggleDrawer}>
          <div
            className="fixed top-0 right-0 h-full w-80 bg-white shadow-lg p-6 transform transition-transform max-h-screen overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-xl font-semibold mb-2">Add a New Book</h2>

            <form onSubmit={handleSubmit}>
              <input type="text" name="title" placeholder="Title" className="w-full border p-2 rounded mb-2" onChange={handleChange} />
              <input type="text" name="author" placeholder="Author" className="w-full border p-2 rounded mb-2" onChange={handleChange} />
              <input type="text" name="genre" placeholder="Genre" className="w-full border p-2 rounded mb-2" onChange={handleChange} />
              <input type="text" name="publicationBy" placeholder="Published By" className="w-full border p-2 rounded mb-2" onChange={handleChange} />
              <input type="number" name="price" placeholder="Price" className="w-full border p-2 rounded mb-2" onChange={handleChange} />
              <input type="text" name="currency" placeholder="Currency" className="w-full border p-2 rounded mb-2" onChange={handleChange} />
              <textarea name="description" placeholder="Description" className="w-full border p-2 rounded mb-2" onChange={handleChange}></textarea>

              {/* File Upload */}
              <label className="block mb-1">Upload Image</label>
              <input type="file" className="w-full border p-2 rounded mb-4" accept="image/*" onChange={handleFileChange} />

              <div className="flex justify-center">
              <button type="submit" className="btn btn-green px-6 py-2 rounded mt-4">
                Save
              </button>
              <button type="button" className="btn btn-secondary px-6 py-2 rounded mt-4 ml-2" onClick={toggleDrawer}>
                Cancel
              </button>
              </div>


              
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
