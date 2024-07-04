import * as React from 'react';
import Slider from '@mui/material/Slider';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
export default function PerPageSlider({perPage, setPerPage, max, min, step}) {
    const url = new URL(window.location.href);
    url.searchParams.set('page', 1);
    url.searchParams.set('per_page', perPage);
    window.history.pushState(null, '', url.toString());

    const handleChange = (event, newPerPage) => {
        document.body.onmouseup = document.body.onkeyup = () => {
            setPerPage(newPerPage);
            url.searchParams.set('page', 1);
            url.searchParams.set('per_page', newPerPage);
            window.history.pushState(null, '', url.toString());

        };

};
    return (
        <Box sx={{width: 200}}>
            <Typography>Per Page:<br/></Typography>
            <Slider defaultValue={perPage} min={min} max={max} step={step} onChange={handleChange} marks valueLabelDisplay="auto"/>
        </Box>
    );
}