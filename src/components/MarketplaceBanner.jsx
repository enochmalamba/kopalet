import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import EastIcon from "@mui/icons-material/East";
import { Button } from "@mui/material";
import ad from "../assets/images/market-ad.png";

export default function MarketplaceBanner() {
  return (
    <Card
      sx={{
        display: "flex",
        borderRadius: "var(--radius-lg)",
        margin: "var(--space-md) autoa",
      }}
    >
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <CardContent sx={{ flex: "1 0 auto" }}>
          <Typography variant="body">
            Buy and sell with Kopalet's marketplace. No hidden fees
          </Typography>
        </CardContent>
        <Box sx={{ display: "flex", alignItems: "center", pl: 1, pb: 1 }}>
          <Button
            endIcon={<EastIcon />}
            sx={{ borderRadius: "var(--radius-full)" }}
            variant="outlined"
          >
            Explore
          </Button>
        </Box>
      </Box>{" "}
      <CardMedia
        component="img"
        sx={{ width: 151 }}
        image={ad}
        alt="Live from space album cover"
      />
    </Card>
  );
}
