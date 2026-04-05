import { Helmet } from "react-helmet-async";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import DetailPageHeader from "../components/DetailPageHeader";

function VacancyView() {
  return (
    <Box>
      <Helmet>
        <title>Vacancy Details - Kopalet</title>
        <meta name="description" content="Details of the selected vacancy" />
      </Helmet>
      <DetailPageHeader heading="Vacancy Details" />
      <Box>
        {" "}
        <Typography variant="h5">Human Resource Manager</Typography>
        <Box
          sx={{
            display: "flex",
            gap: "var(--space-md)",
            alignItems: "start",
            flex: 1,
          }}
        >
          <Box
            component="img"
            src="/products/clothes.jpg"
            sx={{
              height: "60px",
              width: "60px",
              objectFit: "cover",
              borderRadius: "var(--radius-md)",
            }}
          />
          <Box>
            <Typography variant="body">
              MPLO Landscaping and Cleaning
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Lilongwe, Malawi
            </Typography>
          </Box>
        </Box>
        <Typography variant="body">Job Description</Typography>
        <Typography variant="body1" color="var(--muted)">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quidem
          dolorem dolorum modi rerum, dignissimos aliquid hic provident non
          doloremque reiciendis voluptatibus libero incidunt, culpa distinctio
          nisi totam at voluptate repudiandae!
        </Typography>
        <Typography variant="body">Requirements</Typography>
        <ul style={{ listStyleType: "disc" }}>
          <li style={liStyle}>
            Holder of Malawi School Certificate of Education
          </li>
          <li style={liStyle}>Not a minor, prefebaly a teen tho</li>
          <li style={liStyle}>Must be from Area 49 </li>
        </ul>
      </Box>
    </Box>
  );
}

export default VacancyView;

const liStyle = {
  color: "var(--muted) ",
  paddingLeft: "var(--space-xs)",
};
