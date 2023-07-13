import { Avatar, Drawer, List, Stack, Toolbar } from "@mui/material";
import { History } from './history';

const Sidebar = () => {
  return (
    <Drawer
      variant="permanent"
      sx={{ backgroundColor: 'gray' }}
    >
      <List disablePadding>
        <Toolbar sx={{ marginBottom: "20px"}}>
          <Stack
            sx={{ width: "100%" }}
            direction="row"
            justifyContent="center"
          >
            <History/>
           
          </Stack>
        </Toolbar>
      </List>
    </Drawer>
  );
};

export default Sidebar;