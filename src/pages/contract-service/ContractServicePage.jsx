import {Grid, Typography} from "@material-ui/core";
import React, {useEffect, useState} from "react";
import {servicesService} from "../../services/services/ServicesService";
import Form from "./components/Form.component";
import PaymentMethod from "./components/PaymentMethod.component";
import Confirmation from "./components/Confirmation.component";
import {Helmet} from "react-helmet-async";
import {furgonesService} from "../../services/furgones/FurgonesService";
import {emailService} from "../../services/email/EmailService";
import Alert from "@material-ui/lab/Alert";

const queryString = require('query-string');

const ContractServicePage = (props) => {

    const queryParams = queryString.parse(props.location.search);

    const [furgonData, setFurgonData] = useState(undefined);
    const [serviceData, setServiceData] = useState(undefined);
    const [step, setStep] = useState(0);

    const [horario, setHorario] = useState('');
    const [horarioDeClases, setHorarioDeClases] = useState('');
    const [cantidadNinos, setCantidadNinos] = useState('');
    const [direccion, setDireccion] = useState('');
    const [nombre, setNombre] = useState('');
    const [colegio, setColegio] = useState('');
    const [telefonoDeContacto, setTelefonoDeContacto] = useState('');

    const [paymentMethod, setPaymentMethod] = useState(undefined);
    const [receiveEmails, setReceiveEmails] = useState(false);
    const [msg, setMsg] = useState(undefined);
    const [disableFinish, setDisableFinish] = useState(false);
    const [loading, setLoading] = useState(false);


    useEffect(() => {

        const fetchData = async () => {
            const idServicio = queryParams.idServicio;
            const idFuergon = queryParams.idFurgon;
            furgonesService.getById(idFuergon).then(response => {
                console.log(response)
                setFurgonData(response);
                setServiceData(response.servicios.find(service => service.id === parseInt(idServicio)));
            })

        }

        fetchData();

    }, [queryParams.idServicio]);

    const nextStep = () => {
        setStep(prevState => prevState + 1)
    };
    const prevStep = () => {
        setStep(prevState => prevState - 1)
    };

    const handleFinish = () => {

        console.log(furgonData)

        setDisableFinish(true);
        setLoading(true)

        servicesService.contratarServicio(queryParams.idServicio).then(response => {
            setMsg(response.details[0])
            setLoading(false)
        }).catch(error => {
            console.log(error)
        });
    }

    const getCurrentView = () => {
        switch (step) {
            case 0:
                return <Form
                    serviceData={serviceData}
                    nextStep={nextStep}
                    horario={horario}
                    setHorario={setHorario}
                    horarioDeClases={horarioDeClases}
                    setHorarioDeClases={setHorarioDeClases}
                    cantidadNinos={cantidadNinos}
                    setCantidadNinos={setCantidadNinos}
                    direccion={direccion}
                    setDireccion={setDireccion}
                    nombre={nombre}
                    setNombre={setNombre}
                    colegio={colegio}
                    setColegio={setColegio}
                    telefonoContacto={telefonoDeContacto}
                    setTelefonoContacto={setTelefonoDeContacto}
                />;
            case 1:
                return <PaymentMethod
                    nextStep={nextStep}
                    paymentMethod={paymentMethod}
                    setPaymentMethod={setPaymentMethod}
                />
            case 2:
                return <Confirmation
                    personalInfo={furgonData.personalInfo}
                    receiveEmails={receiveEmails}
                    setReceiveEmails={setReceiveEmails}
                    handleFinish={handleFinish}
                    disableBtn={disableFinish}
                    loading={loading}
                />
        }
    }

    const getCurrentViewTitle = () => {
        switch (step) {
            case 0:
                return "Contratar Servicios"
            case 1:
                return "Medio de pago"
            case 2:
                return "Confirmación"
        }
    }

    return (
        <>
            <Helmet>
                <title>FurgoChile | Contratar servicio</title>
            </Helmet>

            <Grid container spacing={2} justify={'center'} alignItems={'center'} alignContent={'center'}>
                <Grid item xs={12} align={'center'}>
                    <Typography variant={'h4'}>
                        {getCurrentViewTitle()}
                    </Typography>
                </Grid>
                <Grid item xs={12} align={'center'}>
                    <Typography>
                        {furgonData?.chofer}
                    </Typography>
                </Grid>
                <Grid item xs={12}>
                {msg &&
                        <Alert severity={"success"} style={{marginTop: 20, marginBottom: 20}}>{msg}</Alert>
                    }
                    </Grid>
                
                <Grid item xs={12} style={{marginTop: 30, maxWidth: '60%'}}>
                    {getCurrentView()}
                </Grid>
            </Grid>
        </>
    )
}

export default ContractServicePage;