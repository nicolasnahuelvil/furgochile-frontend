import {Grid, Typography} from "@material-ui/core";
import React, {useState} from "react";
import CircularCheckbox from "../../../components/generic/CircularCheckbox";
import Button from "../../../components/generic/Button";

const PaymentMethod = ({nextStep, paymentMethod, setPaymentMethod}) => {

    const [autorizacionCobroMensual, setAutorizacionCobroMensual] = useState(false);
    const [errorMsg, setErrorMsg] = useState(undefined);

    const paymentMethods = [
        {
            name: 'Debit Card',
            description: 'Tarjeta de débito, solo para tarjetas emitidas en Chile\nsi no tienes una tarjeta chilena, utilice PayPal'
        },
        {
            name: 'Credit Card',
            description: 'Tarjeta de crédito - solo para tarjetas emitidas en Chile\nsi no tienes una tarjeta chilena, utilice PayPal'
        },
        {
            name: 'PayPal',
            description: 'PayPal: para extranjeros\nLa compra es procesada por Paypal en dólares estadounidenses.'
        }
    ]

    const renderPaymentMethod = ({name, description}) => (
        <Grid item xs={12}>
            <Grid container>
                <Grid item xs={12}>
                    <Typography><b>{name}</b></Typography>
                </Grid>
                <Grid item xs={12}>
                    <Grid container>
                        <Grid item xs={1} align={'right'} style={{paddingRight: 25}}>
                            <CircularCheckbox
                                checked={name === paymentMethod}
                                onChange={(event) => setPaymentMethod(name)}
                                filled={true}
                                style={{color: name === paymentMethod ? '#00A6FF' : '#000'}}
                            />
                        </Grid>
                        <Grid item xs={11} style={{whiteSpace: 'pre-line'}}>
                            <Typography>{description}</Typography>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    )

    return (
        <Grid container spacing={2}>
            {paymentMethods.map(renderPaymentMethod)}
            <Grid item xs={12} align={'center'}>
                <Grid container alignContent={'center'} alignItems={'center'}>
                    <Grid item xs={12}>
                        <CircularCheckbox
                            checked={autorizacionCobroMensual}
                            onChange={(event) => setAutorizacionCobroMensual(event.target.checked)}
                            filled={true}
                            style={{color: autorizacionCobroMensual ? '#00A6FF' : '#000'}}
                            label={'Autorizar a hacer el cobro mensual para el pago del furgon escolar'}
                        />
                    </Grid>
                </Grid>
            </Grid>
            <Grid item xs={12} align={'center'}>
                <Button onClick={() => {
                    if (autorizacionCobroMensual) {
                        nextStep();
                    }else {
                        setErrorMsg("Debes autorizar a realizar el cobro mensual a tu medio de pago")
                    }
                }}>
                    Siguiente
                </Button>
            </Grid>
            <Grid item xs={12} style={{color: 'red'}}>
                <Typography>
                    {errorMsg && errorMsg}
                </Typography>
            </Grid>
        </Grid>
    )
}

export default PaymentMethod;