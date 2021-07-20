import React from 'react';
import PropTypes from 'prop-types';
import {makeStyles, useTheme} from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import LastPageIcon from '@material-ui/icons/LastPage';
import {TableHead} from "@material-ui/core";
import EmailIcon from '@material-ui/icons/Email';

const useStyles1 = makeStyles((theme) => ({
    root: {
        flexShrink: 0,
        marginLeft: theme.spacing(2.5),
    },
}));

function TablePaginationActions(props) {
    const classes = useStyles1();
    const theme = useTheme();
    const {count, page, rowsPerPage, onChangePage} = props;

    const handleFirstPageButtonClick = (event) => {
        onChangePage(event, 0);
    };

    const handleBackButtonClick = (event) => {
        onChangePage(event, page - 1);
    };

    const handleNextButtonClick = (event) => {
        onChangePage(event, page + 1);
    };

    const handleLastPageButtonClick = (event) => {
        onChangePage(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
    };

    return (
        <div className={classes.root}>
            <IconButton
                onClick={handleFirstPageButtonClick}
                disabled={page === 0}
                aria-label="first page"
            >
                {theme.direction === 'rtl' ? <LastPageIcon/> : <FirstPageIcon/>}
            </IconButton>
            <IconButton onClick={handleBackButtonClick} disabled={page === 0} aria-label="previous page">
                {theme.direction === 'rtl' ? <KeyboardArrowRight/> : <KeyboardArrowLeft/>}
            </IconButton>
            <IconButton
                onClick={handleNextButtonClick}
                disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                aria-label="next page"
            >
                {theme.direction === 'rtl' ? <KeyboardArrowLeft/> : <KeyboardArrowRight/>}
            </IconButton>
            <IconButton
                onClick={handleLastPageButtonClick}
                disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                aria-label="last page"
            >
                {theme.direction === 'rtl' ? <FirstPageIcon/> : <LastPageIcon/>}
            </IconButton>
        </div>
    );
}

TablePaginationActions.propTypes = {
    count: PropTypes.number.isRequired,
    onChangePage: PropTypes.func.isRequired,
    page: PropTypes.number.isRequired,
    rowsPerPage: PropTypes.number.isRequired,
};

function createData(name, city, month, total) {
    return {name, city, month, total};
}

const rows = [
    createData('Andrea Carolina Muñoz Alister', 'Temuco', 'Junio', '200000'),
    createData('Andrea Carolina Muñoz Alister', 'Temuco', 'Mayo', '200000'),
    createData('Andrea Carolina Muñoz Alister', 'Temuco', 'Abril', '200000'),
    createData('Andrea Carolina Muñoz Alister', 'Temuco', 'Marzo', '200000'),
    createData('Andrea Carolina Muñoz Alister', 'Temuco', 'Febrero', '200000'),
    createData('Andrea Carolina Muñoz Alister', 'Temuco', 'Enero', '200000'),
    createData('Andrea Carolina Muñoz Alister', 'Temuco', 'Diciembre', '200000'),
    createData('Andrea Carolina Muñoz Alister', 'Temuco', 'Noviembre', '200000'),
    createData('Andrea Carolina Muñoz Alister', 'Temuco', 'Octubre', '200000'),
    createData('Andrea Carolina Muñoz Alister', 'Temuco', 'Septiembre', '200000'),
    createData('Andrea Carolina Muñoz Alister', 'Temuco', 'Agosto', '200000'),
    createData('Andrea Carolina Muñoz Alister', 'Temuco', 'Julio', '200000'),
    createData('Andrea Carolina Muñoz Alister', 'Temuco', 'Junio', '200000'),
];

const useStyles2 = makeStyles({
    table: {
        minWidth: 500,
    },
});

const TablePayments = () => {
    const classes = useStyles2();
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);

    const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    return (
        <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="custom pagination table">
                <TableHead>
                    <TableRow>
                        <TableCell><b>NOMBRE</b></TableCell>
                        <TableCell><b>CIUDAD</b></TableCell>
                        <TableCell><b>MES</b></TableCell>
                        <TableCell><b>PAGO</b></TableCell>
                        <TableCell><b>ESTADO</b></TableCell>
                        <TableCell><b>COMPROBANTE</b></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {(rowsPerPage > 0
                            ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            : rows
                    ).map((row) => (
                        <TableRow key={row.name}>
                            <TableCell style={{width: 200}} component="th" scope="row">
                                {row.name}
                            </TableCell>
                            <TableCell style={{width: 160}} align="left">
                                {row.city}
                            </TableCell>
                            <TableCell style={{width: 140}} align="left">
                                {row.month}
                            </TableCell>
                            <TableCell style={{width: 120}} align="left">
                                ${row.total}
                            </TableCell>
                            <TableCell>
                                {row.status}
                            </TableCell>
                            <TableCell style={{width: 30}} align="center">
                                <IconButton>
                                    <EmailIcon fontSize="small"/>
                                </IconButton>
                            </TableCell>
                        </TableRow>
                    ))}

                    {emptyRows > 0 && (
                        <TableRow style={{height: 53 * emptyRows}}>
                            <TableCell colSpan={6}/>
                        </TableRow>
                    )}
                </TableBody>
                <TableFooter>
                    <TableRow>
                        <TablePagination
                            rowsPerPageOptions={[5, 10, 25, {label: 'All', value: -1}]}
                            colSpan={3}
                            count={rows.length}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            SelectProps={{
                                inputProps: {'aria-label': 'rows per page'},
                                native: true,
                            }}
                            onChangePage={handleChangePage}
                            onChangeRowsPerPage={handleChangeRowsPerPage}
                            ActionsComponent={TablePaginationActions}
                        />
                    </TableRow>
                </TableFooter>
            </Table>
        </TableContainer>
    );
}


export default TablePayments;
