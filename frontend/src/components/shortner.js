import { useState } from "react";

function Shortener({ onShorten }) {
  const [longUrl, setLongUrl] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!longUrl) return alert("Please enter a URL");
    onShorten(longUrl);
    setLongUrl("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Enter long URL"
        value={longUrl}
        onChange={(e) => setLongUrl(e.target.value)}
        style={{ width: "300px", padding: "5px" }}
      />
      <button type="submit" style={{ marginLeft: "10px" }}>
        Shorten
      </button>
    </form>
  );
}

export default Shortener;