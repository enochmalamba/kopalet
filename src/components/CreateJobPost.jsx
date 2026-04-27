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
import "./CreateJobPost.css";

const CreateJobPost = () => {
  return (
    <form>
      <Box>
        <Typography>Job details</Typography>
        <TextField
          label="Position"
          variant="outlined"
          helperText="e.g Secretary, Hiring Manager"
          fullWidth
          required
        />
        <TextField
          label="Job summary"
          helperText="Briefly describe the job role and/or the employer"
          multiline
          minRows={3}
          maxRows={4}
          variant="outlined"
          fullWidth
          required
        />

        <TextField
          label="Location"
          variant="outlined"
          helperText="e.g Lusaka, Livingstone"
          fullWidth
          required
        />
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
        <Typography>Employer details</Typography>
        <TextField
          label="Company name"
          variant="outlined"
          helperText="if individual, enter your name"
          fullWidth
          required
        />
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
        </Box>
        <FormHelperText>
          Upload your company logo, if individual add picture of your
          business{" "}
        </FormHelperText>
      </Box>
    </form>
  );
};

export default CreateJobPost;
