import React, { useState } from 'react'
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Link } from 'react-router-dom'; // Import Link
import { useDispatch } from 'react-redux'; // Import Dispatch
import { allstudent, deletestudent } from "./crudslice"; // Import Show and Delete Function 
import { useQuery } from '@tanstack/react-query' // Import for useQuery 
import Layout from '../Common/Layout'; // Import Layout
import Swal from 'sweetalert2'; // Import Sweet Alert 
import DetailsIcon from '@mui/icons-material/Details'; //Details Icon
import EditIcon from '@mui/icons-material/Edit'; // Edit Icon
import DeleteIcon from '@mui/icons-material/Delete'; // Delete Icon
import Loader2 from '../Common/Loader2';

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



const Showstudent = () => {

    const dispatch = useDispatch()
    const [visiblerow, setVisiblerow] = useState(5);
    const [searchQuery, setSearchQuery] = useState(''); // For Search student

    // Get student For Use Query 
    const getstudentdata = async () => {
        const response = await dispatch(allstudent()) // Call Showstudent function
        return response?.payload
    }

    // Use Query Area
    const { isLoading, isError, data: studentdata, error, refetch } = useQuery({
        queryKey: ['student'],
        queryFn: getstudentdata // This line of code work as same as useEffect()
    })


    // Make Handle For Delete (Start)
    const handleDelete = async (id) => {
        // For Sweet Alert
        const result = await Swal.fire({
            title: 'Are you sure?',
            text: 'You will not be able to recover this student Details!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#1bbd36',
            confirmButtonText: 'Yes, delete it!'
        });
        if (result.isConfirmed) {
            await dispatch(deletestudent(id)); 
            refetch()
            // After Deletation Message
            Swal.fire(
                'Deleted!',
                'Your student Details has been deleted',
                'success'
            );
        }
    }
    // Make Handle For Delete (End)

    // Handle For Search
    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);
    };

    // Filter products based on search query
    const filteredstudent = Array.isArray(studentdata) && studentdata?.filter((student) =>
        student.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // Function For Loadmore
    const handleLoadMore = () => {
        setVisiblerow(prev => prev + 5);
    };


    // For Loading 
    if (isLoading) {
        return (
          <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
            <h1><Loader2/></h1>
          </div>
        )
      }

    // For Error
    if (isError) {
        return <h1>{error.message}</h1>
    }

    return (
        <>
            <Layout>

                <input
                    type="text"
                    placeholder="Search student..."
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
                                <StyledTableCell>Name</StyledTableCell>
                                <StyledTableCell align="center">Email</StyledTableCell>
                                <StyledTableCell align="center">Phone</StyledTableCell>
                                <StyledTableCell align="center">Address</StyledTableCell>
                                <StyledTableCell align="center">City</StyledTableCell>
                                <StyledTableCell align="center">Class</StyledTableCell>
                                <StyledTableCell align="center">Edit</StyledTableCell>
                                <StyledTableCell align="center">Delete</StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {Array.isArray(filteredstudent) && filteredstudent.slice(0, filteredstudent.length).reverse().slice(0, visiblerow).map((row) => (
                                <StyledTableRow key={row.id}>
                                    <StyledTableCell component="th" scope="row">
                                        {row.name}
                                    </StyledTableCell>
                                    <StyledTableCell align="center">{row.email}</StyledTableCell>
                                    <StyledTableCell align="center">{row.phone}</StyledTableCell>
                                    <StyledTableCell align="center">{row.address}</StyledTableCell>
                                    <StyledTableCell align="center">{row.city}</StyledTableCell>

                                    <StyledTableCell align="center">{row.class}</StyledTableCell>

                                    <StyledTableCell align="center"><Link to={`/editstudent/${row._id}`}><button className='btn-success'><EditIcon /></button></Link></StyledTableCell>
                                    <StyledTableCell align="center"><button onClick={() => handleDelete(row._id)} className='btn-danger'><DeleteIcon /></button></StyledTableCell>
                                </StyledTableRow>
                            ))}
                        </TableBody>
                    </Table>
                    {visiblerow < filteredstudent.length ? (
                        <div className="text-center mt-3 mb-3 mx-auto">
                            <button className="btn btn-success" onClick={handleLoadMore}>Load More</button>
                        </div>
                    ) : null}
                </TableContainer>

            </Layout>
        </>
    )
}

export default Showstudent