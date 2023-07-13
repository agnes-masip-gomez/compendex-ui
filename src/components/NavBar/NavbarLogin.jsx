
import { Box, AppBar} from "@mui/material";

  import { Outlet, Link } from "react-router-dom";


  
  export const NavbarLogin = () => {
   
    return (
      <Box display="flex" sx={{marginBottom: '16vh'}}>
        
          
            <h3 variant="h4" className="navbar-main-text">
              Compendex
            </h3>
            <Box display="flex" ml="auto" className="right-navbar">
            
            
        </Box>
        
       <Outlet />
      </Box>
    );
  };