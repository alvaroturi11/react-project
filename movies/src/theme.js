import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#2B2D42",
      contrastText: "#FFFFFF",
    },
    secondary: {
      main: "#EF8354",
      contrastText: "#0B0B0B",
    },
    background: {
      default: "#F5F7FB",
      paper: "#FFFFFF",
    },
    text: {
      primary: "#1C1E24",
      secondary: "#5B6275",
    },
  },
  shape: {
    borderRadius: 14,
  },
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: { boxShadow: "none" },
      },
    },
    MuiCard: {
      defaultProps: { elevation: 0 },
      styleOverrides: {
        root: {
          border: "1px solid #E8ECF3",
          boxShadow:
            "0 1px 2px rgba(18, 25, 38, .04), 0 8px 24px rgba(18, 25, 38, .06)",
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          border: "1px solid #E8ECF3",
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: { textTransform: "none", fontWeight: 600, borderRadius: 12 },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: { fontWeight: 600 },
      },
    },
  },
  typography: {
    fontFamily:
      "'Inter', system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif",
    h4: { fontWeight: 800, letterSpacing: 0.2 },
    h5: { fontWeight: 700 },
    button: { fontWeight: 700 },
  },
});

export default theme;
