import CreatorHeader from "./CreatorHeader.jsx";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

// must have at least name, description, price, condition, and optionally location, images, and category
const CreateMarketItem = () => {
  return (
    <form className="create-market-item-form">
      <CreatorHeader />
      <TextField
        fullWidth
        label="Item name"
        variant="outlined"
        size="small"
        sx={{ margin: "var(--space-sm) 0" }}
      />{" "}
      <Box
        sx={{
          display: "flex",
          gap: "var(--space-sm)",
          marginBottom: "var(--space-sm)",
        }}
      >
        <TextField
          label="Price"
          variant="outlined"
          size="small"
          type="number"
          InputProps={{
            startAdornment: (
              <Typography sx={{ marginRight: "4px" }}>$</Typography>
            ),
          }}
        />
        <TextField
          label="Condition"
          variant="outlined"
          size="small"
          select
          SelectProps={{ native: true }}
        >
          <option default selected value={null}>
            Select
          </option>
          <option value="new">New</option>
          <option value="like-new">Like New</option>
          <option value="used">Used</option>
        </TextField>
      </Box>
      <TextField
        fullWidth
        label="Description"
        variant="outlined"
        size="small"
        multiline
        rows={4}
        sx={{ marginBottom: "var(--space-sm)" }}
      />
      <Button variant="contained" color="primary">
        Create
      </Button>
    </form>
  );
};

export default CreateMarketItem;
