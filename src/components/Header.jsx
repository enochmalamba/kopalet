import { useState, useRef } from "react";
import user from "../assets/user.jpeg";
import Icon from "./Icon";
import "./Header.css";
import ProfileDropMenu from "./ProfileDropMenu";
function Header() {
  const [isDropDownOpen, setIsdropDownOpen] = useState(false);
  // const avatarRef = useRef(null);
  const handleProfileClick = () => {
    setIsdropDownOpen(!isDropDownOpen);
  };

  return (
    <header>
      <div className="logo">
        <img src="/logo.png" height={"50px"} alt="" />
      </div>
      <div className="actions">
        <button>
          <Icon>search</Icon>
        </button>
        <button>
          <Icon>mail</Icon>
        </button>
        <button>
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
  );
}

export default Header;
