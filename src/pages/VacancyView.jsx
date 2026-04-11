import { Helmet } from "react-helmet-async";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Chip from "@mui/material/Chip";
import DetailPageHeader from "../components/DetailPageHeader";
import { formatTimeAgo, formatTimeStamp, formatMoney } from "../utils/format";

import { job } from "../data";
function VacancyView() {
  const {
    company,
    job_title,
    job_desc_overview,
    job_description,
    responsibilities,
    requirements,
    employment_type,
    work_mode,
    experience_level,
    salary_grade,
    salary_range,
    benefits,

    application_deadline,
    application_email,
    location,
  } = job;
  return (
    <Box>
      <Helmet>
        <title>Vacancy Details - Kopalet</title>
        <meta name="description" content="Details of the selected vacancy" />
      </Helmet>
      <DetailPageHeader heading="Vacancy Details" />
      <Stack direction={"column"} gap={"var(--space-sm)"}>
        <Typography variant="h5">{job_title}</Typography>
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
            src={company.logo_url}
            alt={company.name + "Logo - Kopalet Job Vacancies"}
            sx={{
              height: "60px",
              width: "60px",
              objectFit: "cover",
              borderRadius: "var(--radius-md)",
            }}
          />
          <Box>
            <Typography variant="body">{company.name}</Typography>
            <Typography variant="body1" color="text.secondary">
              {company.location}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              {formatTimeAgo(application_deadline)}
            </Typography>
          </Box>
        </Box>
        <Box>
          <Title>Highlights</Title>
          <Stack
            direction={"row"}
            gap={"var(--space-xs)"}
            flexWrap={"wrap"}
            margin={"var(--space-md) 0"}
          >
            <GetChip>{employment_type}</GetChip>
            <GetChip>{work_mode}</GetChip>

            <GetChip>{salary_grade}</GetChip>
          </Stack>

          <Typography>
            <span>Deadline: </span>
            {formatTimeStamp(application_deadline)}
          </Typography>
          <Typography>
            <span>Experience level: </span>
            {experience_level}
          </Typography>
          <Typography>
            <span>Salary range: </span>
            {formatMoney(salary_range.min)}
            <pre style={{ display: "inline" }}> - </pre>
            {formatMoney(salary_range.max)}
          </Typography>
        </Box>
        <Box>
          <Title>Overview</Title>
          <Typography variant="body1">{job_desc_overview}</Typography>
        </Box>
        <Box>
          <Title>Description</Title>
          <Typography variant="body1">{job_description}</Typography>
        </Box>
        <Box>
          <Title>Responsibilities</Title>

          {responsibilities.map((res, index) => (
            <Typography
              key={index + res}
              variant="body1"
              sx={{
                display: "flex",
                justifyContent: "start",
                gap: "var(--space-sm)",
              }}
            >
              <span>-</span>
              {res}
            </Typography>
          ))}
        </Box>
        <Box>
          <Title>Requirements</Title>

          {requirements.map((req, index) => (
            <Typography
              key={index + req}
              variant="body1"
              sx={{
                display: "flex",
                justifyContent: "start",
                gap: "var(--space-sm)",
              }}
            >
              <span>-</span>
              {req}
            </Typography>
          ))}
        </Box>
        <Box>
          <Title>Benefits</Title>

          {benefits.map((ben, index) => (
            <Typography
              key={index + ben}
              variant="body1"
              sx={{
                display: "flex",
                justifyContent: "start",
                gap: "var(--space-sm)",
              }}
            >
              <span>-</span>
              {ben}
            </Typography>
          ))}
        </Box>
        <Box>
          <Title>Application Method(s)</Title>
          <Typography variant="body1">
            Candidates who meet the above stated requirements should send a copy
            of their National ID, curriculum vitae, qualifications, cover letter
            to {application_email}
          </Typography>
        </Box>
      </Stack>
    </Box>
  );
}

export default VacancyView;

const Title = ({ children }) => {
  return (
    <Typography variant="body" fontWeight="var(--fw-bold)">
      {children}
    </Typography>
  );
};
const GetChip = ({ children, icon }) => {
  return (
    <Chip
      label={children}
      variant="outlined"
      sx={{ textTransform: "capitalize" }}
      icon={icon}
    />
  );
};
