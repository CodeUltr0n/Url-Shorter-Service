import { useState } from "react";
import axios from "axios";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Shortener from "./components/shortner";
import Analytics from "./pages/AnalyticsPage";
import "./App.css";

function App() {
  const API_BASE = "http://localhost:8001"; // Backend URL
  const [shortUrl, setShortUrl] = useState("");

  const handleShorten = async (longUrl) => {
    try {
      const res = await axios.post(`${API_BASE}/url`, { url: longUrl });
      setShortUrl(`${API_BASE}/${res.data.id}`);
    } catch (err) {
      alert("Error generating short URL");
    }
  };

  return (
    <Router>
      <div className="App" style={{ fontFamily: "sans-serif", padding: "20px" }}>
        <h1>Short URL Service</h1>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Shortener onShorten={handleShorten} />
                {shortUrl && (
                  <p>
                    Short URL:{" "}
                    <a href={shortUrl} target="_blank" rel="noopener noreferrer">
                      {shortUrl}
                    </a>
                  </p>
                )}
                <Link to="/analytics">
                  <button style={{ marginTop: "20px" }}>Go to Analytics</button>
                </Link>
              </>
            }
          />
          <Route path="/analytics" element={<Analytics API={API_BASE} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;