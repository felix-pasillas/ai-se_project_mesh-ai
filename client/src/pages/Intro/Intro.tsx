import { useNavigate } from "react-router-dom";
import "./Intro.css";
import iconDocuments from "../../assets/icon-documents.png";
import iconOrganize from "../../assets/icon-organize.png";
import iconSparkle from "../../assets/icon-sparkle.png";

export default function Intro() {
  const navigate = useNavigate();

  const handleStart = () => {
    navigate("/knowledge");
  };

  return (
    <div className="intro">
      <div className="intro__card">
        <h1 className="intro__heading">Welcome to Mesh AI</h1>
        <div className="intro__features">
          <div className="intro__feature">
            <img
              src={iconDocuments}
              alt="Stacked documents"
              className="intro__feature-icon"
            />
            <p>Bring all your documents into one secure AI workspace</p>
          </div>
          <div className="intro__feature">
            <img
              src={iconOrganize}
              alt="Folder containing a document"
              className="intro__feature-icon"
            />
            <p>Organize and manage the documents that power your AI</p>
          </div>
          <div className="intro__feature">
            <img
              src={iconSparkle}
              alt="Sparkle over stacked documents"
              className="intro__feature-icon"
            />
            <p>Your knowledge base, accessible through a simple chat interface</p>
          </div>
        </div>
        <p className="intro__subtext">
          Start by creating your Organization's Knowledge Base
        </p>
        <button type="button" className="intro__start" onClick={handleStart}>
          Start
        </button>
      </div>
    </div>
  );
}