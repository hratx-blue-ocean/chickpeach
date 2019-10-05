import { grommet } from "grommet/themes";
import { deepMerge } from "grommet/utils";

const customTheme = deepMerge(grommet, {
  global: {
    colors: {
      "focus": undefined,
    }
  },
  radioButton: {
    gap: "medium",
    size: "30px",
    color: {
      light:'#444444',
    },
    hover: {
      border: {
        color: undefined
      }
    },
    check: {
      color: {
        light: "#FFB084"
      }
    },
    icon: {
      size: "100%"
    }
  }
});

export default customTheme