import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import Chip from "@mui/material/Chip";
import Divider from "@mui/material/Divider";

import BookmarkBorderOutlinedIcon from "@mui/icons-material/BookmarkBorder";
import Share from "@mui/icons-material/Share";
function JobCard() {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: "var(--space-md)",
        width: "min(550px, 100%)",
        background: " var(--surface)",
        borderRadius: "var(--radius-md)",
        padding: "var(--space-sm) var(--space-md)",
      }}
    >
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "60px calc(100% - 100px) 30px",
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
            src="/products/clothes.jpg"
            alt="{PRODUCT.product_name}"
            sx={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />
        </Box>
        <Box sx={{ flex: 1, display: "flex", flexDirection: "column" }}>
          <Typography variant="body">Human Resource Manager</Typography>
          <Typography
            color="text.secondary"
            noWrap
            sx={{
              minWidth: 0,
              lineHeight: 1,
              m: 0,
            }}
          >
            MPLO Landscaping & Cleaners
          </Typography>
        </Box>
        <IconButton size="small">
          <BookmarkBorderOutlinedIcon />
        </IconButton>
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
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quod nisi nam
        neque corrupti laborum. Laboriosam dolore nam, facere exercitationem
        officiis blanditiis nihil porro consectetur rerum deserunt? Sapiente
        labore non deleniti?
      </Typography>
      <Box
        sx={{
          display: "flex",
          gap: "var(--space-2xs)",
          alignItems: "center",
        }}
      >
        <Chip label="Full-time" size="small" />
        <Chip label="Lilongwe" size="small" />
        <Chip label="On-site" size="small" />
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
          2d ago - 220 views
        </Typography>{" "}
        <Box
          sx={{ display: "flex", alignItems: "center", gap: "var(--space-sm)" }}
        >
          <IconButton variant="secondary" size="small">
            <Share />
          </IconButton>
          <Button variant="outlined">Details</Button>
        </Box>
      </Box>
    </Box>
  );
}

export default JobCard;
