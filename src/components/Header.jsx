import { useState, useRef } from "react";
import user from "../assets/user.jpeg";
import Icon from "./Icon";
import PostDialog from "./PostDialog";
import "./Header.css";
import ProfileDropMenu from "./ProfileDropMenu";
function Header({ handleNavClick }) {
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
          <button className="menu-button" onClick={handleNavClick}>
            <Icon>density_medium</Icon>
          </button>
          <div className="logo">
            <img src="/logo.png" alt="Kopalet logo" />
          </div>
        </div>
        <div className="actions">
          {/* <button>
          <Icon>search</Icon>
        </button> */}
          <button>
            <Icon>mail</Icon>
          </button>
          <button onClick={handleCreateClick}>
            <Icon>add_box</Icon>
            <div>Create</div>
          </button>
          <div className="header-avatar">
            <img
              src={user}
              alt="User avatar"
              // ref={avatarRef}
              onClick={handleProfileClick}
            />
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
