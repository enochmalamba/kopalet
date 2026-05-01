import { useSession } from "../context/sessionContext";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Tooltip from "@mui/material/Tooltip";
import Avatar from "@mui/material/Avatar";
import Icon from "./Icon";
import "./Header.css";
import AvatarMenu from "./AvatarMenu";

function Header({ handleNavClick, isNavOpen }) {
  const [anchorMenu, setAnchorMenu] = useState(null);
  const menuOpen = Boolean(anchorMenu);

  const { isAuthenticated, user } = useSession();
  const navigate = useNavigate();

  const handleAvatarClick = (e) => {
    setAnchorMenu(e.currentTarget);
  };
  // navigation clicks
  const goToCreatePage = () => navigate("/create");

  const goToMailBox = () => navigate("/mailbox");

  return (
    <>
      <header>
        <div className="header-left">
          <Tooltip title="Toggle Navigation">
            <button className="menu-button" onClick={handleNavClick}>
              <Icon>{isNavOpen ? "close" : "density_medium"}</Icon>
            </button>
          </Tooltip>
          <div className="logo">KOPALET</div>
        </div>
        <div className="actions">
          <Tooltip title="Mailbox" onClick={goToMailBox}>
            <button>
              <Icon>mail</Icon>
            </button>
          </Tooltip>
          <Tooltip title="Create post">
            <button onClick={goToCreatePage}>
              <Icon>add_box</Icon>
              <div>Create</div>
            </button>
          </Tooltip>
          <div className="header-avatar">
            <Avatar
              src={isAuthenticated ? user.avatar_url : "/src/assets/user.jpeg"}
              alt={isAuthenticated ? user.username : "Profile"}
              onClick={handleAvatarClick}
              sx={{ width: 30, height: 30 }}
            />

            <AvatarMenu
              anchorMenu={anchorMenu}
              menuOpen={menuOpen}
              setAnchorMenu={setAnchorMenu}
            />
          </div>
        </div>
      </header>
    </>
  );
}

export default Header;
