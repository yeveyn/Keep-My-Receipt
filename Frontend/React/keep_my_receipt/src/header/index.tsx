import { Box, Grid, useMediaQuery } from '@mui/material';
import Logo from './Logo';
import NavMenuItem from './NavMenuList';

import ResponsiveDrawer from './Drawer2';
import { NavBarContainer } from './styles';

export default function NavBar() {
  const matches = useMediaQuery('(min-width:500px)');

  return (
    <Box height="62px">
      <NavBarContainer>
        <Grid
          container
          sx={{
            float: 'right',
          }}
        >
          {!matches ? (
            <>
              <ResponsiveDrawer />
            </>
          ) : (
            <>
              <Grid item xs={2} sm={6} sx={{ p: 0 }}>
                <Logo />
              </Grid>
              <Grid item xs={0} sm={6} sx={{ pr: 5 }}>
                <NavMenuItem />
              </Grid>
            </>
          )}
        </Grid>
      </NavBarContainer>
    </Box>
  );
}
