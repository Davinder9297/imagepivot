import { useState } from "react";
import axios from "axios";

const ConvertVideoPage = () => {
  const [video, setVideo] = useState(null);
  const [format, setFormat] = useState("mp4");
  const [convertedUrl, setConvertedUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedFileName, setSelectedFileName] = useState("");
  const [previewUrl, setPreviewUrl] = useState(null);

  const validFormats = ["mp4", "mkv", "webm", "avi", "mov", "flv"];

  const handleVideoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Revoke previous preview URL to avoid memory leaks
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }

      setVideo(file);
      setSelectedFileName(file.name);
      setPreviewUrl(URL.createObjectURL(file));
      setConvertedUrl(null);
      setError(null);
    }
  };

  const handleConvert = async (e) => {
    e.preventDefault();

    setLoading(true);
    setError(null);

    if (!video) {
      setError("Please upload a video file first.");
      setLoading(false);
      return;
    }

    if (!validFormats.includes(format)) {
      setError("Selected format is not supported.");
      setLoading(false);
      return;
    }

    const token = localStorage.getItem("token");
    if (!token) {
      setError("Please login to use this feature");
      setLoading(false);
      return;
    }

    try {
      const formData = new FormData();
      formData.append("video", video);
      formData.append("format", format);
    const trackRes = await axios.post("/api/user/track", {
        service: 'convert-video',
        imageCount: 1
      }, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      console.log(trackRes);
      
      const res = await axios.post("/api/video/convert-video", formData, {
        responseType: "blob",
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });

      const url = URL.createObjectURL(new Blob([res.data]));
      setConvertedUrl(url);
    } catch (err) {
      console.error("Conversion failed:", err);
      if (err.response?.status === 401) {
        setError("Please login to use this feature");
      } else if (err.response?.status === 403) {
        setError("You have reached your video processing limit. Please upgrade your plan.");
      } else {
        setError("Failed to convert video. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-teal-600 mb-2">Convert Video</h1>
          <p className="text-lg text-black max-w-2xl mx-auto">
            Convert your video files to different formats while maintaining quality
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <div className="bg-[#F4EDE4] rounded-xl shadow-lg overflow-hidden">
            <div className="p-6">
              <form onSubmit={handleConvert} className="space-y-6">
                {error && (
                  <div className="bg-red-50 border-l-4 border-red-400 p-4 rounded-md">
                    <div className="flex">
                      <div className="flex-shrink-0">
                        <svg className="h-5 w-5 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <div className="ml-3">
                        <p className="text-sm text-red-600">{error}</p>
                      </div>
                    </div>
                  </div>
                )}

                <div className="space-y-4">
                  {/* File Upload */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Upload Video File
                    </label>
                    <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg hover:border-indigo-500 transition-colors duration-200">
                      <div className="space-y-1 text-center">
                        <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48">
                          <path
                            d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                        <div className="flex text-sm text-gray-600">
                          <label
                            htmlFor="file-upload-video"
                            className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
                          >
                            <span>Upload a file</span>
                            <input
                              id="file-upload-video"
                              name="file-upload-video"
                              type="file"
                              accept={validFormats.map((f) => "." + f).join(",")}
                              onChange={handleVideoChange}
                              className="sr-only"
                            />
                          </label>
                          <p className="pl-1">or drag and drop</p>
                        </div>
                        <p className="text-xs text-gray-500">Supported formats: {validFormats.join(", ").toUpperCase()} - max 100MB</p>
                        {selectedFileName && (
                          <p className="mt-2 text-sm text-indigo-600 font-medium">
                            Selected: {selectedFileName}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Small Preview Video Player */}
                  {previewUrl && (
                    <div className="mt-4 flex justify-center">
                      <video controls src={previewUrl} className="w-full max-w-md rounded-lg" />
                    </div>
                  )}

                  {/* Format Selection */}
                  <div>
                    <label htmlFor="format" className="block text-sm font-medium text-gray-700 mb-2">
                      Convert to Format
                    </label>
                    <select
                      id="format"
                      value={format}
                      onChange={(e) => setFormat(e.target.value)}
                      className="mt-1 block w-full pl-3 pr-10 py-2 bg-gray-100 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-lg transition duration-200"
                    >
                      {validFormats.map((fmt) => (
                        <option key={fmt} value={fmt}>
                          {fmt.toUpperCase()}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Convert Button */}
                  <div className="flex justify-center">
                    <button
                      type="submit"
                      disabled={loading || !video}
                      className={`inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-lg shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-200 ${
                        loading || !video ? "opacity-50 cursor-not-allowed" : "hover:scale-105"
                      }`}
                    >
                      {loading ? (
                        <>
                          <svg
                            className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                          >
                            <circle
                              className="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="4"
                            ></circle>
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            ></path>
                          </svg>
                          Converting...
                        </>
                      ) : (
                        "Convert Video"
                      )}
                    </button>
                  </div>
                </div>
              </form>

              {/* Download Section */}
              {convertedUrl && (
                <div className="mt-6 text-center">
                  <a
                    href={convertedUrl}
                    download={`converted.${format}`}
                    className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-lg text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition duration-200 hover:scale-105"
                  >
                    <svg
                      className="w-5 h-5 mr-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                      />
                    </svg>
                    Download Converted Video
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConvertVideoPage;