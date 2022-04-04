import React, { useRef, useState } from "react";
import { Grid } from "@material-ui/core";
import Box from '@mui/material/Box';
import { FormControl, Typography } from "@material-ui/core";
import { Button, OutlinedInput } from '@mui/material';
import { makeStyles } from "@material-ui/core";
import Swal from 'sweetalert2'
import TransactionStyle from "./transactionStyle";
import {SaveTransaction} from "./transactionService";


function AddTransaction() {

    const [admin, setAdmin] = React.useState({
        numeroTransaction: '',
        dateTransaction: '',
        montant: '',
    });

    const [formErrors] = useState( {});
    const [setErrorPage] = useState(false);

    const classes = TransactionStyle();
    const useStyles = makeStyles((theme) => ({
        gridStyle: {

            marginLeft: "50px",
            [theme.breakpoints.down("sm")]: {
                marginLeft: "0px"
            }
        }
    }));

    const styles = useStyles();


    const handleSubmit = (event) => {
        event.preventDefault();

        SaveTransaction(admin).then(res => {
            Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'Transaction enrégistré avec succes',
                showConfirmButton: true,
                timer: 1500
            }).catch(
                (error) => {
                    setErrorPage(true);
                    console.log(error);
                }
            )
        })

        setAdmin({
            numeroTransaction: ' ',
            dateTransaction: '',
            montant: '',
        })

    };

    const form = useRef();

    return (
        <React.Fragment>
            <>
                <Box>
                    <Grid container spacing={2} >
                        <Grid item xs={12} sm={12} md={12}>
                            <Typography variant="h4" className={classes.textTypo} style={{ color: "gray", paddingLeft: "20px" }}>
                                AJOUTER UNE TRANSACTION
                            </Typography>
                            <hr style={{ marginTop: "5px", borderTop: " 4px solid #138A8A", width: "10%", float: "left", marginLeft: "15px" }} />

                        </Grid>
                        <form ref={form}>
                            <Grid  container className={classes.subContainer}>
                                <p>Complétez le formulaire. Les champs marqué par <span style={{ color: 'red' }}>*</span>  sont <span style={{ color: 'red' }}> obligatoires </span></p>
                                <Grid xs={12} md={12} sm={12} container style={{ display:"flex", justifyContent:"center"}}>
                                    <Grid xs={12} sm={12} md={12}  spacing={5} item>
                                        <FormControl fullWidth>
                                            <label htmlFor="numeroTransaction" className={classes.labelText}>Numero de Transaction <span style={{ color: 'red' }}>*</span> </label>
                                            <OutlinedInput
                                                id="ok"
                                                name="numeroTransaction"
                                                type="text"
                                                variant="outlined"
                                                placeholder="Ex: numeroTransaction"
                                                onChange={(event) => {
                                                    setAdmin({ ...admin, numeroTransaction: event.target.value })
                                                }}
                                                value={admin.numeroTransaction}
                                            />
                                        </FormControl>
                                        <p className={classes.formError}>{formErrors.numeroTransaction}</p>
                                    </Grid>
                                    <Grid xs={12} sm={12} md={12} item className={styles.gridStyle}>
                                        <FormControl fullWidth>
                                            <label className={classes.labelText}>date de transaction <span style={{ color: 'red' }}>*</span> </label>
                                            <OutlinedInput
                                                id="input"
                                                name="dateTransaction"
                                                type="date"
                                                variant="outlined"
                                                placeholder="Ex: dateTransaction"
                                                onChange={(event) => {
                                                    setAdmin({ ...admin, dateTransaction: event.target.value })
                                                }}
                                                value={admin.dateTransaction}
                                            />
                                        </FormControl>
                                        <p className={classes.formError}>{formErrors.dateTransaction}</p>
                                    </Grid>
                                </Grid>
                                <Grid xs={12} sm={12} md={12} container style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}>
                                    <Grid xs={12} sm={12} md={12} item>
                                        <FormControl fullWidth>
                                            <label className={classes.labelText}>Montant <span style={{ color: 'red' }}>*</span> </label>
                                            <OutlinedInput
                                                id="input"
                                                name="montant"
                                                type="text"
                                                variant="outlined"
                                                placeholder="Ex: montant"
                                                onChange={(event) => {
                                                    setAdmin({ ...admin, montant: event.target.value })
                                                }}
                                                value={admin.montant}
                                            />
                                        </FormControl>
                                        <p className={classes.formError}>{formErrors.montant}</p>
                                    </Grid>
                                    <Button type="submit" variant="contained"
                                            id="button"
                                            sx={{
                                                backgroundColor: "#05888A",
                                                fontFamily: "Arial", fontSize: "20px",
                                                marginTop: "10px",
                                                '&:hover': {
                                                    backgroundColor: "#F48322",
                                                    pointer: "cursor"
                                                }
                                            }}
                                            onClick={handleSubmit}
                                    >AJOUTER</Button>
                                </Grid>
                            </Grid>
                        </form>
                    </Grid>
                </Box>
            </>
        </React.Fragment>
    )

}

export default AddTransaction;
