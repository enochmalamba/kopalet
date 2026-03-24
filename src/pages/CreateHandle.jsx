import { useState } from "react";
import { useNavigate } from "react-router-dom";
import CreateJobPost from "../components/CreateJobPost";
import CreateMarketItem from "../components/CreateMarketItem";
import CreateGeneralPost from "../components/CreateGeneralPost";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import NotesIcon from "@mui/icons-material/Notes";
import "../assets/style/CreatePost.css";

function TabPanel({ value, index, children }) {
  if (value !== index) return null;
  return <div>{children}</div>;
}

const CreateHandle = () => {
  const [value, setValue] = useState(0);
  const navigate = useNavigate();
  return (
    <>
      <Box
        sx={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Box
          sx={{ display: "flex", alignItems: "center", gap: "var(--space-md)" }}
        >
          <IconButton
            aria-label="back"
            size="small"
            onClick={() => navigate(-1)}
          >
            <ArrowBackIosNewIcon sx={{ width: "18px", height: "18px" }} />
          </IconButton>
          <h4>Create</h4>
        </Box>
        <Button size="small" variant="text">
          <NotesIcon sx={{ marginRight: "4px" }} />
          Drafts
        </Button>
      </Box>
      <Tabs
        value={value}
        onChange={(e, v) => setValue(v)}
        scrollButtons
        allowScrollButtonsMobile
        aria-label="scrollable force tabs example"
      >
        <Tab label="Vacancy" />
        <Tab label="Market item" />
        <Tab label="Post" />
      </Tabs>
      {""}
      <TabPanel value={value} index={0}>
        <CreateJobPost />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <CreateMarketItem />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <CreateGeneralPost />
      </TabPanel>
    </>
  );
};

export default CreateHandle;
