import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { allcourse } from '../Allreducers/allcourseslice';
import Layout from '../Common/Layout';
import { useState } from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Skeleton from '@mui/material/Skeleton';

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
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));

const Allcourse = () => {
    const dispatch = useDispatch();
    const { allcoursedata, loading } = useSelector((state) => state.myallcourse);
    const [isLoading, setIsLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState(''); // For Search Course

    // Handle For Search
    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);
    };

    // Filter course based on search query
    const filteredCourse = Array.isArray(allcoursedata) && allcoursedata?.filter((course) =>
        course.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    useEffect(() => {
        dispatch(allcourse())
            .then(() => setIsLoading(false));
    }, []);

    return (
        <Layout>

            <input
                type="text"
                placeholder="Search course..."
                value={searchQuery}
                onChange={handleSearchChange}
                style={{
                    marginTop: '80px',
                    width: '100%',
                    padding: '15px',
                    borderRadius: '25px',
                    border: '1px solid #ccc',
                    boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
                    fontSize: '16px',
                    boxSizing: 'border-box',
                    backgroundImage: 'linear-gradient(to right, #ffffff, #f2f2f2)',
                    backgroundSize: '200% auto',
                    transition: 'background-position 0.5s ease',
                }}
            /> 


            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 700, marginTop: '10px' }} aria-label="customized table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell align="centre">Image</StyledTableCell>
                            <StyledTableCell align="centre">Name</StyledTableCell>
                            <StyledTableCell align="centre">Requirement</StyledTableCell>
                            <StyledTableCell align="centre">Duration</StyledTableCell>
                            <StyledTableCell align="centre">Fees</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {isLoading ? (
                            <TableRow>
                                <StyledTableCell colSpan={5}>
                                    <Skeleton animation="wave" variant="rectangular" height={50} />
                                </StyledTableCell>
                            </TableRow>
                        ) : (
                            filteredCourse.map((value) => (
                                <StyledTableRow key={value._id}>
                                    <StyledTableCell align="centre"><img src={`${process.env.REACT_APP_BASE_URL}/course/photo/${value?._id}`} alt="" style={{ height: '50px' }} /></StyledTableCell>
                                    <StyledTableCell align="centre">{value?.name}</StyledTableCell>
                                    <StyledTableCell align="centre">{value?.requirement}</StyledTableCell>
                                    <StyledTableCell align="centre">{value?.duration}</StyledTableCell>
                                    <StyledTableCell align="centre">{value?.fees}</StyledTableCell>
                                </StyledTableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
        </Layout>
    );
}

export default Allcourse;
