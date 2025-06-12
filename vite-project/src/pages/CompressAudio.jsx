import { useState } from "react";
import axios from "axios";

const CompressAudioPage = () => {
  const [audio, setAudio] = useState(null);
  const [percentage, setPercentage] = useState(50);
  const [convertedUrl, setConvertedUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedFileName, setSelectedFileName] = useState("");

  const handleAudioChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAudio(file);
      setSelectedFileName(file.name);
      setConvertedUrl(null);
      setError(null);
    }
  };

  const handleCompress = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    if (!audio) {
      setError("Please upload an audio file first.");
      setLoading(false);
      return;
    }

    try {
      const formData = new FormData();
      formData.append("audio", audio);
      formData.append("percentage", percentage);

      const res = await axios.post("/api/audio/compress-audio", formData, {
        responseType: "blob",
      });

      const url = URL.createObjectURL(new Blob([res.data]));
      setConvertedUrl(url);
    } catch (err) {
      setError("Compression failed. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-8 px-4">
      <div className="max-w-3xl mx-auto bg-white p-6 rounded-xl shadow-lg">
        <h1 className="text-3xl font-bold text-center text-indigo-600 mb-4">Compress Audio</h1>
        <p className="text-center text-gray-600 mb-6">Upload your audio and choose compression percentage</p>

        {error && (
          <div className="bg-red-100 text-red-700 px-4 py-2 rounded mb-4 text-sm">{error}</div>
        )}

        <form onSubmit={handleCompress} className="space-y-6">
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">Upload Audio</label>
            <input type="file" accept="audio/*" onChange={handleAudioChange} />
            {selectedFileName && <p className="text-sm mt-2 text-indigo-600">Selected: {selectedFileName}</p>}
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">Compression Percentage</label>
            <input
              type="range"
              min="10"
              max="90"
              value={percentage}
              onChange={(e) => setPercentage(e.target.value)}
              className="w-full"
            />
            <p className="text-sm text-gray-700 mt-1">{percentage}%</p>
          </div>

          <div className="text-center">
            <button
              type="submit"
              disabled={loading || !audio}
              className="bg-indigo-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-indigo-700 transition disabled:opacity-50"
            >
              {loading ? "Compressing..." : "Compress Audio"}
            </button>
          </div>
        </form>

        {convertedUrl && (
          <div className="mt-6 text-center">
            <a
              href={convertedUrl}
              download="compressed-audio.mp3"
              className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition"
            >
              Download Compressed Audio
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

export default CompressAudioPage;
