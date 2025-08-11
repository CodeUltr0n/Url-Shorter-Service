import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Analytics.css";

function Analytics({ API }) {
  const [shortId, setShortId] = useState("");
  const [data, setData] = useState(null);
  const navigate = useNavigate();

  const fetchAnalytics = async () => {
    let id = shortId;
    if (id.startsWith("http")) {
      id = id.split("/").pop();
    }

    try {
      const res = await axios.get(`${API}/url/analytics/${id}`);
      setData(res.data);
    } catch (err) {
      console.error("Analytics fetch error:", err.response?.data || err.message);
      alert("Short URL not found or error fetching analytics");
    }
  };

return (
  <div className="analytics-container">
    <h2>Analytics</h2>
    <input
      type="text"
      className="analytics-input"
      placeholder="Enter short ID"
      value={shortId}
      onChange={(e) => setShortId(e.target.value)}
    />
    <button className="analytics-button" onClick={fetchAnalytics}>
      Get Analytics
    </button>

    {/* Put the Back button inside a div with margin-top for spacing */}
    <div style={{ marginTop: "15px" }}>
      <button onClick={() => navigate(-1)}>← Back</button>
    </div>

    {data && (
      <div>
        <p>Total Clicks: {data.totalclicks}</p>
        <table className="analytics-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Visit Time</th>
            </tr>
          </thead>
          <tbody>
            {[...data.analytics]
              .sort((a, b) => b.timestamp - a.timestamp)
              .map((entry, index) => (
                <tr key={entry._id}>
                  <td>{index + 1}</td>
                  <td>{new Date(entry.timestamp).toLocaleString()}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    )}
  </div>
);
}

export default Analytics;