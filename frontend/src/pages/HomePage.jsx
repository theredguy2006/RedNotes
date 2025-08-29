import { useState } from "react";
import { useEffect } from "react";
import api from "../lib/axios";
import toast from "react-hot-toast";
import NoteCard from "../components/NoteCard";
import NotesNotFound from "../components/NotesNotFound";
import { SearchIcon } from "lucide-react";

const HomePage = () => {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        console.log("Fetching notes from:", api.defaults.baseURL);
        console.log("Full URL will be:", api.defaults.baseURL + "/notes");
        const res = await api.get("/notes");
        console.log("Notes fetched successfully:", res.data);
        console.log("Number of notes:", res.data.length);
        setNotes(res.data);
      } catch (error) {
        console.log("Error fetching notes");
        console.log("Error details:", error);
        console.log("Error response:", error.response);
        console.log("Error status:", error.response?.status);
        console.log("Error data:", error.response?.data);
        toast.error("Failed to load notes");
      } finally {
        setLoading(false);
      }
    };

    fetchNotes();
  }, []);

  // Filter notes based on search term
  const filteredNotes = notes.filter((note) => {
    const searchLower = searchTerm.toLowerCase();
    return (
      note.title.toLowerCase().includes(searchLower) ||
      note.content.toLowerCase().includes(searchLower)
    );
  });

  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto p-4 pt-6">
        {/* Search Bar */}
        <div className="mb-6">
          <div className="relative max-w-md mx-auto md:mx-0">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <SearchIcon className="h-5 w-5 text-base-content/50" />
            </div>
            <input
              type="text"
              placeholder="Search notes..."
              className="input input-bordered w-full pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {loading && <div className="text-center text-primary py-10">Loading notes...</div>}

        {!loading && filteredNotes.length === 0 && searchTerm === "" && <NotesNotFound />}

        {!loading && filteredNotes.length === 0 && searchTerm !== "" && (
          <div className="text-center py-10">
            <p className="text-base-content/70">No notes found matching "{searchTerm}"</p>
          </div>
        )}

        {!loading && filteredNotes.length > 0 && (
          <>
            <h2 className="text-2xl font-bold mb-6 text-center md:text-left">
              {searchTerm ? `Search Results (${filteredNotes.length})` : "Your Notes"}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredNotes.map((note) => (
                <NoteCard key={note._id} note={note} setNotes={setNotes} />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};
export default HomePage;
