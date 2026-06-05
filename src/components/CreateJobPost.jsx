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
import Alert from "@mui/material/Alert";

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
  const [applicationInstructions, setApplicationInstructions] = useState("");
  const [employerLogo, setEmployerLogo] = useState(null);
  const [experienceLevel, setExperienceLevel] = useState("mid");
  const [applicationDeadline, setApplicationDeadline] = useState("");

  const [errors, setErrors] = useState({ general: null, fields: {} });
  const clearErrors = () => setErrors({ general: null, fields: {} });

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
    e.preventDefault();
    clearErrors();
    setIsPosting(true);

    const jobData = new FormData();
    jobData.append("title", title);
    jobData.append("body", summary);

    cleanLinesArray(roles).forEach((item, i) =>
      jobData.append(`duties[${i}]`, item),
    );
    cleanLinesArray(requirements).forEach((item, i) =>
      jobData.append(`requirements[${i}]`, item),
    );
    cleanLinesArray(qualifications).forEach((item, i) =>
      jobData.append(`qualifications[${i}]`, item),
    );
    cleanLinesArray(benefits).forEach((item, i) =>
      jobData.append(`benefits[${i}]`, item),
    );

    jobData.append("location", location);
    jobData.append("work_mode", workMode);
    jobData.append("job_type", jobType);
    jobData.append("employer_name", employerName);
    jobData.append("experience_level", experienceLevel);
    jobData.append("application_instructions", applicationInstructions);

    // only append deadline if actually set
    if (applicationDeadline) {
      jobData.append("application_deadline", applicationDeadline);
    }

    if (employerLogo) {
      jobData.append("media[]", employerLogo);
    }

    axiosInstance
      .post("/v1/listings/job", jobData, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then((response) => {
        navigate(`/vacancy/${response.data.data.id}`);
      })
      .catch((error) => {
        if (!error.response) {
          setErrors({
            general:
              "Could not reach the server. Check your connection and try again.",
            fields: {},
          });
          return;
        }

        const { status, data } = error.response;

        switch (status) {
          case 422:
            setErrors({
              general:
                data.message ||
                "Some fields have errors. Please review and try again.",
              fields: data.errors || {},
            });
            break;
          case 401:
            setErrors({
              general: "Your session has expired. Please log in again.",
              fields: {},
            });
            break;
          case 403:
            setErrors({
              general: "You do not have permission to post jobs.",
              fields: {},
            });
            break;
          case 413:
            setErrors({
              general: "The uploaded logo is too large. Maximum is 2MB.",
              fields: {},
            });
            break;
          case 429:
            setErrors({
              general:
                "You are submitting too fast. Please wait and try again.",
              fields: {},
            });
            break;
          case 500:
          default:
            setErrors({
              general:
                data?.message ||
                "Something went wrong on our end. Please try again later.",
              fields: {},
            });
        }
      })
      .finally(() => setIsPosting(false));
  }
  return (
    <form onSubmit={handleSubmit}>
      {errors.general && (
        <Alert
          severity="error"
          onClose={clearErrors}
          sx={{ marginBottom: "var(--space-sm)" }}
        >
          {errors.general}
        </Alert>
      )}
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
            fullWidth
            required
            name="job-title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            error={!!errors.fields?.title}
            helperText={
              errors.fields?.title?.[0] ?? "e.g Secretary, Hiring Manager"
            }
          />
        </Box>
        <Box>
          <InputLabel htmlFor="job-summary">Job summary</InputLabel>
          <TextField
            id="job-summary"
            multiline
            minRows={3}
            maxRows={4}
            variant="outlined"
            fullWidth
            required
            value={summary}
            onChange={(e) => setSummary(e.target.value)}
            error={!!errors.fields?.body}
            helperText={
              errors.fields?.body?.[0] ??
              "Briefly describe the job role and/or the employer"
            }
          />
        </Box>
        <Box>
          <InputLabel htmlFor="job-roles">
            Roles/Duties/Responsibilities
          </InputLabel>
          <TextField
            id="job-roles"
            name="job-roles"
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
            fullWidth
            required
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            error={!!errors.fields?.location}
            helperText={
              errors.fields?.location?.[0] ?? "e.g Lilongwe, Chilinde, Blantyre"
            }
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
        <Box>
          <InputLabel htmlFor="experience-level">Experience Level</InputLabel>
          <TextField
            id="experience-level"
            variant="outlined"
            select
            fullWidth
            value={experienceLevel}
            onChange={(e) => setExperienceLevel(e.target.value)}
            error={!!errors.fields?.experience_level}
            helperText={errors.fields?.experience_level?.[0]}
          >
            <MenuItem value="entry">Entry</MenuItem>
            <MenuItem value="mid">Mid</MenuItem>
            <MenuItem value="senior">Senior</MenuItem>
            <MenuItem value="executive">Executive</MenuItem>
          </TextField>
        </Box>
        <Typography>Employer details</Typography>{" "}
        <Box>
          <InputLabel htmlFor="employer-name">Employer name</InputLabel>
          <TextField
            id="employer-name"
            variant="outlined"
            fullWidth
            required
            value={employerName}
            onChange={(e) => setEmployerName(e.target.value)}
            error={!!errors.fields?.employer_name}
            helperText={
              errors.fields?.employer_name?.[0] ??
              "Company name, business name, or individual name."
            }
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
            error={!!errors.fields?.application_instructions}
            helperText={errors.fields?.application_instructions?.[0]}
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
            error={!!errors.fields?.application_deadline}
            helperText={errors.fields?.application_deadline?.[0]}
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
