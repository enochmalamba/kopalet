import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MenuList from "@mui/material/MenuList";
import ListItemText from "@mui/material/ListItemText";
import ListItemIcon from "@mui/material/ListItemIcon";
import Divider from "@mui/material/Divider";
// outlined icons
import BubbleChartOutlinedIcon from "@mui/icons-material/BubbleChartOutlined";
import BookmarkBorderOutlinedIcon from "@mui/icons-material/BookmarkBorderOutlined";
import FolderCopyOutlinedIcon from "@mui/icons-material/FolderCopyOutlined";
import CampaignOutlinedIcon from "@mui/icons-material/CampaignOutlined";
// filled icons
import BubbleChartIcon from "@mui/icons-material/BubbleChart";
function NavMore({ anchorMenu, menuOpen, setAnchorMenu, currentPath }) {
  return (
    <Menu
      anchorEl={anchorMenu}
      open={menuOpen}
      onClose={() => setAnchorMenu(null)}
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
      transformOrigin={{ vertical: "bottom", horizontal: "right" }}
    >
      <MenuList dense>
        <MenuItem>
          <ListItemIcon>
            <BubbleChartOutlinedIcon />
          </ListItemIcon>
          <ListItemText>Communities</ListItemText>
        </MenuItem>
        <Divider />
        <MenuItem>
          <ListItemIcon>
            <BookmarkBorderOutlinedIcon />
          </ListItemIcon>
          <ListItemText>Saved</ListItemText>
        </MenuItem>
        <MenuItem>
          <ListItemIcon>
            <FolderCopyOutlinedIcon />
          </ListItemIcon>
          <ListItemText>Resources</ListItemText>
        </MenuItem>
        <Divider />
        <MenuItem sx={{ color: "#076c44" }}>
          <ListItemIcon primaryTypographyProps={{ sx: { color: "#076c44" } }}>
            <CampaignOutlinedIcon />
          </ListItemIcon>
          <ListItemText primaryTypographyProps={{ sx: { color: "#076c44" } }}>
            Advertise
          </ListItemText>
        </MenuItem>
      </MenuList>
    </Menu>
  );
}

export default NavMore;
