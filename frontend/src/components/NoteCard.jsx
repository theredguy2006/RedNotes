import { PenSquareIcon, Trash2Icon } from "lucide-react";
import { Link } from "react-router-dom"; // Updated import for routing
import { formatDate } from "../lib/utils";
import api from "../lib/axios";
import toast from "react-hot-toast";

const NoteCard = ({ note, setNotes }) => {
  const handleDelete = async (e, id) => {
    e.preventDefault(); // get rid of the navigation behaviour

    if (!window.confirm("Are you sure you want to delete this note?")) return;

    try {
      await api.delete(`/notes/${id}`);
      setNotes((prev) => prev.filter((note) => note._id !== id)); // get rid of the deleted one
      toast.success("Note deleted successfully");
    } catch (error) {
      console.log("Error in handleDelete", error);
      toast.error("Failed to delete note");
    }
  };

  return (
    <Link
      to={`/read-only-note/${note._id}`}
      className="block hover:shadow-lg transition-shadow"
    >
      <div className="card bg-base-200 shadow-md">
        <div className="card-body">
          <h2 className="card-title text-primary">{note.title}</h2>
          <p className="text-base-content">{note.content.substring(0, 100)}...</p>
          <p className="text-sm text-base-content/70">
            {formatDate(note.updatedAt)}
          </p>
        </div>
      </div>
    </Link>
  );
};
export default NoteCard;
