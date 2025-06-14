import { useState } from "react";
import axios from "axios";

const VideoCompressionPage = () => {
  const [video, setVideo] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [compression, setCompression] = useState(40);
  const [convertedUrl, setConvertedUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleVideoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
      setVideo(file);
      setPreviewUrl(URL.createObjectURL(file));
      setConvertedUrl(null);
      setError("");
    }
  };

  const handleCompress = async (e) => {
    e.preventDefault();
    if (!video) {
      setError("Please upload a video first.");
      return;
    }
    setLoading(true);
    setError("");

    const token = localStorage.getItem("token");
    if (!token) {
      setError("Please login to use this feature");
      setLoading(false);
      return;
    }

    const formData = new FormData();
    formData.append("video", video);
    formData.append("percentage", compression);

    try {
          const trackRes = await axios.post("/api/user/track", {
        service: 'convert-video',
        imageCount: 1
      }, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      const res = await axios.post("/api/video/compress-video", formData, {
        responseType: "blob",
         headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      const url = URL.createObjectURL(new Blob([res.data]));
      setConvertedUrl(url);
    } catch (err) {
      console.error(err);
      setError("Video compression failed. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-200 py-12 px-4">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg p-8">
        <h2 className="text-3xl font-bold text-center text-indigo-600 mb-4">Compress Video</h2>
        <p className="text-center text-gray-600 mb-8">
          Upload a video and select the compression percentage to reduce its size.
        </p>

        {error && <p className="text-red-500 text-center mb-4">{error}</p>}

        <form onSubmit={handleCompress} className="space-y-6">
          {/* Upload */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Upload Video</label>
            <input
              type="file"
              accept="video/*"
              onChange={handleVideoChange}
              className="w-full border border-gray-300 rounded-md p-2 bg-gray-50"
            />
          </div>

          {/* Preview */}
          {previewUrl && (
            <div className="mt-4 flex justify-center">
              <video
                controls
                src={previewUrl}
                className="w-full max-w-md border rounded-lg shadow"
              />
            </div>
          )}

          {/* Compression Slider */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Compression Level: {compression}%</label>
            <input
              type="range"
              min="10"
              max="90"
              value={compression}
              onChange={(e) => setCompression(e.target.value)}
              className="w-full"
            />
          </div>

          {/* Button */}
          <div className="flex justify-center">
            <button
              type="submit"
              disabled={loading || !video}
              className={`px-6 py-3 text-white font-medium rounded-lg transition duration-200 ${
                loading || !video
                  ? "bg-indigo-400 cursor-not-allowed"
                  : "bg-indigo-600 hover:bg-indigo-700 hover:scale-105"
              }`}
            >
              {loading ? "Compressing..." : "Compress Video"}
            </button>
          </div>
        </form>

        {/* Download Link */}
        {convertedUrl && (
          <div className="mt-6 text-center">
            <a
              href={convertedUrl}
              download="compressed-video.mp4"
              className="inline-block px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg transition duration-200 hover:scale-105"
            >
              Download Compressed Video
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

export default VideoCompressionPage;
