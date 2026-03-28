import PostHeader from "./PostHeader";
import Icon from "./Icon";
import "./Post.css";

function Post() {
  return (
    <div className="post">
      <div className="post-content">
        <div className="post-text">
          <PostHeader
            avatarSrc={
              "https://i.pinimg.com/1200x/93/83/4f/93834f489444f5549adaa676d2945b8c.jpg"
            }
            authorName={"Enoch Malamba "}
            timePosted={"3hr ago"}
            isPromoted={false}
            audience={"Public"}
          />
          <div className="post-text">
            <p className="muted-text">
              Lorem ipsum dolor sit amet consectetur elit. Quae.... <i>more</i>
            </p>
          </div>
          <div className="post-image">
            <img
              src="https://i.pinimg.com/1200x/93/83/4f/93834f489444f5549adaa676d2945b8c.jpg"
              alt=""
            />
          </div>
          <div className="post-actions">
            <div className="vote-actions">
              <button className="upvote-btn ">
                <Icon>north</Icon> 99K
              </button>
              <button className="downvote-btn">
                <Icon>south</Icon>
              </button>
            </div>
            <button className="comment-btn">
              <Icon>comment</Icon> 33.5K
            </button>
            <button className="share-btn">
              <Icon>share</Icon> 2.5K
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Post;
