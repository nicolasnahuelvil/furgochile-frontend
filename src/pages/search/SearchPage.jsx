import {Grid} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import React, {useEffect, useState} from "react";
import countryData from '../../data/country';
import {furgonesService} from "../../services/furgones/FurgonesService";
import Header from "./components/Header.component";
import Search from "./components/Search.component";
import Loading from "../../components/loading/Loading.component";
import FurgonesList from "./components/furgones-list/FurgonesList.component";
import FilterBar from "./components/FilterBar.component";
import {Helmet} from "react-helmet-async";
import OrderBy from "./components/OrderBy.component";

const queryString = require('query-string');

const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
        },
    },
}));

const SearchPage = (props) => {
    const classes = useStyles();
    const [currentRegion, setCurrentRegion] = useState(undefined);
    const [currentComuna, setCurrentComuna] = useState(undefined);
    const [regionSelected, setRegionSelected] = useState(undefined);
    const [comunaSelected, setComunaSelected] = useState(undefined);
    const [isSearchVisible, setIsSearchVisible] = useState(false);
    const [filterValues, setFilterValues] = useState({});
    const [furgones, setFurgones] = useState([]);
    const [nonFilteredFurgones, setNonFilteredFurgones] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [sortBy, setSortBy] = useState(undefined);
    const valorMinMax = {min: 10000, max: 500000};

    const searchHandle = async () => {
        setIsLoading(true);

        if (comunaSelected !== undefined && comunaSelected !== null) {
            console.log('1 if')
            setCurrentComuna(comunaSelected.name);
            setCurrentRegion(regionSelected.name);

            const response = await furgonesService.getByRegionIdAndComunaId(regionSelected.number, comunaSelected.id);
            setFurgones(response);
            setNonFilteredFurgones(response);

        } else if (regionSelected !== undefined && regionSelected !== null) {
            console.log('2 if')

            setCurrentRegion(regionSelected.name);
            setCurrentComuna(undefined)
            const response = await furgonesService.getByRegionId(regionSelected.number);
            setFurgones(response);
            setNonFilteredFurgones(response);

        } else {
            console.log('3 if')

            setCurrentComuna(undefined);
            setCurrentRegion(undefined);
            const response = await furgonesService.getAll();
            setFurgones(response);
            setNonFilteredFurgones(response);

        }

        setIsLoading(false);
    }

    useEffect(() => {
        const queryParams = queryString.parse(props.location.search);

        const paramRegion = Number(queryParams.region);
        const paramComuna = queryParams.comuna;


        const setInitFields = async () => {
            if (paramRegion && paramComuna) {
                const regionObject = countryData.find(region => region.number === paramRegion);
                const comunaObject = regionObject?.communes.find(comuna => comuna.name === paramComuna);
                await setRegionSelected(regionObject);
                await setComunaSelected(comunaObject)

                const response = await furgonesService.getByRegionIdAndComunaId(regionObject.number, comunaObject.id);
                setFurgones(response);
                setNonFilteredFurgones(response);


            }else if (paramRegion) {
                const regionObject = countryData.find(region => region.number === paramRegion);
                await setRegionSelected(regionObject);

                const response = await furgonesService.getByRegionId(regionObject.number);
                setFurgones(response);
                setNonFilteredFurgones(response);
            }else {
                setCurrentComuna(undefined);
                setCurrentRegion(undefined);
                const response = await furgonesService.getAll();
                setFurgones(response);
                setNonFilteredFurgones(response);
            }

            setIsLoading(false)
        }

        setInitFields();

        
    }, [props.location.search]);

    const toggleSearchVisible = () => {
        setIsSearchVisible(!isSearchVisible);
    }

    const handleSetRegionSelected = (region) => {
        setComunaSelected(undefined);
        setRegionSelected(region)
    }

    const getFilterValue = (field) => filterValues[field]

    const setFilterValue = (event) => {
        setFilterValues({...filterValues, [event.target.name]: event.target.value})
    }

    const [filterHorarioEscolar, setFilterHorarioEscolar] = useState(undefined);
    const [filterPrecioMaximo, setFilterPrecioMaximo] = useState(500000);
    const [filterCapacidadMaxima, setFilterCapacidadMaxima] = useState(100);
    const [filterTipoServicio, setFilterTipoServicio] = useState(undefined);
    const [filterConductor, setFilterConductor] = useState(undefined);

    const EmptyState = () => (
        <span>Sin resultados para la búsqueda</span>
    )

    const getFurgonesList = () => (
        furgones.length !== 0 ? <FurgonesList furgones={furgones}/> : <EmptyState/>
    )

    const sorterByPrecio = (a, b) => {
        if (a.precioDesde > b.precioDesde) {
            return 1;
        }

        if (a.precioDesde < b.precioDesde) {
            return -1;
        }

        return 0;
    }

    const sorterByCalificacion = (a, b) => {
        if (a.score.puntuacion > b.score.puntuacion) {
            return 1;
        }

        if (a.score.puntuacion < b.score.puntuacion) {
            return -1;
        }

        return 0;
    }


    const handleChangeSortBy = (newValue) => {
        if (newValue === sortBy) return;

        setSortBy(newValue);
        furgones.sort(newValue === 'calificacion' ? sorterByCalificacion : sorterByPrecio)
    }

    const handleSetFilterHorarioEscolar = (newValue) => {
        if (newValue === filterHorarioEscolar) return;

        console.log(newValue)

        setFilterHorarioEscolar(newValue);
        setFurgones(nonFilteredFurgones.filter(furgon => {
            if (newValue === 'tarde') {
                return furgon.horario.toLowerCase().includes('tarde');
            } else if (newValue === 'manana') {
                return furgon.horario.includes('Mañana');
            } else {
                return true;
            }
        }))
    }

    const handleFilterPrecioMaximo = (newValue) => {
        if (newValue === filterPrecioMaximo) return;

        setFilterPrecioMaximo(newValue);
        setFurgones(nonFilteredFurgones.filter(furgon => {
            return furgon.precioDesde <= newValue;
        }))
    }

    const handleFilterCapacidadMaxima = (newValue) => {
        if (newValue === filterCapacidadMaxima) return;

        setFilterCapacidadMaxima(newValue);
        setFurgones(nonFilteredFurgones.filter(furgon => {
            return furgon.servicios.find(servicio => servicio.capacidad <= newValue);
        }))
    }

    const handleFilterTipoServicio = (newValue) => {
        if (newValue === filterCapacidadMaxima) return;

        setFilterTipoServicio(newValue);

        let filterStr;

        switch (newValue) {
            case "bus_urbano":
                filterStr = "Bus Urbano";
                break;
            case "bus_rural":
                filterStr = "Bus Rural";
                break
            case "mini_bus_urbano":
                filterStr = "Mini Bus Urbano";
                break
            case "mini_bus_rural":
                filterStr = "Mini Bus Rural";
                break;
        }

        setFurgones(nonFilteredFurgones.filter(furgon => {
            return furgon.servicios.find(servicio => servicio.tipoServicio === filterStr);
        }))
    }

    return (
        <>
            <Helmet>
                <style>{'body { background-color: #F5F6FA; }'}</style>
                <title>FurgoChile | Busqueda</title>
            </Helmet>


            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Header
                        classes={classes}
                        currentRegion={currentRegion}
                        currentComuna={currentComuna}
                        isSearchVisible={isSearchVisible}
                        toggleSearchVisible={toggleSearchVisible}
                    />
                </Grid>
                <Grid item xs={12} style={{marginBottom: 15}}>
                    {
                        isSearchVisible &&
                        <Search
                            comunaSelected={comunaSelected}
                            setComunaSelected={setComunaSelected}
                            regionSelected={regionSelected}
                            setRegionSelected={handleSetRegionSelected}
                            onClick={searchHandle}
                        />
                    }
                </Grid>
                <Grid item xs={2}>
                    <FilterBar
                        valorMinMax={valorMinMax}
                        filterConductor={filterConductor}
                        setFilterConductor={setFilterConductor}
                        filterCapacidadMaxima={filterCapacidadMaxima}
                        setFilterCapacidadMaxima={handleFilterCapacidadMaxima}
                        filterPrecioMaximo={filterPrecioMaximo}
                        setFilterPrecioMaximo={handleFilterPrecioMaximo}
                        filterTipoServicio={filterTipoServicio}
                        setFilterTipoServicio={handleFilterTipoServicio}
                        filterHorarioEscolar={filterHorarioEscolar}
                        setFilterHorarioEscolar={handleSetFilterHorarioEscolar}
                    />
                </Grid>
                <Grid item xs={10}>
                    <>
                        <OrderBy quantity={furgones.length} sortBy={sortBy} setSortBy={handleChangeSortBy}/>
                        {isLoading ? <Loading/> : getFurgonesList()}
                    </>
                </Grid>
            </Grid>
        </>
    )
}


export default SearchPage;