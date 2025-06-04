import { Link } from "react-router-dom";

const OperationCard = ({ title, description, route }) => {
  // Get appropriate icon based on route
  const getIcon = (route) => {
    switch (route) {
      case '/convert':
        return '♻️'; // Format conversion
      case '/compress':
        return '🗃️'; // Compression tool
      case '/html-to-image':
        return '📄'; // HTML document
      case '/rotate':
        return '🔄'; // Rotate arrows
      case '/crop':
        return '✂️'; // Crop scissors
      case '/watermark':
        return '💧'; // Watermark drop
      case '/meme-generator':
        return '😂'; // Meme laughing face
      case '/blur-face':
        return '👤'; // Blur face person
      case '/upscale':
        return '🔍'; // Upscale magnifier
      case '/image':
        return '📷'
      case '/convertaudio':
        return '🎵'
      case '/convertvideo':
        return '📽'
      default:
        return '🛠️'; // Default tool
    }
  };

  return (
    <Link to={route} className="block hover:shadow-xl transition flex-grow">
      <div className="bg-teal-300 shadow p-6 rounded-lg cursor-pointer hover:bg-teal-400 h-full">
        <h3 className="text-xl font-semibold text-indigo-600">{title}</h3>
        <div className="text-2xl my-2">{getIcon(route)}</div>
        <p className="text-black">{description}</p>
      </div>
    </Link>
  );
};

export default OperationCard;
// import { Link } from "react-router-dom";

// const OperationCard = ({ title, description, route, icon = "🛠️" }) => {
//   return (
//     <Link to={route} className="block hover:shadow-xl transition">
//       <div className="bg-white shadow p-6 rounded-lg cursor-pointer hover:bg-indigo-50">
//         {/* Title */}
//         <h3 className="text-xl font-semibold text-indigo-600">{title}</h3>

//         {/* Icon */}
//         <div className="text-2xl my-2">{icon}</div>

//         {/* Description */}
//         <p className="text-gray-600">{description}</p>
//       </div>
//     </Link>
//   );
// };

// export default OperationCard;
