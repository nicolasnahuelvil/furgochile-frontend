import {Grid, Typography,} from "@material-ui/core";
import React from "react";
import CreditCardIcon from '@material-ui/icons/CreditCard';
import TablePayments from '../components/table-payments/table-payments';
import Button from "../../../components/generic/Button";
import { ExportCSV } from "../../../utils/ExportCSV";




const PaymentHistoryPage = () => {

    return (
        <Grid container>
            <Grid item xs={12} style={{padding: 25}}>
                <Typography variant='h4' align='center'>Historial de pagos</Typography>
            </Grid>

            <Grid item xs={12}>
                <Grid container>
                    <Grid item xs={9}>
                        <Typography variant='h4' style={{fontSize: 30}} align='center'>
                            {'$0'}
                            <br/>
                        </Typography>
                        <Typography variant='h4' style={{fontSize: 15}} align='center'>
                            Saldo
                        </Typography>
                    </Grid>
                    <Grid item xs={3}>
                        <Button startIcon={<CreditCardIcon/>}>
                            Recargar saldo
                        </Button>
                    </Grid>
                </Grid>
            </Grid>

            <Grid item xs={12} style={{paddingTop: 25, paddingBottom: 25}}>
                <hr/>
            </Grid>

            <Grid item xs={12}>
                <TablePayments/>
            </Grid>
        </Grid>
    )
}

export default PaymentHistoryPage;