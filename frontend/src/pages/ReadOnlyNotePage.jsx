import { useParams, useNavigate, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "../lib/axios";
import { ArrowLeftIcon, EditIcon, Trash2Icon, DownloadIcon } from "lucide-react";
import toast from "react-hot-toast";
import { exportNoteToPDF } from "../lib/pdfExport";

const ReadOnlyNotePage = () => {
  const { id } = useParams();
  const [note, setNote] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchNote = async () => {
      try {
        const response = await axios.get(`/notes/${id}`);
        setNote(response.data);
      } catch (error) {
        console.error("Error fetching note:", error);
        toast.error("Failed to fetch note");
      }
    };

    fetchNote();
  }, [id]);

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this note?")) return;

    try {
      await axios.delete(`/notes/${id}`);
      toast.success("Note deleted successfully");
      navigate("/");
    } catch (error) {
      console.error("Error deleting note:", error);
      toast.error("Failed to delete note");
    }
  };

  const handleExportPDF = () => {
    try {
      exportNoteToPDF(note);
      toast.success("PDF exported successfully!");
    } catch (error) {
      console.error("Error exporting PDF:", error);
      toast.error("Failed to export PDF");
    }
  };

  if (!note) {
    return <div className="text-center text-xl text-primary">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-base-200">
      <div className="max-w-4xl mx-auto p-6">
        {/* Header with navigation and actions */}
        <div className="flex items-center justify-between mb-6">
          <Link to="/" className="btn btn-primary btn-outline">
            <ArrowLeftIcon className="h-5 w-5" />
            Back to Notes
          </Link>
          <div className="flex gap-2">
            <button onClick={handleExportPDF} className="btn btn-secondary">
              <DownloadIcon className="h-5 w-5" />
              Export PDF
            </button>
            <Link to={`/note/${id}`} className="btn btn-primary">
              <EditIcon className="h-5 w-5" />
              Edit Note
            </Link>
            <button onClick={handleDelete} className="btn btn-error btn-outline">
              <Trash2Icon className="h-5 w-5" />
              Delete Note
            </button>
          </div>
        </div>

        {/* Note content */}
        <div className="card bg-base-100 shadow-lg">
          <div className="card-body">
            <h1 className="card-title text-3xl font-bold text-primary mb-4">{note.title}</h1>
            <div className="prose max-w-none">
              <p className="text-lg text-base-content leading-relaxed whitespace-pre-wrap">{note.content}</p>
            </div>
            <div className="text-sm text-base-content/70 mt-4">
              Last updated: {new Date(note.updatedAt).toLocaleDateString()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReadOnlyNotePage;
