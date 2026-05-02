import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../api/axios.js";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import FormLabel from "@mui/material/FormLabel";
import MenuItem from "@mui/material/MenuItem";
import CameraAltOutlined from "@mui/icons-material/CameraAltOutlined";
import FormHelperText from "@mui/material/FormHelperText";
import InputLabel from "@mui/material/InputLabel";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import toast from "react-hot-toast";

const CreateJobPost = () => {
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [roles, setRoles] = useState([]);
  const [requirements, setRequirements] = useState([]);
  const [qualifications, setQualifications] = useState([]);
  const [benefits, setBenefits] = useState([]);
  const [location, setLocation] = useState("");
  const [workMode, setWorkMode] = useState("on_site");
  const [jobType, setJobType] = useState("full_time");
  const [employerName, setEmployerName] = useState("");
  const [applicationInstructions, setApplicationInstructions] = useState(" ");
  const [employerLogo, setEmployerLogo] = useState(null);
  const [experienceLevel, setExperienceLevel] = useState("mid");
  const [applicationDeadline, setApplicationDeadline] = useState(null);

  const [isPosting, setIsPosting] = useState(false);
  const logoInputRef = useRef(null);
  const navigate = useNavigate();
  const handleLogoChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("Only image files are allowed.");
      e.target.value = "";
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      alert("Image must be under 5MB.");
      e.target.value = "";
      return;
    }

    setEmployerLogo(file);
  };
  const arrayToLines = (arr) => {
    return Array.isArray(arr) ? arr.join("\n") : "";
  };

  const linesToArray = (value) => {
    return typeof value === "string" ? value.split("\n") : [];
  };

  const cleanLinesArray = (arr) => {
    return Array.isArray(arr)
      ? arr.map((line) => line.trim()).filter(Boolean)
      : [];
  };
  function handleSubmit(e) {
    setIsPosting(true);
    e.preventDefault();

    const jobDta = new FormData();
    jobDta.append("title", title);
    jobDta.append("body", summary);
    cleanLinesArray(roles).forEach((item, i) => {
      jobDta.append(`duties[${i}]`, item);
    });

    cleanLinesArray(requirements).forEach((item, i) => {
      jobDta.append(`requirements[${i}]`, item);
    });

    cleanLinesArray(qualifications).forEach((item, i) => {
      jobDta.append(`qualifications[${i}]`, item);
    });

    cleanLinesArray(benefits).forEach((item, i) => {
      jobDta.append(`benefits[${i}]`, item);
    });

    jobDta.append("location", location);
    jobDta.append("work_mode", workMode);
    jobDta.append("job_type", jobType);
    jobDta.append("employer_name", employerName);
    jobDta.append("application_instructions", applicationInstructions);
    jobDta.append("experience_level", experienceLevel);
    jobDta.append("application_deadline", applicationDeadline);
    if (employerLogo) {
      jobDta.append("media[]", employerLogo);
    }
    axiosInstance
      .post("/v1/listings/job", jobDta, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        navigate(`/vacancy/${response.data.data.id}`);
      })
      .catch((error) => {
        toast.error("Something went wrong, please try again.", {
          position: "bottom-left",
        });
      })
      .finally(() => setIsPosting(false));
  }
  return (
    <form onSubmit={handleSubmit}>
      <Backdrop
        sx={(theme) => ({ color: "#fff", zIndex: theme.zIndex.drawer + 1 })}
        open={isPosting}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "var(--space-lg)",
        }}
      >
        <Typography>Job details</Typography>
        <Box>
          <InputLabel htmlFor="job-title">Job position/tittle</InputLabel>
          <TextField
            id="job-title"
            variant="outlined"
            helperText="e.g Secretary, Hiring Manager"
            fullWidth
            required
            name="job-title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </Box>
        <Box>
          <InputLabel htmlFor="job-summary">Job summary</InputLabel>
          <TextField
            id="job-summary"
            helperText="Briefly describe the job role and/or the employer"
            multiline
            minRows={3}
            maxRows={4}
            variant="outlined"
            fullWidth
            required
            value={summary}
            onChange={(e) => setSummary(e.target.value)}
          />
        </Box>
        <Box>
          <InputLabel htmlFor="job-roles">
            Roles/Duties/Responsibilities
          </InputLabel>
          <TextField
            id="job-roles"
            name="job-roles"
            helperText="Enter one role or duty per line"
            multiline
            minRows={3}
            maxRows={10}
            variant="outlined"
            fullWidth
            required
            value={arrayToLines(roles)}
            onChange={(e) => setRoles(linesToArray(e.target.value))}
          />
        </Box>
        <Box>
          <InputLabel htmlFor="requirements">Requirements</InputLabel>
          <TextField
            id="requirements"
            name="requirements"
            helperText="Enter one requirement per line"
            multiline
            minRows={3}
            maxRows={10}
            variant="outlined"
            fullWidth
            required
            value={arrayToLines(requirements)}
            onChange={(e) => setRequirements(linesToArray(e.target.value))}
          />
        </Box>
        <Box>
          <InputLabel htmlFor="qualifications">Qualifications</InputLabel>
          <TextField
            id="qualifications"
            name="qualifications"
            helperText="Enter one qualification per line"
            multiline
            minRows={3}
            maxRows={10}
            variant="outlined"
            fullWidth
            required
            value={arrayToLines(qualifications)}
            onChange={(e) => setQualifications(linesToArray(e.target.value))}
          />
        </Box>
        <Box>
          <InputLabel htmlFor="benefits">Benefits (optional)</InputLabel>
          <TextField
            id="benefits"
            name="benefits"
            helperText="Enter one benefit per line"
            multiline
            minRows={3}
            maxRows={10}
            variant="outlined"
            fullWidth
            value={arrayToLines(benefits)}
            onChange={(e) => setBenefits(linesToArray(e.target.value))}
          />
        </Box>
        <Box>
          <InputLabel htmlFor="location">Location</InputLabel>
          <TextField
            id="location"
            name="location"
            variant="outlined"
            helperText="e.g Lilongwe, Chilinde Blantyre"
            fullWidth
            required
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
        </Box>
        <Box sx={{ display: "flex", gap: "var(--space-md)" }}>
          <TextField
            label="Work Mode"
            variant="outlined"
            select
            fullWidth
            required
            value={workMode}
            onChange={(e) => setWorkMode(e.target.value)}
          >
            <MenuItem value="on_site">On-Site</MenuItem>
            <MenuItem value="remote">Remote</MenuItem>
            <MenuItem value="hybrid">Hybrid</MenuItem>
          </TextField>
          <TextField
            label="Job Type"
            variant="outlined"
            select
            fullWidth
            required
            value={jobType}
            onChange={(e) => setJobType(e.target.value)}
          >
            <MenuItem value="full_time">Full-Time</MenuItem>
            <MenuItem value="part_time">Part-Time</MenuItem>
            <MenuItem value="contract">Contract</MenuItem>
            <MenuItem value="internship">Internship</MenuItem>
          </TextField>
        </Box>
        <Typography>Employer details</Typography>{" "}
        <Box>
          <InputLabel htmlFor="employer-name">Employer name</InputLabel>
          <TextField
            id="employer-name"
            name="employer-name"
            variant="outlined"
            fullWidth
            helperText="The employer name can be company name, business name, or individual
            name."
            required
            value={employerName}
            onChange={(e) => setEmployerName(e.target.value)}
          />
        </Box>
        <Box
          sx={{ display: "flex", gap: "var(--space-md)", alignItems: "center" }}
        >
          <Button
            startIcon={<CameraAltOutlined />}
            variant="outlined"
            onClick={() => logoInputRef.current.click()}
          >
            Upload company logo
          </Button>

          <Box
            component="img"
            alt="Company logo"
            src={
              employerLogo
                ? URL.createObjectURL(employerLogo)
                : "/default-company-logo.png"
            }
            sx={{
              maxWidth: "80px",
              height: "80px",
              objectFit: "cover",
              backgroundColor: "var(--muted)",
              borderRadius: "var(--radius-md)",
            }}
          />

          <input
            ref={logoInputRef}
            type="file"
            accept="image/*"
            style={{ display: "none" }}
            onChange={handleLogoChange}
          />
        </Box>
        <FormHelperText>
          The logo can be any image that represents you or your business. The
          photo is however optional.
        </FormHelperText>
        <Typography>How to apply</Typography>{" "}
        <Box>
          <InputLabel htmlFor="application-instructions">
            Application instructions
          </InputLabel>
          <TextField
            multiline
            fullWidth
            id="applications-instructions"
            name="applications-instructions"
            minRows={3}
            maxRows={10}
            required
            value={applicationInstructions}
            onChange={(e) => setApplicationInstructions(e.target.value)}
          />
        </Box>
        <Box>
          <InputLabel htmlFor="application-deadline">
            Application deadline
          </InputLabel>
          <TextField
            fullWidth
            type="date"
            id="applications-deadline"
            name="applications-deadline"
            required
            value={applicationDeadline}
            onChange={(e) => setApplicationDeadline(e.target.value)}
          />
        </Box>
        <Button type="submit" variant="contained">
          Post Job
        </Button>
      </Box>
    </form>
  );
};

export default CreateJobPost;
