
import { Box, AppBar} from "@mui/material";

  import { Outlet, Link } from "react-router-dom";


  
  export const NavbarTraining = () => {
   
    return (
      <Box display="flex" justifyContent="center">
            <h3 variant="h4" className="navbar-train" >
              Compendex
            </h3>
        
       <Outlet />
      </Box>
    );
  };