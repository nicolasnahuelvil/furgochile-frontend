import {FormControlLabel, FormLabel, Grid, Radio, RadioGroup, Slider, Typography} from "@material-ui/core";
import React from "react";

const FilterBar = ({
                       valorMinMax,
                       filterHorarioEscolar, setFilterHorarioEscolar,
                       filterPrecioMaximo, setFilterPrecioMaximo,
                       filterCapacidadMaxima, setFilterCapacidadMaxima,
                       filterTipoServicio, setFilterTipoServicio,
                       filterConductor, setFilterConductor,
                       handleFilter
                   }) => {

    return (
        <Grid container>
            <Grid item>
                <FormLabel><b>Horario escolar</b></FormLabel>
                <RadioGroup
                    value={filterHorarioEscolar}
                    onChange={(event) => setFilterHorarioEscolar(event.target.value)}
                >
                    <FormControlLabel value="ambos" control={<Radio/>} label="Ambos"/>
                    <FormControlLabel value="manana" control={<Radio/>} label="Mañana"/>
                    <FormControlLabel value="tarde" control={<Radio/>} label="Tarde"/>
                </RadioGroup>
            </Grid>
            <Grid item xs={12} style={{marginTop: 15}}>
                <>
                    <FormLabel><b>Precio maximo</b></FormLabel>
                    <Typography align={'right'}>
                        ${filterPrecioMaximo.toLocaleString('es-CL')}
                    </Typography>
                    <Slider
                        min={valorMinMax.min}
                        max={valorMinMax.max}
                        value={filterPrecioMaximo}
                        onChange={(event, newValue) => setFilterPrecioMaximo(newValue)}
                    />
                </>
            </Grid>
            <Grid item xs={12} style={{marginTop: 15}}>
                <>
                    <FormLabel><b>Capacidad maximo</b></FormLabel>
                    <Typography align={'right'}>
                        {filterCapacidadMaxima}
                    </Typography>
                    <Slider
                        value={filterCapacidadMaxima}
                        onChange={(event, newValue) => setFilterCapacidadMaxima(newValue)}
                    />
                </>
            </Grid>
            <Grid item style={{marginTop: 15}}>
                <FormLabel><b>Tipo servicio</b></FormLabel>
                <RadioGroup
                    value={filterTipoServicio}
                    onChange={(event) => setFilterTipoServicio(event.target.value)}>
                    <FormControlLabel value="bus_urbano" control={<Radio/>} label="Bus urbano"/>
                    <FormControlLabel value="bus_rural" control={<Radio/>} label="Bus rural"/>
                    <FormControlLabel value="mini_bus_urbano" control={<Radio/>} label="Mini bus urbano"/>
                    <FormControlLabel value="mini_bus_rural" control={<Radio/>} label="Mini bus rural"/>
                </RadioGroup>
            </Grid>
            <Grid item style={{marginTop: 15}}>
                <FormLabel><b>Conductor</b></FormLabel>
                <RadioGroup
                    value={filterConductor}
                    onChange={(event) => setFilterConductor(event.target.value)}>
                    <FormControlLabel value="ambos" control={<Radio/>} label="Ambos"/>
                    <FormControlLabel value="hombre" control={<Radio/>} label="Hombre"/>
                    <FormControlLabel value="mujer" control={<Radio/>} label="Mujer"/>
                </RadioGroup>
            </Grid>
        </Grid>
    )
}

export default FilterBar;