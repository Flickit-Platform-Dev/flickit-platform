import createPalette from "@mui/material/styles/createPalette";
import { createTheme } from "@mui/material";
import "@fontsource/oswald/300.css";
import "@fontsource/oswald/400.css";
import "@fontsource/oswald/500.css";
import "@fontsource/oswald/700.css";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { getNumberBaseOnScreen } from "@/utils/returnBasedOnScreen";

export const customFontFamily = '"Roboto","Helvetica","Arial","sans-serif","Vazirmatn"';
export const customHeaderFamily = 'Oswald, Roboto, Vazirmatn'
const fontSize = ["12px", "14px", "14px", "16px", "16px"];
export const primaryFontFamily = 'Ubuntu'
export const secondaryFontFamily = 'Sansation'

declare module "@mui/material/styles/createPalette" {
  interface TypeBackground {
    secondary: string;
    secondaryDark: string;
  }
  interface PaletteOptions {
    ml: { primary: React.CSSProperties["color"] };
    cl: { primary: React.CSSProperties["color"] };
  }
}

declare module "@mui/material/styles" {
  interface TypographyVariants {
    headlineSmall: React.CSSProperties;
    headlineMedium: React.CSSProperties;
    headlineLarge: React.CSSProperties;
    displaySmall: React.CSSProperties;
    displayMedium: React.CSSProperties;
    displayLarge: React.CSSProperties;
    titleSmall: React.CSSProperties;
    titleMedium: React.CSSProperties;
    titleLarge: React.CSSProperties;
    bodySmall: React.CSSProperties;
    bodyMedium: React.CSSProperties;
    bodyLarge: React.CSSProperties;
    labelSmall: React.CSSProperties;
    labelMedium: React.CSSProperties;
    labelLarge: React.CSSProperties;
  }

  interface TypographyVariantsOptions {
    headlineSmall?: React.CSSProperties;
    headlineMedium?: React.CSSProperties;
    headlineLarge?: React.CSSProperties;
    displaySmall?: React.CSSProperties;
    displayMedium?: React.CSSProperties;
    displayLarge?: React.CSSProperties;
    titleSmall?: React.CSSProperties;
    titleMedium?: React.CSSProperties;
    titleLarge?: React.CSSProperties;
    bodySmall?: React.CSSProperties;
    bodyMedium?: React.CSSProperties;
    bodyLarge?: React.CSSProperties;
    labelSmall?: React.CSSProperties;
    labelMedium?: React.CSSProperties;
    labelLarge?: React.CSSProperties;
  }

  interface Palette {
    ml: { primary: React.CSSProperties["color"] };
    cl: { primary: React.CSSProperties["color"] };
  }
}

// Update the Typography's variant prop options
declare module "@mui/material/Typography" {
  interface TypographyPropsVariantOverrides {
    headlineSmall?: true;
    headlineMedium?: true;
    headlineLarge?: true;
    displaySmall?: true;
    displayMedium?: true;
    displayLarge?: true;
    titleSmall?: true;
    titleMedium?: true;
    titleLarge?: true;
    bodySmall?: true;
    bodyMedium?: true;
    bodyLarge?: true;
    labelSmall?: true;
    labelMedium?: true;
    labelLarge?: true;
  }
}

const palette = createPalette({
  primary: { main: "#003B64", contrastText: "#FFFFFF", light: "#D0E4FF", dark: "#002035" },
  secondary: { main: "#8B0035", contrastText: "#FFFFFF", light: "#FFD9DE", dark: "#400014" },
  background: { secondary: "#EDF4FC", secondaryDark: "#121d33" },
  ml: { primary: "#6035A1" },
  cl: { primary: "#3596A1" },
  error: { main: "#6D0005", contrastText: "#fff" },
  warning: { main: "#F89311", contrastText: "#fff" },
});

export const theme = createTheme({
  palette,
  typography: {
    fontFamily: customFontFamily,
    headlineSmall: {
      fontFamily: secondaryFontFamily,
      fontSize: '1.5rem',
      lineHeight: "2rem"
    },
    headlineMedium: {
      fontFamily: secondaryFontFamily,
      fontSize: '1.75rem',
      lineHeight: "2.25rem"
    },
    headlineLarge: {
      fontFamily: secondaryFontFamily,
      fontWeight: 'Bold',
      fontSize: '4.5rem',
      lineHeight: "5.75rem"
    },
    displaySmall: {
      fontSize: '1.5rem',
      lineHeight: "2rem",
      letterSpacing: "-3%"
    },
    displayMedium: {
      fontSize: '2rem',
      fontWeight: 'Bold',
      lineHeight: "2.25rem"
    },
    displayLarge: {
      fontSize: '4rem',
      fontWeight: 'Bold',
      lineHeight: "4.25rem",
    },
    titleSmall: {
      fontSize: '0.875rem',
      lineHeight: "1.25rem",
      letterSpacing: ".1px"

    },
    titleMedium: {
      fontSize: '1rem',
      lineHeight: "1.5rem",
      letterSpacing: ".15px"
    },
    titleLarge: {
      fontSize: '1.375rem',
      lineHeight: "1.75rem"
    },
    bodySmall: {
      fontWeight: 'lighter',
      fontSize: '0.75rem',
      lineHeight: "1rem",
      letterSpacing: "0.4px"
    },
    bodyMedium: {
      fontWeight: 'lighter',
      fontSize: '0.875rem',
      lineHeight: "1.125rem",
      letterSpacing: "0.25px"
    },
    bodyLarge: {
      fontSize: '1rem',
      lineHeight: "1.5rem",
      letterSpacing: "0.5px"
    },
    labelSmall: {
      fontFamily: secondaryFontFamily,
      fontSize: '0.6875rem',
      lineHeight: "0.75rem",
      letterSpacing: '0.5px',
    },
    labelMedium: {
      fontSize: '0.75rem',
      lineHeight: "1rem",
      letterSpacing: '0.5px',
    },
    labelLarge: {
      fontWeight: 'Bold',
      fontSize: '0.875rem',
      lineHeight: "1.125rem",
      letterSpacing: "0.1px"
    },
    button: {
      fontFamily: customHeaderFamily,
      letterSpacing: ".1em",
    },
    h3: {
      fontFamily: customHeaderFamily,
    },
    h4: {
      fontFamily: customHeaderFamily,
      opacity: 0.9,
    },
    h5: {
      fontFamily: customHeaderFamily,
      opacity: 0.85,
    },
    h6: {
      fontFamily: customHeaderFamily,
      letterSpacing: "0.05em",
      lineHeight: 1.6,
      opacity: 0.85,
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: `
        html {
          scroll-behavior: smooth;
          font-size: ${fontSize[4]};
        }
        @media (max-width: 1600px) {
          html {
            font-size: ${fontSize[3]};
          }
        }
        @media (max-width: 1280px) {
          html {
            font-size: ${fontSize[2]};
          }
        }
        @media (max-width: 960px) {
          html {
            font-size: ${fontSize[1]};
          }
        }
        @media (max-width: 600px) {
          html {
            font-size: ${fontSize[0]};
          }
        }
        body {
          background: #EDEFF1;
        }
      `,
    },
    MuiTypography: {
      defaultProps: {
        variantMapping: {
          subSmall: "h6",
          subMedium: "h6",
          subLarge: "h6",
        },
      },
    },
    MuiButtonGroup: {
      defaultProps: {
        color: "primary"
      },
    },
    MuiTabs: {
      styleOverrides: {
        root: {
          borderRadius: "0px",
          overflow: "auto",
          padding: "0px 8px",
          borderBottom: "1px solid #d3d3d3",
        },
        indicator: {
          backgroundColor: palette.secondary.main,
          borderRadius: 1,
        },
      },
    },
    MuiTab: {
      styleOverrides: {
        root: {
          padding: "4px 8px",
          margin: "0px 4px",
          borderRadius: "5px",
          minHeight: "40px",
          transition: "background-color .1s ease, color .1s ease",
          "&:hover": {
            backgroundColor: "#e1dede",
          },
          "&.Mui-selected": {
            color: palette.secondary.main,
          },
        },
      },
    },


    //@ts-expect-error
    MuiTabPanel: {
      styleOverrides: {
        root: {
          padding: "4px 2px",
        },
      },
    },
  },
});
