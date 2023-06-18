import React, { useEffect, useState } from 'react';
import TablePayments from "../../components/TablePayments";
import {
    Pagination, TextField, Link, Button, Grid
} from '@mui/material';
import { Margin } from '@mui/icons-material';
const axios = require('axios');
interface Payments {
    id: number;
    numberPayment: string;
    address: string;
    zipcode: number;
    created_at: Date;
    updated_at: Date;
}
const Payment = () => {
    const [payments, setPayments] = useState<Payments>()
    const [pagination, setPagination] = useState(0);
    const [apiURL, setApiURL] = useState('http://localhost:3002')

    const fetchData = async () => {
        const apiUrl = `${apiURL}/payment?currentPage=1`;
        const dataListFromApi = await axios.get(apiUrl);

        setPagination(dataListFromApi.data.totalPages)
        setPayments(dataListFromApi.data.payments);
    };
    useEffect(() => {
        fetchData();
    }, [])

    const handleChangePage = async (event: object, page: number) => {
        const apiUrl = `${apiURL}/payment?currentPage=${page}`;
        const dataListFromApi = await axios.get(apiUrl);

        setPagination(dataListFromApi.data.totalPages)
        setPayments(dataListFromApi.data.payments);
    };

    const search = async (event: any) => {
        const apiUrl = `${apiURL}/payment?currentPage=1&numberPayment=${event.target.value}`;
        const dataListFromApi = await axios.get(apiUrl);

        setPagination(dataListFromApi.data.totalPages)
        setPayments(dataListFromApi.data.payments);
    };

    return (
        <React.Fragment>
            <Grid container className='btn-back'>
            <Link
                href={`/`}
            >
                <Button variant="contained" color="info">
                    Register Payments
                </Button>
            </Link>
            </Grid>
            <TextField
                label="Filter Payment Number"
                style={{ marginBottom: '16px' }}
                onChange={search}
            />
            <TablePayments
                payments={payments}
            />
            {pagination == 0 ? (
                ""
            ) : (
                <Pagination
                    className="page-spacesList"
                    sx={{ marginTop: 10 }}
                    count={pagination}
                    onChange={handleChangePage}
                />
            )}
        </React.Fragment>
    )
}

export default Payment;