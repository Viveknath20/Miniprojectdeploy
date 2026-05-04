import { useState } from "react";
import API from "../api";

function Upload() {
  const [file, setFile] = useState(null);

  const upload = async () => {
    const formData = new FormData();
    formData.append("image", file);

    await API.post("/auth/upload", formData, {
      headers: {
        Authorization: localStorage.getItem("token")
      }
    });

    alert("Uploaded!");
  };
return (
    <div>
        <h2>Upload Image</h2>
        <input type="file" onChange={(e)=>setFile(e.target.files[0])}/>
        <button onClick={upload}>Upload</button>
    </div>
    );
};

export default Upload;