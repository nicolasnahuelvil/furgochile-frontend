import Autocomplete from "@material-ui/lab/Autocomplete";
import countryData from "../../data/country";
import {TextField} from "@material-ui/core";
import match from "autosuggest-highlight/match";
import parse from "autosuggest-highlight/parse";
import React from "react";

const RegionSelect = ({regionSelected, setRegionSelected, ...rest}) => {

    return (
        <Autocomplete
            key={regionSelected}
            id="regionSelect"
            options={countryData}
            value={regionSelected}
            size={'small'}
            fullWidth={true}
            onChange={(event, newValue) => setRegionSelected(newValue)}
            getOptionLabel={(option) => option.name}
            renderInput={(params) => (
                <TextField {...params} label="Región" variant="outlined" margin="normal" style={{backgroundColor: "white"}}/>
            )}
            renderOption={(option, {inputValue}) => {
                const matches = match(option.name, inputValue);
                const parts = parse(option.name, matches);

                return (
                    <>
                        {parts.map((part, index) => (
                            <span key={index} style={{fontWeight: part.highlight ? 700 : 400}}>
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

export default RegionSelect;