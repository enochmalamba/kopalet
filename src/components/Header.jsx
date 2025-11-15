import { useState, useRef } from "react";
import Tooltip from "@mui/material/Tooltip";
import Icon from "./Icon";
import PostDialog from "./PostDialog";
import "./Header.css";
import ProfileDropMenu from "./ProfileDropMenu";

function Header({ handleNavClick, isNavOpen }) {
  const [isDropDownOpen, setIsdropDownOpen] = useState(false);
  const [isPostDialogOpen, setIsPostDialogOpen] = useState(false);

  // const avatarRef = useRef(null);
  const handleProfileClick = () => {
    setIsdropDownOpen(!isDropDownOpen);
  };
  const handleCreateClick = () => {
    setIsPostDialogOpen(true);
  };

  return (
    <>
      <PostDialog
        isPostDialogOpen={isPostDialogOpen}
        setIsPostDialogOpen={setIsPostDialogOpen}
      />
      <header>
        <div className="header-left">
          <Tooltip title="Toggle Navigation">
            <button className="menu-button" onClick={handleNavClick}>
              <Icon>{isNavOpen ? "close" : "density_medium"}</Icon>
            </button>
          </Tooltip>
          <div className="logo">
            <img src="/logo.png" alt="Kopalet logo" />
          </div>
        </div>
        <div className="actions">
          {/* <button>
          <Icon>search</Icon>
        </button> */}
          <Tooltip title="Mailbox">
            <button>
              <Icon>mail</Icon>
            </button>
          </Tooltip>
          <Tooltip title="Create post">
            <button onClick={handleCreateClick}>
              <Icon>add_box</Icon>
              <div>Create</div>
            </button>
          </Tooltip>
          <div className="header-avatar">
            <Tooltip title="You">
              <img
                src="https://ulavi.online/uploads/profiles/enochmalamba.png"
                alt="User avatar"
                // ref={avatarRef}
                onClick={handleProfileClick}
              />
            </Tooltip>
            <ProfileDropMenu
              isDropDownOpen={isDropDownOpen}
              // triggerRef={avatarRef}
              // onClose={() => setIsdropDownOpen(false)}
            />
          </div>
        </div>
      </header>
    </>
  );
}

export default Header;
