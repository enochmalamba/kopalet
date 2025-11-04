import Icon from "./Icon";
import "./Post.css";

function Post() {
  return (
    <div className="post">
      <div className="post-content">
        <div className="post-text">
          <div className="post-header">
            <div className="post-header-left">
              <div className="post-author-avatar">
                <img src="https://avatar.iran.liara.run/public/95" alt="" />
              </div>
              <div className="post-header-details">
                <p className="post-author-name">Hamed Henderson</p>
                <p className="muted-text ">
                  <span className="post-time">3h</span>
                  &bull;
                  <span className="post-type promoted">
                    <Icon>campaign</Icon> Promoted
                  </span>
                </p>
              </div>
            </div>
            <button className="post-header-action">
              <Icon>more_vert</Icon>
            </button>
          </div>
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
              <button className="downvote-btn ">
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
