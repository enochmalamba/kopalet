import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import Chip from "@mui/material/Chip";
import Divider from "@mui/material/Divider";
import { useShare } from "../hooks/useShare";
import { formatTimeAgo } from "../utils/format";

import BookmarkBorderOutlinedIcon from "@mui/icons-material/BookmarkBorder";
import Share from "@mui/icons-material/Share";
import FmdGoodOutlinedIcon from "@mui/icons-material/FmdGoodOutlined";
import UpdateOutlinedIcon from "@mui/icons-material/UpdateOutlined";
import HomeWorkOutlinedIcon from "@mui/icons-material/HomeWorkOutlined";
function JobCard({ job }) {
  const navigate = useNavigate();
  const { share } = useShare();
  const handleNavigate = (id) => navigate(`/vacancy/${id}`);

  const handleShare = (e) => {
    e.stopPropagation();
    share({
      title: vacancy.title,
      text: `${vacancy.title} at ${employer.name}`,
      url: `https://kopalet.com/vacancy/${job.id}`,
    });
  };
  const { author, listing: vacancy, id: jobId, employer } = job;
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: "var(--space-md)",
        width: "min(550px, 100%)",
        borderBottom: "1px solid var(--border)",
        padding: "var(--space-sm) var(--space-md)",
      }}
    >
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "50px 1fr auto",
          gap: "var(--space-sm)",
          alignItems: "start",
        }}
      >
        <Box
          sx={{
            width: "50px",
            height: "50px",
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
        <Box sx={{ border: ".5px solid var(--border)" }}>
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
        <Chip
          icon={<UpdateOutlinedIcon />}
          label={vacancy.job_type}
          variant="outlined"
        />
        <Chip
          icon={<HomeWorkOutlinedIcon />}
          label={vacancy.work_mode}
          variant="outlined"
        />
        <Chip
          icon={<FmdGoodOutlinedIcon />}
          label={vacancy.location}
          variant="outlined"
        />
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
          <IconButton variant="secondary" size="small" onClick={handleShare}>
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
