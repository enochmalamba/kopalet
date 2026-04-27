import { useState } from "react";
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
import "./CreateJobPost.css";

const CreateJobPost = () => {
  return (
    <form>
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
          />
        </Box>
        <Box>
          <InputLabel htmlFor="job-roles">Roles or duties</InputLabel>
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
          />
        </Box>
        <Box sx={{ display: "flex", gap: "var(--space-md)" }}>
          <TextField
            label="Work arrangement"
            variant="outlined"
            select
            defaultValue={"full-time"}
            fullWidth
            required
          >
            <MenuItem value="full-time">Full-Time</MenuItem>
            <MenuItem value="part-time">Part-Time</MenuItem>
            <MenuItem value="contract">Contract</MenuItem>
            <MenuItem value="internship">Internship</MenuItem>
          </TextField>
          <TextField
            label="Job type"
            variant="outlined"
            select
            defaultValue={"on-site"}
            fullWidth
            required
          >
            <MenuItem value="on-site">On-Site</MenuItem>
            <MenuItem value="remote">Remote</MenuItem>
            <MenuItem value="hybrid">Hybrid</MenuItem>
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
          />
        </Box>
        <Box
          sx={{ display: "flex", gap: "var(--space-md)", alignItems: "center" }}
        >
          <Button startIcon={<CameraAltOutlined />} variant="outlined">
            Upload company logo
          </Button>
          <Box
            component={"img"}
            alt="Company logo"
            src="/default-company-logo.png"
            sx={{
              maxWidth: "80px",
              height: "80px",
              backgroundColor: "var(--muted)",
              borderRadius: "var(--radius-md)",
            }}
          />
        </Box>{" "}
        <FormHelperText>
          The logo can be any image that represents you or your business. The
          photo is however optional.
        </FormHelperText>
        <Typography>How to apply</Typography>{" "}
        <Box>
          <InputLabel>Application instructions</InputLabel>
          <TextField
            multiline
            fullWidth
            id="applications-instructions"
            name="applications-instructions"
            minRows={3}
            maxRows={10}
            required
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
