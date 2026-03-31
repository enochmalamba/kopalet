import { useState, useEffect } from "react";
import Chip from "@mui/material/Chip";
import Box from "@mui/material/Box";

function PageFilters({
  filters = [],
  defaultActive = [],
  onChange,
  singleSelect = true,
}) {
  const [activeFilters, setActiveFilters] = useState(() => {
    if (defaultActive?.length) return defaultActive;
    return filters.length ? [filters[0].id] : [];
  });

  const handleClick = (filterId) => {
    let updated;

    if (singleSelect) {
      updated = [filterId];
    } else {
      updated = activeFilters.includes(filterId)
        ? activeFilters.filter((id) => id !== filterId)
        : [...activeFilters, filterId];
    }

    setActiveFilters(updated);

    if (onChange) onChange(updated);
  };
  if (!filters.length) return null;

  return (
    <Box
      sx={{
        position: "sticky",
        top: -12,
        zIndex: 1000,
        backgroundColor: "var(--bg)",
        display: "flex",
        flexWrap: "nowrap",
        overflowX: "auto",
        gap: "var(--space-xs)",
        borderBottom: "1px solid var(--border)",
        flexShrink: 0,
        padding: "var(--space-xs) 0",
      }}
    >
      {filters.map((filter) => {
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
