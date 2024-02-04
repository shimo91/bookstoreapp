import React from 'react';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

const CustomPagination = ({ pageCount, currentPage, onChange }) => {
  return (
    <Stack spacing={2} direction="row" justifyContent="center" alignItems="center">
      <Pagination count={pageCount} page={currentPage} onChange={onChange} />
    </Stack>
  )
}

export default CustomPagination
