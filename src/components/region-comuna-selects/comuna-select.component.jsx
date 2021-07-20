import React from "react";
import Autocomplete from "@material-ui/lab/Autocomplete";
import {TextField} from "@material-ui/core";
import match from "autosuggest-highlight/match";
import parse from "autosuggest-highlight/parse";

const ComunaSelect = ({regionSelected, comunaSelected, setComunaSelected, ...rest}) => {
    return (
        <Autocomplete
            key={comunaSelected}
            id="comunaSelect"
            style={{ width: '100%' }}
            fullWidth={true}
            size="small"
            options={regionSelected ? regionSelected.communes : []}
            value={comunaSelected}
            getOptionLabel={(option) => option.name}
            onChange={(event, newValue) => setComunaSelected(newValue)}
            renderInput={(params) => (
                <TextField {...params} label="Comuna" variant="outlined" margin="normal" style={{backgroundColor: "white"}}/>
            )}
            noOptionsText={'Debes seleccionar una región'}
            renderOption={(option, { inputValue }) => {
                const matches = match(option.name, inputValue);
                const parts = parse(option.name, matches);

                return (
                    <>
                        {parts.map((part, index) => (
                            <span key={index} style={{ fontWeight: part.highlight ? 700 : 400 }}>
                                {part.text}
                            </span>
                        ))}
                    </>
                );
            }}
            {...rest}
        />
    )
}

export default ComunaSelect;