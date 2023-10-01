import { Box, Pagination } from "@mui/material"

interface PaginationTemplateProps {
    page: number;
    totalPages: number;
    handlePageChange: (event: React.ChangeEvent<unknown>, value: number) => void;
}

const PaginationTemplate = ({page, totalPages, handlePageChange}:PaginationTemplateProps) => {
    return (
        <Box sx={{display:'flex', justifyContent:'center'}}>
            <Pagination 
                count={totalPages}
                page={page}
                variant='text'
                color='primary'
                shape='rounded'
                onChange={handlePageChange}
                sx={{
                    marginTop: '15px',
                    marginBottom: '15px', 
                    button: { color: 'white' } 
                }}
            />
        </Box>
    )
}

export default PaginationTemplate;