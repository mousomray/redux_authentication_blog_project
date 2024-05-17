import React from 'react';
import { Link } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Layout from '../Common/Layout';
import { useState, useEffect } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { useSelector, useDispatch } from 'react-redux';
import DetailsIcon from '@mui/icons-material/Details';
import { useParams } from 'react-router-dom';
import Skeleton from '@mui/material/Skeleton';

// Api Call Area
import { categorydetails } from '../Allreducers/categorydetailsslice';
import Category from './Category';
import Recentpost from './Recentpost';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));

const Categorydetails = () => {

    const dispatch = useDispatch();
    const { id } = useParams();
    const { catdetails, loading } = useSelector((state) => state.mycategorydetails);

    useEffect(() => {
        dispatch(categorydetails(id))
    }, [id])

    return (
        <>
            <Layout>
                <div className='container' style={{ marginTop: '100px' }}>
                    <Box sx={{ flexGrow: 1 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} md={8}>

                                {/* Table Area Start */}
                                <TableContainer component={Paper} style={{ borderRadius: '15px', padding: '50px', boxShadow: '0px 4px 25px rgba(0, 0, 0, 0.1)' }}>
                                    <Table sx={{ minWidth: 700 }} aria-label="customized table">
                                        <TableHead style={{ backgroundColor: '#f8f9fa' }}>
                                            <TableRow>
                                                <StyledTableCell align="center"><strong>Image</strong></StyledTableCell>
                                                <StyledTableCell align="center"><strong>Title</strong></StyledTableCell>
                                                <StyledTableCell align="center"><strong>Create Date</strong></StyledTableCell>
                                                <StyledTableCell align="center"><strong>Details</strong></StyledTableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {loading ? (
                                                // Display Skeleton while loading
                                                <TableRow>
                                                    <StyledTableCell colSpan={4} align="center">
                                                        <Skeleton variant="rectangular" width="100%" height={400} />
                                                    </StyledTableCell>
                                                </TableRow>
                                            ) : (
                                                catdetails?.map((item) => (
                                                    <StyledTableRow key={item._id}>
                                                        <StyledTableCell align="center"><img src={`${process.env.REACT_APP_BASE_URL}blog/image/${item._id}`} alt="" style={{ height: '80px', width: '150px', borderRadius: '10px' }} /></StyledTableCell>
                                                        <StyledTableCell align="center"><b>{item?.title}</b></StyledTableCell>
                                                        <StyledTableCell align="center">{new Date(item?.createdAt).toLocaleDateString('en-GB')}</StyledTableCell>
                                                        <StyledTableCell align="center"><Link to={`/blogdetails/${item._id}`}><DetailsIcon style={{ align: 'centre', justifyContent: 'center' }} /></Link></StyledTableCell>
                                                    </StyledTableRow>
                                                ))
                                            )}
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                                {/* Table Area End */}
                            </Grid>
                            <Grid item xs={12} md={4}>
                                <div style={{ backgroundColor: '#f8f9fa', padding: '20px', borderRadius: '15px', boxShadow: '0px 4px 25px rgba(0, 0, 0, 0.1)' }}>

                                    <Category />

                                    <hr />

                                    <Recentpost />

                                </div>
                            </Grid>
                        </Grid>
                    </Box>
                </div>
            </Layout>
        </>
    )
}

export default Categorydetails;
