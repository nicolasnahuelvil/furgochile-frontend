import {Grid, Typography} from "@material-ui/core";
import ArrowRightAltIcon from "@material-ui/icons/ArrowRightAlt";
import React from "react";
import Button from "../../../components/generic/Button";
import ExpandLessIcon from "@material-ui/icons/ExpandLess";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

const Header = ({classes, currentRegion, currentComuna, isSearchVisible, toggleSearchVisible}) => {

    return (
        <Grid container spacing={2} style={{backgroundColor: '#ffffff'}}>
            <Grid item xs={12} style={{backgroundColor: '#EFE14D', maxHeight: 2}}/>
            <Grid item>
                <Grid container>
                    <Grid item>
                        <Typography>
                            <span style={{fontSize: 13}}>Región</span>
                            <br/>
                            <b>{currentRegion ? currentRegion : 'Todas'}</b>
                        </Typography>
                    </Grid>
                </Grid>
            </Grid>
            <Grid item>
                <ArrowRightAltIcon fontSize={'large'}/>
            </Grid>
            <Grid item>
                <Grid item>
                    <Grid container>
                        <Typography>
                            <span style={{fontSize: 13}}>Comuna</span>
                            <br/>
                            <b>{currentComuna ? currentComuna : 'Todas'}</b>
                        </Typography>
                    </Grid>
                </Grid>
            </Grid>
            <Grid item xs/>
            <Grid item>
                <Button
                    endIcon={isSearchVisible ? <ExpandLessIcon/> : <ExpandMoreIcon/>}
                    onClick={toggleSearchVisible}
                    style={{backgroundColor: '#fff', color: '#000', border: '.5px solid'}}
                >
                    Nueva Búsqueda
                </Button>
            </Grid>
        </Grid>
    )
}

export default Header;