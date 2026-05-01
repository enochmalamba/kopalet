import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Skeleton from "@mui/material/Skeleton";
import CircularProgress from "@mui/material/CircularProgress";

export default function LoadingStates({ component = "post" }) {
  const Selected = COMPONENTS[component];
  return Selected ? <Selected /> : null;
}

const PostSkeleton = () => {
  return (
    <Box
      sx={{
        width: "100%",
        background: "var(--surface)",
        padding: "var(--space-sm) var(--space-md)",
        display: "flex",
        flexDirection: "column",
        gap: "var(--space-md)",
        borderRadius: "var(--radius-md)",
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: "var(--space-sm)",
        }}
      >
        <Skeleton
          variant="circular"
          animation={"wave"}
          width={"35px"}
          height={"35px"}
        />
        <Box sx={{ flex: 1 }}>
          <Skeleton animation={"wave"} />
          <Skeleton
            animation={"wave"}
            variant="text"
            sx={{ fontSize: "10px" }}
          />
        </Box>
      </Box>
      <Skeleton animation={"wave"} variant="rounded" height={"80px"} />
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: "var(--space-sm)",
        }}
      >
        <Skeleton animation={"wave"} width={"50px"} />
        <Skeleton animation={"wave"} width={"50px"} />
        <Skeleton animation={"wave"} width={"50px"} />
      </Box>
    </Box>
  );
};

const LoadingSpinner = () => {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <CircularProgress enableTrackSlot aria-label="Loading..." />
    </Box>
  );
};

const PageFiltersSkeleton = () => {
  return (
    <Stack direction={"row"} gap={"var(--space-sm)"} overflow={"hidden"}>
      <Skeleton
        sx={{ flex: 1 }}
        animation="wave"
        width={"60px"}
        height={"35px"}
      />
      <Skeleton
        sx={{ flex: 1 }}
        animation="wave"
        width={"60px"}
        height={"35px"}
      />
      <Skeleton
        sx={{ flex: 1 }}
        animation="wave"
        width={"60px"}
        height={"35px"}
      />
      <Skeleton
        sx={{ flex: 1 }}
        animation="wave"
        width={"60px"}
        height={"35px"}
      />
      <Skeleton
        sx={{ flex: 1 }}
        animation="wave"
        width={"60px"}
        height={"35px"}
      />
      <Skeleton
        sx={{ flex: 1 }}
        animation="wave"
        width={"60px"}
        height={"35px"}
      />
    </Stack>
  );
};

const MarketListingSkeleton = () => {
  return (
    <Box>
      <Skeleton />

      <Skeleton variant="text" />
      <Skeleton variant="text" />
    </Box>
  );
};

const COMPONENTS = {
  post: PostSkeleton,
  spinner: LoadingSpinner,
  filters: PageFiltersSkeleton,
  marketItem: MarketListingSkeleton,
};
