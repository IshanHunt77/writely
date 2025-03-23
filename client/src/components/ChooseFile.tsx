import { useRecoilState } from "recoil";
import { imageatom } from "../atoms/imageatom";
import ImageSearchIcon from "@mui/icons-material/ImageSearch";

export const ChooseFile = () => {
  const [imageData, setImageData] = useRecoilState(imageatom);

  return (
    <div>
      <input
        id="fileInput"
        type="file"
        accept="image/*"
        style={{ display: "none" }}
        onChange={(e) => {
          const selectedFile = e.target.files?.[0];
          if (selectedFile) {
            const imageUrl = URL.createObjectURL(selectedFile);
            setImageData({ file: selectedFile, imageUrl });

            // Cleanup URL object to prevent memory leaks
            return () => URL.revokeObjectURL(imageUrl);
          }
        }}
      />
      <label htmlFor="fileInput" style={{ cursor: "pointer" }}>
        <ImageSearchIcon style={{ fontSize: 30, padding: "2px", marginRight: "8px" }} />
      </label>
    </div>
  );
};
