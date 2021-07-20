import React from "react";
import {IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@material-ui/core";
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import {Link} from "react-router-dom";

const ServicesTable = ({idFurgon, servicios}) => {

    return (
        <TableContainer>
            <Table size='small'>
                <TableHead>
                    <TableRow>
                        <TableCell><b>Conductor</b></TableCell>
                        <TableCell align="center"><b>Capacidad</b></TableCell>
                        <TableCell><b>Tipo Servicio</b></TableCell>
                        <TableCell><b>Horario</b></TableCell>
                        <TableCell align="center"><b>Disponible</b></TableCell>
                        <TableCell align="right"><b>Valor</b></TableCell>
                        <TableCell/>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {servicios.map((servicio) => (
                        <TableRow key={servicio.id}>
                            <TableCell component="th" scope="row">{servicio.genero}</TableCell>
                            <TableCell align="center">{servicio.capacidad}</TableCell>
                            <TableCell>{servicio.tipoServicio}</TableCell>
                            <TableCell>{servicio.horario}</TableCell>
                            <TableCell align="center">{servicio.disponible}</TableCell>
                            <TableCell align="right" style={{
                                color: '#8DD065',
                                fontWeight: 'bold'
                            }}>${servicio.valor.toLocaleString('es-CL')}</TableCell>
                            <TableCell>
                                <IconButton component={Link} to={`/contratar-servicio?idFurgon=${idFurgon}&idServicio=${servicio.id}`}>
                                    <ShoppingCartIcon style={{color: '#8DD065'}}/>
                                </IconButton>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}


export default ServicesTable;