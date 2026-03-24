import { useState } from "react";
import Chip from "@mui/material/Chip";
import Box from "@mui/material/Box";

const DEFAULT_FILTERS = [
  { id: "f1", label: "All" },
  { id: "f2", label: "Latest" },
  { id: "f3", label: "Popular" },
  { id: "f4", label: "Jobs" },
  { id: "f5", label: "Ideas" },
  { id: "f6", label: "News" },
  { id: "f7", label: "Events" },
  { id: "f8", label: "Resources" },
];

function PageFilters() {
  const [activeFilters, setActiveFilters] = useState(["f1"]);

  const handleClick = (filterId) => {
    // single-select logic (more realistic for filters like this)
    setActiveFilters([filterId]);
  };

  return (
    <Box
      sx={{
        position: "sticky",
        top: -12,
        zIndex: 1000,
        backgroundColor: "var(--bg)",
        // background: "red",
        display: "flex",
        flexWrap: "nowrap",
        overflowX: "auto",
        gap: "var(--space-xs)",
        borderBottom: "1px solid var(--border)",
        flexShrink: 0,
        padding: "var(--space-xs) 0",
      }}
    >
      {DEFAULT_FILTERS.map((filter) => {
        const isActive = activeFilters.includes(filter.id);

        return (
          <Chip
            key={filter.id}
            label={filter.label}
            clickable
            size="small"
            variant={isActive ? "filled" : "outlined"}
            onClick={() => handleClick(filter.id)}
          />
        );
      })}
    </Box>
  );
}

export default PageFilters;
