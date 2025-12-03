import { useState } from "react";
import TextField from "@mui/material/TextField";
import FormLabel from "@mui/material/FormLabel";
import MenuItem from "@mui/material/MenuItem";
import { workArrangements, jTypes, months } from "../data";
import "./CreateJobPost.css";

const JobInformation = () => {
  return (
    <>
      <div className="job-details-container">
        <h3>1. Job details</h3>
        <div className="mui-input-group">
          <FormLabel>Job position</FormLabel>
          <TextField
            helperText="e.g. Sales Manager, Receiptionist, etc."
            variant="outlined"
            required
            className="mui-input"
          />
        </div>
        <div className="mui-input-group">
          <FormLabel>Department</FormLabel>
          <TextField
            helperText="e.g. Marketing, Engineering, Finance, etc."
            variant="outlined"
            required
            className="mui-input"
          />
        </div>
        <div className="mui-input-group">
          <FormLabel>Employment Type</FormLabel>
          <TextField
            select
            required
            className="mui-input"
            helperText="e.g. Full-time, Part-time, etc."
          >
            {jTypes.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
        </div>
        <div className="mui-input-group">
          <FormLabel>Work arrangment</FormLabel>
          <TextField
            required
            select
            className="mui-input"
            helperText="e.g. Remote, On-site, Hybrid, etc."
          >
            {workArrangements.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
        </div>
        <div>
          <FormLabel>Location</FormLabel>
          <TextField
            helperText="Where is the job based?"
            variant="outlined"
            required
            className="mui-input"
          />
        </div>
        <div className="deadline-input-container">
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
          </div>
        </div>
        <div className="mui-input-group">
          <FormLabel>Role overview</FormLabel>
          <TextField
            helperText="What is the job all about?"
            variant="outlined"
            className="mui-input"
            multiline
            minRows={2}
            maxRows={6}
          />
        </div>
        <div className="mui-input-group">
          <FormLabel>Qualifications and experiences</FormLabel>
          <TextField
            helperText="e.g. MSCE holder, etc"
            variant="outlined"
            className="mui-input"
            multiline
            minRows={2}
            maxRows={6}
          />
        </div>
        <div className="mui-input-group">
          <FormLabel>Skills and competencies</FormLabel>
          <TextField
            helperText="What type of individual are you looking for?"
            variant="outlined"
            className="mui-input"
            multiline
            minRows={2}
            maxRows={6}
          />
        </div>
        <div>
          <FormLabel>Duties and responsibilities</FormLabel>
          <TextField
            helperText="What will the employee be doing?"
            variant="outlined"
            className="mui-input"
            multiline
            minRows={2}
            maxRows={6}
          />
        </div>
        {/* <TextEditor
          value={jobSummary}
          onChange={(html) => setJobSummary(html)}
          placeholder="Enter job summary here..."
        /> */}
      </div>
    </>
  );
};
const EmployerInformation = () => {
  return (
    <>
      <div className="company-details-container">
        <h3>2. Company Overview</h3>
        <div>
          <FormLabel>Company name</FormLabel>
          <TextField variant="outlined" className="mui-input" />
        </div>
        <div>
          <FormLabel>Company mission/vison</FormLabel>
          <TextField
            variant="outlined"
            className="mui-input"
            multiline
            minRows={2}
            maxRows={6}
          />
        </div>{" "}
        <div>
          <FormLabel>Company culture</FormLabel>
          <TextField
            variant="outlined"
            className="mui-input"
            multiline
            minRows={2}
            maxRows={6}
          />
        </div>
      </div>
    </>
  );
};

const CreateJobPost = () => {
  // const [position, setPosition] = useState("");
  // const [jobSummary, setJobSummary] = useState("");
  // const [jobType, setJobType] = useState("");
  // const [dueDate, setDueDate] = useState("");
  // const [attachedFile, setAttachedFile] = useState("");
  // const [employer, SetEmployer] = useState({}); // company name, image, about, etc.

  return (
    <div className="create-job-post">
      {/* <JobInformation /> */}
      <EmployerInformation />
    </div>
  );
};

export default CreateJobPost;
