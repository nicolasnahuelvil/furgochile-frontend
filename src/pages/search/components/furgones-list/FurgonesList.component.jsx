import {Button, ClickAwayListener, Grid, IconButton, Typography} from "@material-ui/core";
import StarIcon from "@material-ui/icons/Star";
import Popper from "@material-ui/core/Popper";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import Collapse from "@material-ui/core/Collapse";
import React, {useState} from "react";
import ServicesTable from "./components/DetailsTable.component";
import RatingPopper from "./components/RatingPopper.component";

const FurgonesList = ({furgones}) => {

    const [expanded, setExpanded] = useState(undefined);
    const [ratingOpened, setRatingOpened] = useState(undefined);
    const [anchorElRating, setAnchorElRating] = useState(undefined);

    const handleExpandClick = (index) => {
        setExpanded(index === expanded ? undefined : index)
    };

    const handleShowRating = (index, event) => {
        setRatingOpened(ratingOpened === index ? undefined : index)
        setAnchorElRating(anchorElRating === event.currentTarget ? undefined : event.currentTarget);
    }

    const hideShowRating = () => {
        setRatingOpened(undefined);
        setAnchorElRating(undefined);
        console.log("hide")
    }
    console.log(furgones)

    const furgonCardRender = ({id, chofer, acompanante, horario, precioDesde, servicios, score, location}, index) => (
        <Grid container style={{backgroundColor: '#ffffff', marginTop: 15}} key={index}>
            <Grid item xs={2}>
                <img width='180px' height='120px'
                     src="https://www.nissan-cdn.net/content/dam/Nissan/cl/vehicles/nv350escolar/FINAL%20NV350.jpg.ximg.l_12_m.smart.jpg"
                     alt="furgon"/>
            </Grid>
            <Grid item xs={3} style={{alignSelf: 'center'}}>
                <Typography>{chofer}</Typography>
                <Typography>{location.nombreRegion} - {location.nombreComuna}</Typography>
            </Grid>
            <Grid item xs={3} style={{alignSelf: 'center'}}>
                <Typography>
                    <b>Horario:</b> {horario}<br/>
                    <b>Acompañante:</b> {acompanante}
                </Typography>
            </Grid>
            <Grid item xs={2} style={{alignSelf: 'center'}}>
                <Typography>
                    Desde: <span style={{color: '#8DD065', fontWeight: 'bold'}}>${precioDesde.toLocaleString('es-CL')}</span>
                </Typography>
            </Grid>
            <Grid item xs={1} style={{alignSelf: 'center'}}>
                <>
                    <IconButton>
                        <StarIcon onClick={(event) => handleShowRating(index, event)}/>
                    </IconButton>
                    <div>
                        <Popper id={index} open={ratingOpened === index} anchorEl={anchorElRating}>
                            <RatingPopper score={score}/>
                        </Popper>
                    </div>
                </>
            </Grid>
            <Grid item xs={1} style={{alignSelf: 'center'}}>
                <Button
                    onClick={() => handleExpandClick(index)}
                    endIcon={expanded === index ? <ExpandLessIcon/> : <ExpandMoreIcon/>}
                >
                    Más
                </Button>
            </Grid>
            <Grid item xs={12}>
                <Collapse in={expanded === index} timeout="auto" unmountOnExit>
                    <hr style={{borderColor: '#F2E55F'}}/>
                    <ServicesTable key={index} idFurgon={id} servicios={servicios}/>
                </Collapse>
            </Grid>
        </Grid>
    )


    const withClickAway = () => (
        <ClickAwayListener onClickAway={() => hideShowRating()}>
            <div>
                {furgones.map((furgon, index) => (furgonCardRender(furgon, index)))}
            </div>
        </ClickAwayListener>
    )

    return withClickAway();

}

export default FurgonesList;