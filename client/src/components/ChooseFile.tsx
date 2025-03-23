import { useSetRecoilState } from "recoil";
import { imageatom } from "../atoms/imageatom";
import ImageSearchIcon from "@mui/icons-material/ImageSearch";

export const ChooseFile = () => {
  const setImageData = useSetRecoilState(imageatom);

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
            setImageData({
              file: selectedFile,
              imageUrl: URL.createObjectURL(selectedFile),
            });
          }
        }}
      />
      <label htmlFor="fileInput" style={{ cursor: "pointer" }}>
        <ImageSearchIcon style={{ fontSize: 30, padding: "2px", marginRight: "8px" }} />
      </label>
    </div>
  );
};
