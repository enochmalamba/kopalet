import CreateJobPost from "../components/CreateJobPost";
import CreateGeneralPost from "../components/CreateGeneralPost";
import "../assets/style/CreatePost.css";

const CreateMarketItem = () => {
  return (
    <div>
      <h1>create market item form here</h1>
    </div>
  );
};

function CreateHandle({ type = "general-post" }) {
  return (
    <div className="create-post-container">
      {type === "job" && <CreateJobPost />}
      {type === "market-item" && <CreateMarketItem />}
      {type === "general-post" && <CreateGeneralPost />}
    </div>
  );
}

export default CreateHandle;
