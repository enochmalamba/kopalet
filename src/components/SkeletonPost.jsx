import Skeleton from "@mui/material/Skeleton";
import "./SkeletonPost.css";

function SkeletonPost() {
  return (
    <div className="skeleton-post">
      <div className="skeleton-post-top">
        <Skeleton variant="circular" width={40} height={40} />
        <Skeleton variant="text" sx={{ fontSize: "1rem" }} width={200} />
      </div>
      <Skeleton variant="text" sx={{ fontSize: "5rem" }} />
      {/* <div className="skeleton-post-reactions">
        <Skeleton variant="text" sx={{ fontSize: "1.5rem" }} width={90} />
        <Skeleton variant="text" sx={{ fontSize: "1.5rem" }} width={90} />
        <Skeleton variant="text" sx={{ fontSize: "1.5rem" }} width={90} />
      </div> */}
    </div>
  );
}

export default SkeletonPost;
