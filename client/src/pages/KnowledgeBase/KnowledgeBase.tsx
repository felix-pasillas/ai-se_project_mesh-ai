import { useState, useEffect } from "react";
import "./KnowledgeBase.css";
import UploadArea from "../../components/UploadArea/UploadArea";
import type { KnowledgeDoc } from "../../utils/api";
import { getDocuments } from "../../utils/api";

export default function KnowledgeBase() {
  const [documents, setDocuments] = useState<KnowledgeDoc[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await getDocuments();
        setDocuments(res.data || []);
      } catch {
        setError("Failed to load documents.");
      } finally {
        setIsLoading(false);
      }
    };

    load();
  }, []);

  const handleFileSelect = (file: File) => {
    const newDoc: KnowledgeDoc = {
      _id: Date.now().toString(),
      title: file.name,
      fileName: file.name,
      userId: "local",
      createdAt: new Date().toISOString(),
    };
    setDocuments((prev) => [newDoc, ...prev]);
  };

  return (
    <div className="knowledge-base">
      <h1>Manage Your Knowledge Base</h1>
      <section className="knowledge-base__content">
        <p>Upload documents (PDF)</p>
        <UploadArea onFileSelect={handleFileSelect} />
        {isLoading && <p>Loading...</p>}
        {!isLoading && error && <p className="knowledge-base__error">{error}</p>}
        {!isLoading && !error && documents.length === 0 && (
          <p>No documents yet.</p>
        )}
        {!isLoading && !error && documents.length > 0 && (
          <ul className="knowledge-base__chips">
            {documents.map((doc) => (
              <li key={doc._id} className="knowledge-base__chip">
                <span>{doc.fileName}</span>
                <button
                  type="button"
                  className="knowledge-base__chip-remove"
                  aria-label={`Remove ${doc.fileName}`}
                >
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 12 12"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                  >
                    <path
                      d="M1 1L11 11M1 11L11 1"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                  </svg>
                </button>
              </li>
            ))}
          </ul>
        )}
        <button className="knowledge-base__save">Save</button>
      </section>
    </div>
  );
}