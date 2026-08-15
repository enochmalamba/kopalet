// components/FeedbackState.jsx
import { Box, Typography, Button, Stack } from "@mui/material";

/**
 * Reusable empty/error/feedback state.
 *
 * @param {object} props
 * @param {string} [props.icon] - ion-icon name, e.g. "bookmark-outline"
 * @param {string|number} [props.code] - status code, e.g. 404, 500 (takes priority over icon if both passed)
 * @param {string} props.title
 * @param {string} [props.description]
 * @param {{label: string, onClick: () => void}} [props.primaryAction]
 * @param {{label: string, onClick: () => void}} [props.secondaryAction]
 * @param {boolean} [props.fullPage] - true = fills viewport height minus header, false = fits parent container
 * @param {object} [props.sx] - style overrides passed to root Box
 */
export default function FeedbackState({
  icon,
  code,
  title,
  description,
  primaryAction,
  secondaryAction,
  fullPage = false,
  sx = {},
}) {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        px: 3,
        py: 4,
        minHeight: fullPage ? "calc(100vh - 64px)" : 300, // adjust 64px to your header height
        width: "100%",
        ...sx,
      }}
    >
      {code ? (
        <Typography
          sx={{
            fontSize: 13,
            fontWeight: 700,
            letterSpacing: "0.08em",
            color: "text.secondary",
            mb: 1,
          }}
        >
          {code}
        </Typography>
      ) : icon ? (
        <Box
          sx={{
            width: 58,
            height: 58,
            display: "grid",
            placeItems: "center",
            border: "1px solid",
            borderColor: "divider",
            borderRadius: "50%",
            mb: 2.25,
            "& ion-icon": {
              fontSize: 27,
              color: "text.secondary",
            },
          }}
        >
          <ion-icon name={icon}></ion-icon>
        </Box>
      ) : null}

      <Typography
        component="h2"
        sx={{
          maxWidth: 420,
          fontSize: 22,
          lineHeight: 1.15,
          letterSpacing: "-0.035em",
          fontWeight: 600,
        }}
      >
        {title}
      </Typography>

      {description && (
        <Typography
          sx={{
            maxWidth: 390,
            mt: 1.25,
            color: "text.secondary",
            fontSize: 14,
            lineHeight: 1.55,
          }}
        >
          {description}
        </Typography>
      )}

      {(primaryAction || secondaryAction) && (
        <Stack
          direction="row"
          spacing={1}
          flexWrap="wrap"
          justifyContent="center"
          mt={2.75}
        >
          {primaryAction && (
            <Button
              variant="contained"
              disableElevation
              onClick={primaryAction.onClick}
            >
              {primaryAction.label}
            </Button>
          )}
          {secondaryAction && (
            <Button variant="outlined" onClick={secondaryAction.onClick}>
              {secondaryAction.label}
            </Button>
          )}
        </Stack>
      )}
    </Box>
  );
}
