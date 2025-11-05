import "./PostDialog.css";
import Icon from "./Icon";
function PostDialog({ isPostDialogOpen, setIsPostDialogOpen }) {
  const closeDialog = () => setIsPostDialogOpen(false);
  return (
    <div
      className={`post-dialog-overlay ${isPostDialogOpen && "opened"}`}
      onClick={closeDialog}
    >
      {" "}
      <div className={`post-dialog ${isPostDialogOpen && "opened"}`}>
        {" "}
        <button onClick={closeDialog}>
          <Icon>close</Icon>
        </button>
        <h3>What do you want to post?</h3>
        <label htmlFor="job_vacancy">
          <div>
            <p>Job vacany</p>
            <p className="muted-text">Find the right people for your team</p>
          </div>
          <input type="radio" name="post_type" id="job_vacancy" />
        </label>
        <label htmlFor="market_item">
          <div>
            <p>Market item</p>
            <p className="muted-text">List a product or property to sell</p>
          </div>
          <input type="radio" name="post_type" id="market_item" />
        </label>{" "}
        <label htmlFor="social_post">
          <div>
            <p>Social post</p>
            <p className="muted-text">
              Share ideas, tips, or ask meaningful questions
            </p>
          </div>
          <input type="radio" name="post_type" id="social_post" />
        </label>
        <div className="post-dialog-btns">
          <button onClick={closeDialog}>Cancel</button>
          <button className="start-post">Start</button>
        </div>
      </div>
    </div>
  );
}

export default PostDialog;
