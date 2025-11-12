import { useState } from "react";
import CreateJobPost from "../components/CreateJobPost";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
const CreateSocialPost = () => {
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");
  const [attachedFile, setAttachedFile] = useState(""); // only accept images (expect webp, svg, -- more later), pptx, xcl, pdf, word documents,
  return (
    <div>
      <h1>this is the form for creating a social post woohoo!</h1>
    </div>
  );
};

const CreateMarketItem = () => {
  const [price, setPrice] = useState("");
  const [itemName, setItemName] = useState("");
  const [itemDesc, setItemDesc] = useState("");
  const [pictures, setPictures] = useState([]); // max number of pictures is 4 with a max of 2MB for each
  return (
    <div>
      <h1>create market item form here</h1>
    </div>
  );
};

function CreateHandle({ type = "job" }) {
  return (
    <div className="create-post-container">
      {type === "job" && <CreateJobPost />}
      {type === "market-item" && <CreateMarketItem />}
      {type === "social-post" && <CreateSocialPost />}
    </div>
  );
}

export default CreateHandle;
