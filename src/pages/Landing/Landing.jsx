import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Hero from "./Hero";
import Header from "./Header";
import { Button, Card, CardContent, Skeleton } from "@mui/material";
import WorkOutlineOutlinedIcon from "@mui/icons-material/WorkOutlineOutlined";
import StorefrontOutlinedIcon from "@mui/icons-material/StorefrontOutlined";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import SchoolOutlinedIcon from "@mui/icons-material/SchoolOutlined";
import Icon from "../../components/Icon";
import { Link } from "react-router-dom";
function Landing() {
  const howItWorks = [
    {
      title: "Create your account",
      description: "Sign up free with your email or google account",
    },
    {
      title: "Browse or post",
      description: "Find what you need or list what you're offering",
    },
    {
      title: "Connect and act",
      description: "Reach out, apply, or close the deal directly",
    },
  ];
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        maxWidth: "1200px",
        margin: "0 auto",
      }}
    >
      <Header />
      {/* hero */}
      <Hero />
      {/* what  you will find */}
      <Box
        width={"100%"}
        component={"section"}
        margin={"var(--space-xxl) 0"}
        padding={"0 var(--space-md)"}
      >
        <Typography variant="h6" component={"h2"} color="var(--muted)">
          What you will find
        </Typography>
        <Typography
          component={"h3"}
          fontSize={"var(--fs-xxl) "}
          lineHeight={1}
          fontWeight={"var(--fw-bold)"}
        >
          One platform, <br /> endless opportunities
        </Typography>
        <Box
          sx={{
            width: "100%",
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr",
              sm: "repeat(2, 1fr)",
            },
            gap: "var(--space-md)",
            marginTop: "var(--space-lg)",
          }}
        >
          <Card
            elevation={0}
            variant="outlined"
            sx={{ borderRadius: "var(--radius-lg)" }}
          >
            <CardContent>
              <Icon style={{ fontSize: 40, color: "var(--primary)" }}>
                business_center
              </Icon>

              <Typography
                variant="h6"
                component={"h3"}
                marginTop={"var(--space-sm)"}
              >
                Find job opportunities
              </Typography>
              <Typography color="var(--text)" marginTop={"var(--space-sm)"}>
                Discover job listings in your area, connect with employers, and
                take the next step in your career.
              </Typography>
              <Button
                variant="contained"
                size="large"
                sx={{ marginTop: "var(--space-sm)" }}
                href="/vacancies"
              >
                Browse vacancies
              </Button>
            </CardContent>
          </Card>

          <Card
            elevation={0}
            variant="outlined"
            sx={{ borderRadius: "var(--radius-lg)" }}
          >
            <CardContent>
              <Icon style={{ fontSize: 40, color: "var(--danger)" }}>
                storefront
              </Icon>
              <Typography
                variant="h6"
                component={"h3"}
                marginTop={"var(--space-sm)"}
              >
                Buy and sell locally
              </Typography>
              <Typography color="var(--text)" marginTop={"var(--space-sm)"}>
                Browse local listings, connect with sellers, and find great
                deals on products and services in your community.
              </Typography>
              <Button
                variant="contained"
                size="large"
                sx={{ marginTop: "var(--space-sm)" }}
                href="/marketplace"
              >
                Explore marketplace
              </Button>
            </CardContent>
          </Card>

          <Card
            elevation={0}
            variant="outlined"
            sx={{ borderRadius: "var(--radius-md)" }}
          >
            <CardContent>
              <Icon style={{ fontSize: 40, color: "var(--info)" }}>
                description
              </Icon>
              <Typography
                variant="h6"
                component={"h3"}
                marginTop={"var(--space-sm)"}
              >
                CV and cover letters
              </Typography>
              <Typography color="var(--text)" marginTop={"var(--space-sm)"}>
                Write a standout CV or cover letter using free and premium
                templates designed to get you noticed by employers.
              </Typography>
              <Button
                variant="contained"
                size="large"
                sx={{ marginTop: "var(--space-sm)" }}
                href="/templates"
              >
                Browse templates
              </Button>
            </CardContent>
          </Card>

          <Card
            elevation={0}
            variant="outlined"
            sx={{ borderRadius: "var(--radius-lg)" }}
          >
            <CardContent>
              <Icon style={{ fontSize: 40, color: "var(--warning)" }}>
                people_alt
              </Icon>
              <Typography
                variant="h6"
                component={"h3"}
                marginTop={"var(--space-sm)"}
              >
                Connect with professionals
              </Typography>
              <Typography color="var(--text)" marginTop={"var(--space-sm)"}>
                Build your professional network, collaborate on projects, and
                share your expertise with others in your industry.
              </Typography>
              <Button
                variant="contained"
                size="large"
                sx={{ marginTop: "var(--space-sm)" }}
                href="/signup"
              >
                Create a free account
              </Button>
            </CardContent>
          </Card>
        </Box>
      </Box>
      {/* how it works */}
      <Box
        width={"100%"}
        component={"section"}
        margin={"var(--space-xxl) 0"}
        padding={"0 var(--space-md)"}
        justifyContent={"space-between"}
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          gap: "var(--space-lg)",
          alignItems: { md: "flex-start" },
        }}
      >
        <Box sx={{ flexShrink: 0, width: "280px" }}>
          <Typography variant="h6" component={"h2"} color="var(--muted)">
            How it works
          </Typography>
          <Typography
            component={"h3"}
            fontSize={"var(--fs-xxl) "}
            lineHeight={1}
            fontWeight={"var(--fw-bold)"}
          >
            Simple enough to start today, powerful enough to grow with you.
          </Typography>
        </Box>
        <Box sx={{ width: { xs: "100%", md: "50%" } }}>
          {howItWorks.map((item, index) => (
            <Box
              key={index}
              sx={{
                display: "flex",
                alignItems: "center",
                gap: "var(--space-xl)",
                marginTop: "var(--space-lg)",
                borderBottom: "1px solid var(--muted)",
                paddingBottom: "var(--space-lg)",
              }}
            >
              <Typography variant="h4" component={"h3"}>
                {index + 1}
              </Typography>
              <Box>
                <Typography variant="h6" component={"h3"}>
                  {item.title}
                </Typography>
                <Typography>{item.description}</Typography>
              </Box>
            </Box>
          ))}
        </Box>
      </Box>
      {/* last call to create account */}
      <Box component={"section"} width={"100%"}>
        <Card
          elevation={0}
          variant="outlined"
          sx={{
            padding: "var(--space-xxl) 0",
            margin: "0 auto",
            width: { xs: "95%", md: "100%" },
            borderRadius: "var(--radius-lg)",
          }}
        >
          <CardContent
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: "var(--space-md)",
              padding: "var(--space-lg)",
            }}
          >
            <Typography variant="h4" component={"h2"}>
              Ready to get started?
            </Typography>
            <Typography>Its free with no hidden fees.</Typography>
            <Link to="/signup" style={{ textDecoration: "none" }}>
              <Button variant="contained" size="large" sx={{ width: "300px" }}>
                Create account
              </Button>
            </Link>
            <Link to="/home" style={{ textDecoration: "none" }}>
              <Button variant="outlined" size="large" sx={{ width: "300px" }}>
                Continue without an account
              </Button>
            </Link>
          </CardContent>
        </Card>
      </Box>
      {/* footer */}
      <Box
        component={"footer"}
        padding={" var(--space-sm) var(--space-lg)"}
        display={"flex"}
        justifyContent={"space-between"}
        alignItems={"center"}
        borderTop={"1px solid var(--muted)"}
      >
        <Typography variant="h6" component={"h2"}>
          KOPALET
        </Typography>

        <Typography>hello@kopalet.com</Typography>
      </Box>
    </Box>
  );
}

export default Landing;
