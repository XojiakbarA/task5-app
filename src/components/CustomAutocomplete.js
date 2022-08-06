import {Autocomplete, TextField} from "@mui/material";

const CustomAutocomplete = ({ disabled, value, name, options, onChange, onBlur, error, helperText }) => {

    return (
        <Autocomplete
            id="combo-box-demo"
            fullWidth
            disabled={disabled}
            options={options}
            value={value}
            onChange={onChange}
            onBlur={onBlur}
            getOptionLabel={option => option.name}
            isOptionEqualToValue={(option, value) => option.id === value.id}
            renderInput={(params) => (
                <TextField
                    {...params}
                    label="User"
                    variant="standard"
                    name={name}
                    error={error}
                    helperText={helperText}
                />
            )}
        />
    )
}

export default CustomAutocomplete