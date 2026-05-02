import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import Chip from "@mui/material/Chip";
import Divider from "@mui/material/Divider";
import { formatTimeAgo } from "../utils/format";

import BookmarkBorderOutlinedIcon from "@mui/icons-material/BookmarkBorder";
import Share from "@mui/icons-material/Share";
function JobCard({ job }) {
  const navigate = useNavigate();
  const handleNavigate = (id) => navigate(`/vacancy/${id}`);

  const { author, listing: vacancy, id: jobId, employer } = job;
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: "var(--space-md)",
        width: "min(550px, 100%)",
        background: " var(--surface)",
        // borderRadius: "var(--radius-md)",
        padding: "var(--space-sm) var(--space-lg)",
      }}
    >
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "60px 1fr auto",
          gap: "var(--space-sm)",
          alignItems: "start",
        }}
      >
        <Box
          sx={{
            width: "60px",
            height: "60px",
            overflow: "hidden",
            borderRadius: "var(--radius-md)",
          }}
        >
          <Box
            component="img"
            src={employer.logo_url || "/default-company-logo.png"}
            alt={employer.name}
            sx={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />
        </Box>
        <Box sx={{ minWidth: 0, display: "flex", flexDirection: "column" }}>
          <Typography variant="body">{vacancy.title}</Typography>
          <Typography
            color="text.secondary"
            noWrap
            sx={{
              minWidth: 0,
              lineHeight: 1,
              m: 0,
            }}
          >
            {employer.name}
          </Typography>
        </Box>
        <Box sx={{ border: ".5px solid var(--border)", background: "red" }}>
          <IconButton>
            <BookmarkBorderOutlinedIcon />
          </IconButton>
        </Box>
      </Box>
      <Typography
        color="text.secondary"
        sx={{
          display: "-webkit-box",
          WebkitLineClamp: 2,
          WebkitBoxOrient: "vertical",
          overflow: "hidden",
          textOverflow: "ellipsis",
        }}
      >
        {vacancy.body}
      </Typography>
      <Box
        sx={{
          display: "flex",
          gap: "var(--space-2xs)",
          alignItems: "center",
        }}
      >
        <Chip label={vacancy.job_type} size="small" />
        <Chip label={vacancy.work_mode} size="small" />
        <Chip label={vacancy.location} size="small" />
        {/* 
          <GetChip>{listing.job_type}</GetChip>
            <GetChip>{listing.work_mode}</GetChip>
            <GetChip>{listing.experience_level}</GetChip>
        */}
      </Box>
      <Divider />
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography variant="caption" color="text.secondary">
          {/* 2d ago - Views */}
          {formatTimeAgo(job.created_at)}
        </Typography>{" "}
        <Box
          sx={{ display: "flex", alignItems: "center", gap: "var(--space-sm)" }}
        >
          <IconButton variant="secondary" size="small">
            <Share />
          </IconButton>
          <Button variant="outlined" onClick={() => handleNavigate(job.id)}>
            Details
          </Button>
        </Box>
      </Box>
    </Box>
  );
}

export default JobCard;
