/* eslint-disable array-callback-return */
import { Box, Button, OutlinedInput } from '@mui/material';
import React from 'react'
import { FilterAltOutlined, Notes, AddCircleOutlined } from '@mui/icons-material';
import { InputAdornment, Pagination, PaginationItem } from '@mui/material';
import TransactionStyle from "../transaction/transactionStyle";
import { useHistory } from "react-router-dom";
import { FormControl, Typography } from '@material-ui/core';
import {
    DataGrid,
    gridPageCountSelector,
    gridPageSelector,
    useGridApiContext,
    useGridSelector,
} from '@mui/x-data-grid';
import { SearchOutlined } from '@mui/icons-material';
import {ListAllTrans} from "./transactionService";


export const Transaction = () => {

    const [admins, setAdmin] = React.useState([]);
    const [search, setSearch] = React.useState('');
    const [isLoaded, setIsLoaded] = React.useState(true);

    React.useEffect(() => {
         ListAllTrans().then(res => {
              console.log(res.data)
                setAdmin(res.data);
                setIsLoaded(false);
            })
    }, []);

    let history = useHistory();

    function RedirectAddAdmin() {
        history.push("/add_transaction");
    }

    // Custom Pagination
    function CustomPagination() {
        const apiRef = useGridApiContext();
        const page = useGridSelector(apiRef, gridPageSelector);
        const pageCount = useGridSelector(apiRef, gridPageCountSelector);

        return (
            <Pagination
                color="primary"
                variant="outlined"
                shape="rounded"
                page={page + 1}
                count={pageCount}
                // @ts-expect-error
                renderItem={(props2) => <PaginationItem {...props2} disableRipple />}
                onChange={(event, value) => apiRef.current.setPage(value - 1)}
            />
        );
    }

    const columns = [
        {
            field: 'numeroTransaction',
            headerClassName: 'super-app-theme--header',
            headerName: 'numeroTransaction',
            editable: true,
            flex: 1,
        },
        {
            field: 'dateTransaction',
            headerClassName: 'super-app-theme--header',
            headerName: 'dateTransaction',
            editable: true,
            flex: 1
        },
        {
            field: 'montant',
            headerClassName: 'super-app-theme--header',
            headerName: 'montant',
            editable: true,
            flex: 1
        },

    ]


    const classes = TransactionStyle();
    return (
        <>
            <Typography variant='h5'
                        style={{
                            marginBottom: "20px",
                            borderLeft: "6px solid #000000",
                            color: "#000000",
                            paddingLeft: "20px",
                            fontWeight: "bolder"
                        }}>
                LISTE DES TRANSACTIONS
            </Typography>

            <Box sx={{}} className={classes.visitePage} >

                <Box style={{ width: "100%" }}>
                    {/* Gestion de l'entete de la liste des Reservations */}

                    <Box
                        className={classes.filtre}
                    >

                        <div className={classes.champfiltre}>
                            <div style={{
                                display: 'flex',
                                alignItems: 'center',
                                flexWrap: 'wrap',
                                color: "gray"
                            }}
                                 className={classes.champtextfiltre}
                            >
                                <FilterAltOutlined></FilterAltOutlined>
                                Filtre
                            </div>

                            <div className={classes.mysearch}>
                                <FormControl className={classes.mytextsearch}>
                                    <OutlinedInput
                                        size='small'
                                        id="email"
                                        placeholder="rechercher"
                                        style={{ fontWeight: "bolder", color: "#000000" }}
                                        className={classes.mysearch}
                                        startAdornment={
                                            <InputAdornment position="start">
                                                <SearchOutlined  sx={{ color: "#000000" }} ></SearchOutlined>
                                            </InputAdornment>
                                        }
                                        onChange={(event) => {
                                            setSearch(event.target.value);
                                        }}

                                    />
                                </FormControl>
                            </div>
                        </div>

                        <Box textAlign="right">
                            <Button
                                variant="contained"
                                endIcon={<AddCircleOutlined />}
                                onClick={RedirectAddAdmin}
                                sx={{
                                    backgroundColor: "#FF6600",
                                    color:"#000000",
                                    fontFamily: "Arial",
                                    fontSize: "16px",
                                    fontWeight:"bolder",
                                    marginBottom: "10px",
                                    '&:hover': {
                                        backgroundColor: "#000000",
                                        color:"#FFFFFF",
                                        pointer: "cursor"
                                    }
                                }}
                            >
                                Ajouter
                            </Button>
                        </Box>
                    </Box>

                    <Box sx={{
                        boxShadow: 1, borderRadius: "10px", paddingBottom: "20px",
                        '& .super-app-theme--header': {
                            backgroundColor: '#696969',
                            color:"#FFFFFF",
                            fontWeight:"bold",
                            textTransform:"uppercase"
                        },
                    }} className={classes.tableau}>

                        <div style={{ width: "100%" }}>

                            <DataGrid

                                sx={{ boxShadow: "30px", width: "100%" }}

                                autoHeight
                                pageSize={10}
                                rowsPerPageOptions={[5, 10, 20]}
                                components={{
                                    Pagination: CustomPagination,
                                    // Toolbar: CustomToolbar,
                                }}
                                loading={isLoaded}
                                rows={
                                    admins.filter((val) => {
                                        if (search === "") {
                                            return val;
                                        } else if (val.numeroTransaction.toLowerCase().includes(search.toLowerCase()) || val.dateTransaction.toLowerCase().includes(search.toLowerCase())
                                            || val.montant.toLowerCase().includes(search.toLowerCase())) {
                                            return val;
                                        }
                                    }).map((row) => {
                                        return row;
                                    })
                                }
                                columns={columns}
                                disableVirtualization
                            />
                        </div>

                    </Box>

                </Box>
            </Box>
        </>
    )
}

export default Transaction;
