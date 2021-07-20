import {Grid} from "@material-ui/core";
import RegionSelect from "../../../components/region-comuna-selects/region-select.component";
import ComunaSelect from "../../../components/region-comuna-selects/comuna-select.component";
import SearchIcon from "@material-ui/icons/Search";
import React from "react";
import Button from "../../../components/generic/Button";

const Search = ({regionSelected, setRegionSelected, comunaSelected, setComunaSelected, onClick}) => {

    return (
        <Grid container spacing={2} alignItems="center" justify="center" style={{backgroundColor: '#EFE14D'}}>
            <Grid item xs/>
            <Grid item xs={6}>
                <Grid container spacing={1}>
                    <Grid item xs={6}>
                        <RegionSelect
                            regionSelected={regionSelected}
                            setRegionSelected={setRegionSelected}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <ComunaSelect
                            regionSelected={regionSelected}
                            comunaSelected={comunaSelected}
                            setComunaSelected={setComunaSelected}
                        />
                    </Grid>
                </Grid>
            </Grid>
            <Grid item xs={2}>
                <Button
                    onClick={onClick}
                    endIcon={<SearchIcon/>}
                    style={{borderColor: '#fff', borderRadius: 5, border: '1px solid'}}
                >
                    Buscar
                </Button>
            </Grid>
            <Grid item xs/>
        </Grid>
    )
}

export default Search;