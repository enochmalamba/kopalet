import { Link } from "react-router-dom";
import Icon from "./Icon";
import PostHeader from "./PostHeader";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Share from "@mui/icons-material/Share";

import "./JobPost.css";
function JobPost() {
  return (
    <div className="job-post">
      <PostHeader
        avatarSrc={"https://avatar.iran.liara.run/public/96"}
        authorName={"Hamed Henderson"}
        timePosted={"1 day"}
        // isPromoted={true}
        audience={"Vacancy"}
      />
      <div className="job-post-container">
        <div className="job-post-details">
          <div className="company-logo">
            <img
              src="https://images.africanfinancials.com/mw-tnm-logo.png"
              alt="Company logo"
            />
          </div>
          <div className="job-highlights">
            <h2>UX/UI Designer </h2>
            <p>Telekom Networks Malawi (TNM)</p>
            <p className="muted-text">
              <span>Full Time</span> | <span>Malawi</span>
            </p>
          </div>
        </div>{" "}
      </div>{" "}
      {/* <div className="job-post-image">
        <img
          src="https://www.escom.mw/wp-content/uploads/2025/02/IMG-20250212-WA0025-1-776x1024.jpg"
          alt=""
        />
      </div> */}
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "50% 30% 10%",
          gap: "var(--space-2xs)",
        }}
      >
        <Link to={"/vacancy/34"}>
          <Button variant="contained" size="small" fullWidth>
            Details
          </Button>
        </Link>
        <Button variant="outlined" size="small">
          Save
        </Button>
        <Button variant="outlined" size="small">
          <Share sx={{ width: "18px", height: "18px" }} />
        </Button>
      </Box>
    </div>
  );
}

export default JobPost;
