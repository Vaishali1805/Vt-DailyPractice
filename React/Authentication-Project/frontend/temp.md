1. Add new field to state
const [userImages, setUserImages] = useState({});
const [modalImages, setModalImages] = useState([]);
const [showImageModal, setShowImageModal] = useState(false);

2. Image Upload Handler
const handleImageUpload = (e, userId) => {
  const files = Array.from(e.target.files);
  const urls = files.map((file) => URL.createObjectURL(file));
  setUserImages((prev) => ({
    ...prev,
    [userId]: [...(prev[userId] || []), ...urls],
  }));
};

3. View Modal Handler
const handleViewImages = (userId) => {
  setModalImages(userImages[userId] || []);
  setShowImageModal(true);
};

4. Image Modal Component
{showImageModal && (
  <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
    <div className="bg-white p-4 rounded shadow-lg max-w-2xl w-full max-h-[80vh] overflow-y-auto">
      <h2 className="text-lg font-semibold mb-2">Uploaded Images</h2>
      <div className="grid grid-cols-2 gap-4">
        {modalImages.map((img, index) => (
          <img key={index} src={img} alt={`upload-${index}`} className="w-full h-auto rounded" />
        ))}
      </div>
      <button
        className="mt-4 bg-red-500 hover:bg-red-600 text-white py-1 px-4 rounded"
        onClick={() => setShowImageModal(false)}
      >
        Close
      </button>
    </div>
  </div>
)}

5. Add new column and buttons in the Table
<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
  Images
</th>
And inside the <tbody>, inside the .map(user => (...)), add this column:

<td className="px-6 py-4 whitespace-nowrap">
  <input
    type="file"
    multiple
    onChange={(e) => handleImageUpload(e, user.id)}
    className="mb-2"
  />
  <button
    onClick={() => handleViewImages(user.id)}
    className="text-blue-600 hover:underline"
  >
    View Images
  </button>
</td>

