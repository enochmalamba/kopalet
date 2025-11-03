import "./Sidebar.css";
function Sidebar() {
  return (
    <div className="sidebar">
      {" "}
      <div className="sidebar-ad">
        <img
          src="https://www.adobe.com/express/create/media_1345301ee7fa6c13e893b06604aa5a5d926c8cc62.png?width=750&format=png&optimize=medium"
          alt="Ad"
        />
      </div>
      <div className="sidebar-ad">
        <h2>This can be an ad</h2>
        <p>or something else</p>
        <p></p>
      </div>
    </div>
  );
}
export default Sidebar;
