import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axiosInstance from "../api/axios";
import SEO from "../components/SEO";
import { truncateText } from "../utils/seo";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Chip from "@mui/material/Chip";
import Avatar from "@mui/material/Avatar";
import Divider from "@mui/material/Divider";
import DetailPageHeader from "../components/DetailPageHeader";
import { formatTimeAgo, formatTimeStamp, formatMoney } from "../utils/format";
import { preserveLineBreaks } from "../utils/textFormat";
import AdBanner from "../components/AdBanner";
import FeedbackState from "../components/ui/FeedbackState";

function VacancyView() {
  const [jobData, setJobData] = useState(null);
  const [errorStatus, setErrorStatus] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();
  const isValidId = (value) => /^\d+$/.test(value);

  const fetchJobData = async () => {
    setJobData(null);
    setErrorStatus(null);

    if (!isValidId(id)) {
      setErrorStatus(404);
      setJobData({ error: true });
      return;
    }

    try {
      const response = await axiosInstance.get(`/v1/jobs/${id}`);
      setJobData(response.data);
    } catch (error) {
      console.error("Error fetching job data:", error);
      setErrorStatus(error.response?.status || null);
      setJobData({ error: true });
    }
  };

  useEffect(() => {
    if (id) fetchJobData();
  }, [id]);

  const goBackOrToJobs = () => {
    if (window.history.length > 1) {
      navigate(-1);
    } else {
      navigate("/jobs");
    }
  };

  if (!jobData)
    return (
      <>
        <SEO
          title="Loading vacancy... | Kopalet"
          description="Loading vacancy details on Kopalet."
          url={`/job/${id}`}
          type="article"
        />
        <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
          <Typography>Loading job details...</Typography>
        </Box>
      </>
    );

  if (jobData.error) {
    const isNotFound = errorStatus === 404;

    return (
      <>
        <SEO
          title={
            isNotFound
              ? "Vacancy Not Found - Kopalet"
              : "Couldn't Load Vacancy - Kopalet"
          }
          description="The requested job vacancy could not be loaded."
          url={`/job/${id}`}
          type="article"
        />
        <Box sx={{ p: 2 }}>
          {isNotFound ? (
            <FeedbackState
              title="Job vacancy not found"
              icon="planet-outline"
              description="This job posting may have been removed or the link is incorrect."
              primaryAction={{
                label: "Explore other jobs",
                onClick: goBackOrToJobs,
              }}
            />
          ) : (
            <FeedbackState
              icon="cloud-offline-outline"
              title="Couldn't load vacancy"
              description="Check your connection and try again."
              primaryAction={{ label: "Retry", onClick: fetchJobData }}
              secondaryAction={{
                label: "Explore other jobs",
                onClick: goBackOrToJobs,
              }}
            />
          )}
        </Box>
      </>
    );
  }

  const { author, employer, listing } = jobData.data;
  const vacancyDescription = truncateText(listing.body, 160);

  return (
    <Box>
      <SEO
        title={`${listing.title} at ${employer.name}`}
        description={vacancyDescription}
        image={employer.logo_url || "/default-company-logo.png"}
        url={`/job/${id}`}
        type="article"
      />
      <DetailPageHeader heading="Job Details" />

      <AdBanner />
      <Stack direction="column" gap="var(--space-sm)">
        <Typography variant="h5">{listing.title}</Typography>

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
            src={employer.logo_url || "/default-company-logo.png"}
            alt={`${employer.name} Logo`}
            sx={{
              height: "60px",
              width: "60px",
              objectFit: "cover",
              borderRadius: "var(--radius-md)",
            }}
          />
          <Box>
            <Typography variant="body1">{employer.name}</Typography>
            <Typography variant="body1" color="text.secondary">
              {listing.location}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              {" "}
              {formatTimeAgo(jobData.data.created_at)}
            </Typography>
          </Box>
        </Box>

        <Box>
          <Title>Highlights</Title>
          <Stack
            direction="row"
            gap="var(--space-xs)"
            flexWrap="wrap"
            margin="var(--space-md) 0"
          >
            <GetChip>{listing.job_type}</GetChip>
            <GetChip>{listing.work_mode}</GetChip>
            <GetChip>{listing.experience_level}</GetChip>
            {listing.salary.grade && <GetChip>{listing.salary.grade}</GetChip>}
            {listing.salary.min && listing.salary.max && (
              <GetChip>
                {formatMoney(listing.salary.min, listing.salary.currency)} -{" "}
                {formatMoney(listing.salary.max, listing.salary.currency)}
              </GetChip>
            )}
          </Stack>
          <Typography>
            <span>Deadline: </span>
            {formatTimeStamp(listing.application_deadline)}
          </Typography>
        </Box>

        <Box>
          <Title>Overview</Title>
          <Typography variant="body1">
            {preserveLineBreaks(listing.body)}
          </Typography>
        </Box>

        {listing.duties?.length > 0 && (
          <Box>
            <Title>Duties</Title>
            {listing.duties.map((item, index) => (
              <Typography
                key={index}
                variant="body1"
                sx={{ display: "flex", gap: "var(--space-sm)" }}
              >
                <span>-</span>
                {item}
              </Typography>
            ))}
          </Box>
        )}

        {listing.requirements?.length > 0 && (
          <Box>
            <Title>Requirements</Title>
            {listing.requirements.map((item, index) => (
              <Typography
                key={index}
                variant="body1"
                sx={{ display: "flex", gap: "var(--space-sm)" }}
              >
                <span>-</span>
                {item}
              </Typography>
            ))}
          </Box>
        )}

        {listing.qualifications?.length > 0 && (
          <Box>
            <Title>Qualifications</Title>
            {listing.qualifications.map((item, index) => (
              <Typography
                key={index}
                variant="body1"
                sx={{ display: "flex", gap: "var(--space-sm)" }}
              >
                <span>-</span>
                {item}
              </Typography>
            ))}
          </Box>
        )}

        {listing.benefits?.length > 0 && (
          <Box>
            <Title>Benefits</Title>
            {listing.benefits.map((item, index) => (
              <Typography
                key={index}
                variant="body1"
                sx={{ display: "flex", gap: "var(--space-sm)" }}
              >
                <span>-</span>
                {item}
              </Typography>
            ))}
          </Box>
        )}

        {listing.application_instructions && (
          <Box>
            <Title>Application Method(s)</Title>
            <Typography variant="body1" component={"div"}>
              {preserveLineBreaks(listing.application_instructions)}
            </Typography>
          </Box>
        )}
      </Stack>

      <Box
        sx={{
          marginTop: "var(--space-lg)",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <center>
          <i>-- End --</i>
        </center>
        <Divider />
        <Typography sx={{ paddingTop: "var(--space-md)" }}>
          Posted by
        </Typography>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: "var(--space-xs)",
          }}
        >
          <Avatar
            src={author.avatar}
            alt={author.name}
            sx={{ width: "25px", height: "25px" }}
          />{" "}
          <Typography variant="body2" fontWeight={"var(--fw-bold)"}>
            {author.name}
          </Typography>
        </Box>
        <Divider sx={{ paddingTop: "var(--space-md)" }} />
      </Box>
    </Box>
  );
}

export default VacancyView;

const Title = ({ children }) => (
  <Typography variant="body1" fontWeight="var(--fw-bold)">
    {children}
  </Typography>
);

const GetChip = ({ children, icon }) => (
  <Chip
    label={children}
    variant="outlined"
    sx={{ textTransform: "capitalize" }}
    icon={icon}
  />
);
