import { useState } from "react";
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

const CreateJob = () => {
  const [position, setPosition] = useState("");
  const [jobDesc, SetJobDesc] = useState("");
  const [jobType, setJobType] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [attachedFile, setAttachedFile] = useState("");
  const [employer, SetEmployer] = useState({}); // company name, image, about, etc.
  const jTypes = [
    {
      label: "Full-time",
      value: "full-time",
    },
    {
      label: "Part-time",
      value: "part-time",
    },
    {
      label: "Contract",
      value: "contract",
    },
    {
      label: "Internship",
      value: "internship",
    },
  ];
  return (
    <form>
      <TextField
        label="Job Position"
        helperText="e.g. Sales Manager, Receiptionist, etc."
        variant="outlined"
        required
      />
      <TextField
        label="Employment Type"
        select
        required
        // helperText="Please select the type of employment"
      >
        {jTypes.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </TextField>
    </form>
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
