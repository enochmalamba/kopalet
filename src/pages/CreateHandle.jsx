import { useState } from "react";

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

const CreateJob = () => {
  const [position, setPosition] = useState("");
  const [jobDesc, SetJobDesc] = useState("");
  const [jobType, setJobType] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [attachedFile, setAttachedFile] = useState("");
  const [employer, SetEmployer] = useState({}); // company name, image, about, etc.
  return (
    <div>
      <h1>create job post here</h1>
    </div>
  );
};
function CreateHandle({ type = "job" }) {
  return (
    <div className="create-post-container">
      {type === "job" && <CreateJob />}
      {type === "market-item" && <CreateMarketItem />}
      {type === "social-post" && <CreateSocialPost />}
    </div>
  );
}

export default CreateHandle;
