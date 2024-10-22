import React from "react";
import { AutocompleteProps } from "../types";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import Chip from "@mui/material/Chip";

interface SingleAutocompleteProps extends AutocompleteProps {
  onExerciseChange: (exercise: string | null) => void; // Callback for parent
}

const SingleAutocomplete: React.FC<SingleAutocompleteProps> = ({
  label,
  data,
  onExerciseChange,
}) => {
  return (
    <Autocomplete
      className="mt-5 color-white"
      disablePortal
      options={data}
      // onChange={(event, value) => onExerciseChange(value)} // Call the callback when the value changes
      slotProps={{
        paper: {
          sx: {
            "& .MuiAutocomplete-listbox": {
              bgcolor: "#1F1B24",
              "& .MuiAutocomplete-option": {
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
              },
              "& .MuiAutocomplete-option[aria-selected='true']": {
                bgcolor: "white",
                color: "black",
                "&.Mui-focused": {
                  bgcolor: "white",
                  color: "black",
                },
              },
            },
            "& .MuiAutocomplete-listbox .MuiAutocomplete-option.Mui-focused": {
              bgcolor: "white",
              color: "black",
            },
            "& .MuiAutocomplete-listbox .MuiAutocomplete-option": {
              bgcolor: "#1F1B24",
              color: "white",
            },
          },
        },
      }}
      sx={{
        "& label.Mui-focused": {
          color: "#BB86FC",
        },
        "& .MuiInput-underline:after": {
          borderBottomColor: "#BB86FC",
        },
        "& .MuiOutlinedInput-root": {
          "& fieldset": {
            borderColor: "white",
          },
          "&:hover fieldset": {
            borderColor: "#BB86FC",
          },
          "&.Mui-focused fieldset": {
            borderColor: "#BB86FC",
          },
          "& .MuiAutocomplete-input": {
            color: "white",
          },
          "& .MuiAutocomplete-option": {
            color: "#BB86FC",
          },
          "& .MuiAutocomplete-clearIndicator": {
            color: "white",
          },
          "& .MuiAutocomplete-popupIndicator": {
            color: "white",
          },
        },
      }}
      onChange={(_: any, newValue: string | null) => {
        if (onExerciseChange) {
          onExerciseChange(newValue); // Notify parent with the new value
        }
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          label={label}
          slotProps={{
            inputLabel: {
              sx: { color: "white", border: "white" }, // Set label color to white
            },
          }}
        />
      )}
    />
  );
};

const MultipleAutocomplete: React.FC<AutocompleteProps> = ({ label, data }) => {
  return (
    <Autocomplete
      className="mt-5 color-white"
      multiple
      disablePortal
      options={data}
      renderTags={(value: readonly string[], getTagProps) =>
        value.map((option: string, index: number) => {
          const { key, ...tagProps } = getTagProps({ index });
          return (
            <Chip
              variant="outlined"
              sx={{
                "& .MuiChip-deleteIcon": {
                  color: "white",
                },
                "&:hover": {
                  "& .MuiChip-deleteIcon": {
                    color: "#9f54fb",
                  },
                },
              }}
              style={{ color: "white" }}
              label={option}
              key={key}
              {...tagProps}
            />
          );
        })
      }
      slotProps={{
        paper: {
          sx: {
            "& .MuiAutocomplete-listbox": {
              bgcolor: "#1F1B24",
              "& .MuiAutocomplete-option": {
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
              },
              "& .MuiAutocomplete-option[aria-selected='true']": {
                bgcolor: "white",
                color: "black",
                "&.Mui-focused": {
                  bgcolor: "white",
                  color: "black",
                },
              },
            },
            "& .MuiAutocomplete-listbox .MuiAutocomplete-option.Mui-focused": {
              bgcolor: "white",
              color: "black",
            },
            "& .MuiAutocomplete-listbox .MuiAutocomplete-option": {
              bgcolor: "#1F1B24",
              color: "white",
            },
          },
        },
      }}
      sx={{
        "& label.Mui-focused": {
          color: "#BB86FC",
        },
        "& .MuiInput-underline:after": {
          borderBottomColor: "#BB86FC",
        },
        "& .MuiOutlinedInput-root": {
          "& fieldset": {
            borderColor: "white",
          },
          "&:hover fieldset": {
            borderColor: "#BB86FC",
          },
          "&.Mui-focused fieldset": {
            borderColor: "#BB86FC",
          },
          "& .MuiAutocomplete-input": {
            color: "white",
          },
          "& .MuiAutocomplete-option": {
            color: "#BB86FC",
          },
          "& .MuiAutocomplete-clearIndicator": {
            color: "white",
          },
          "& .MuiAutocomplete-popupIndicator": {
            color: "white",
          },
        },
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          label={label}
          slotProps={{
            inputLabel: {
              sx: { color: "white", border: "white" }, // Set label color to white
            },
          }}
        />
      )}
    />
  );
};

export { SingleAutocomplete, MultipleAutocomplete };
