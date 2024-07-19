import Box from "@mui/material/Box";
import {CircularProgress} from "@mui/material";

const Loading = () => {

    return (
        <>
            <Box className="absolute z-[1000] flex size-full">
                <CircularProgress className="bottom-1/2 right-1/2 m-auto"/>
            </Box>
        </>
    )
}

export default Loading