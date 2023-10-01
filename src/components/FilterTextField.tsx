import { Box, TextField } from "@mui/material";

interface FilterTextFieldPropsTemplate {
    label: string;
    filter: string;
    handleFilterChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const FilterTextFieldTemplate = ({label, filter, handleFilterChange}:FilterTextFieldPropsTemplate) => {
    return (
        <Box sx={{display:'flex', justifyContent:'center' }}>
            <TextField 
                id='name'
                label={label}
                variant='outlined'
                color="primary"
                value={filter}
                onChange={handleFilterChange}
                sx={{
                    width: '50%',
                    marginTop: '15px',
                    marginBottom: '15px',
                    input: { color: 'white' },
                    '& label.Mui-focused': {
                        color: 'white',
                    },
                    '& .MuiOutlinedInput-root': {
                        '& fieldset': {
                            borderColor: 'white',
                        },
                        '&:hover fieldset': {
                            borderColor: 'white',
                        },
                        '&.Mui-focused fieldset': {
                            borderColor: 'white',
                        },
                    },
                }}
            />
        </Box>
    )
}

export default FilterTextFieldTemplate;