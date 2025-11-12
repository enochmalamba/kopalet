import { useState } from "react";
import TextField from "@mui/material/TextField";
import FormLabel from "@mui/material/FormLabel";
import MenuItem from "@mui/material/MenuItem";
import "./CreateJobPost.css";

const CreateJobPost = () => {
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
  const months = [
    {
      label: "January",
      value: "january",
    },
    {
      label: "February",
      value: "february",
    },
    {
      label: "March",
      value: "march",
    },
    {
      label: "April",
      value: "april",
    },
    {
      label: "May",
      value: "may",
    },
    {
      label: "June",
      value: "june",
    },
    {
      label: "July",
      value: "july",
    },
    {
      label: "August",
      value: "august",
    },
    {
      label: "September",
      value: "september",
    },
    {
      label: "October",
      value: "october",
    },
    {
      label: "November",
      value: "november",
    },
    {
      label: "December",
      value: "december",
    },
  ];
  return (
    <form className="create-form">
      <TextField
        label="Job Position"
        helperText="e.g. Sales Manager, Receiptionist, etc."
        variant="outlined"
        required
        className="mui-input"
      />
      <TextField
        label="Employment Type"
        select
        required
        className="mui-input"
        helperText="Please select the type of employment"
      >
        {jTypes.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </TextField>

      <div className="deadline-input-container">
        {" "}
        <FormLabel>Enter application deadline</FormLabel>
        <div className="deadline-inputs">
          <TextField
            select
            label="Month"
            variant="outlined"
            className="deadline-input"
            required
          >
            {months.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            max="31"
            label="Day"
            variant="outlined"
            className="deadline-input"
            required
          />
          <TextField
            label="Year"
            variant="outlined"
            className="deadline-input"
            required
          />
        </div>{" "}
      </div>
    </form>
  );
};

export default CreateJobPost;
