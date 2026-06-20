import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import { Button } from "@mui/material";
import ad from "../assets/images/cv-ad.png";

export default function AdBanner() {
  const handleWhatsAppClick = () => {
    const currentUrl = window.location.href;
    const textMessage = `From: ${currentUrl}\nHello, how much do you charge for CV's`;
    const encodedMessage = encodeURIComponent(textMessage);

    const phoneNumber = "265883698966";

    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;

    window.open(whatsappUrl, "_blank", "noopener,noreferrer");
  };

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
            Get a professional CV at a low price
          </Typography>
        </CardContent>
        <Box sx={{ display: "flex", alignItems: "center", pl: 1, pb: 1 }}>
          <Button
            startIcon={<WhatsAppIcon />}
            sx={{ borderRadius: "var(--radius-full)" }}
            variant="outlined"
            onClick={handleWhatsAppClick}
          >
            WhatsApp
          </Button>
        </Box>
      </Box>{" "}
      <CardMedia
        component="img"
        sx={{ width: 151 }}
        image={ad}
        alt="CV Advertisement"
      />
    </Card>
  );
}
