import "./Sidebar.css";
function Sidebar() {
  return (
    <div className="sidebar">
      {" "}
      <div className="sidebar-ad">
        <img
          src="https://scontent.fllw1-1.fna.fbcdn.net/v/t39.30808-6/484331027_9580083188722534_6917989647375308895_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=3a1ebe&_nc_eui2=AeGIW9ja2T5q8j0ajtd5uysRMQLMwNWcnUoxAszA1ZydShrCifJWjrZZQEFYWCOdPiK2NHhQYpNgMMFOFGUCQKlU&_nc_ohc=j4fpLewqQV8Q7kNvwE5HN5E&_nc_oc=Adn6uLW0Rs6DIHI19-HlIigod9cuSpdYJGk5F2Ub7_5c6bGftCX35h-0YZQ-uP9mnp0&_nc_zt=23&_nc_ht=scontent.fllw1-1.fna&_nc_gid=MvmbCqMWQf3oO1_OKVwNCQ&oh=00_AfgrLMQuh3CHO9RFJl1F1qnvPtu_A8SGscUS_mJMrYU6bw&oe=690F9938"
          alt=""
        />
      </div>
      <div className="sidebar-ad">
        <h2>This can be an ad</h2>
        <p>or something else</p>
        <p></p>
      </div>
      <div className="sidebar-ad">
        <img
          src="https://www.adobe.com/express/create/media_1345301ee7fa6c13e893b06604aa5a5d926c8cc62.png?width=750&format=png&optimize=medium"
          alt="Ad"
        />
      </div>
    </div>
  );
}
export default Sidebar;
