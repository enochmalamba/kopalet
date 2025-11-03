import { Link } from "react-router-dom";
import Icon from "./Icon";
import "./JobPost.css";
function JobPost() {
  return (
    <div className="job-post">
      <div className="job-post-header">
        <div className="job-post-author">
          <div className="jpa-avatar">
            <img
              src="https://avatar.iran.liara.run/public/95"
              alt="Job post author's avatar"
            />
          </div>
          <div className="jpa-details">
            <p className="jpa-name">Hamed Henderson</p>
            <p className="jpa-time muted-text">
              <span>3h</span> &bull;{" "}
              <div>
                <Icon>campaign</Icon> Vacancy
              </div>
            </p>
          </div>
        </div>{" "}
        <button className="jpa-action">
          <Icon>more_vert</Icon>
        </button>
      </div>
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
        </div>
      </div>
      <div className="job-post-actions">
        <Link className="job-detail-link">Details</Link>
        <button>
          <Icon>bookmark</Icon> Save
        </button>
        <button>
          <Icon>share</Icon>
        </button>
      </div>
    </div>
  );
}

export default JobPost;
