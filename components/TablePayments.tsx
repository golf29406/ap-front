import React, { useState } from 'react';
import { Table, TableContainer, TableHead, TableRow, TableCell, TableBody } from '@mui/material';
import moment from 'moment';

const TablePayments = (props: any) => {
    //console.log('test123', props.payments)
    return (
        <>
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Payment Number</TableCell>
                            <TableCell>Address</TableCell>
                            <TableCell>Zip code</TableCell>
                            <TableCell>Date</TableCell>
                        </TableRow>
                    </TableHead>
                    {props.payments && props.payments.length != 0 ? (
                        <TableBody>
                            {props.payments.map((item: any) => (
                                <TableRow key={item.id}>
                                    <TableCell>{item.numberPayment}</TableCell>
                                    <TableCell>{item.address}</TableCell>
                                    <TableCell>{item.zipcode}</TableCell>
                                    <TableCell>{moment(item.created_at).format('YYYY-MM-DD')}</TableCell>
                                </TableRow>
                            ))
                            }
                        </TableBody>
                    ) : (
                        <TableBody>
                            <TableRow>
                                <TableCell>No data</TableCell>
                            </TableRow>
                        </TableBody>
                    )}
                </Table>
            </TableContainer>
        </>
    );
};

export default TablePayments;
