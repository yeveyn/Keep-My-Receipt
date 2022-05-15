import Typography from '@mui/material/Typography';

export default function LogoItem() {
  return (
    <Typography
      variant="h6"
      component="a"
      href="/club"
      fontFamily="GowunDodumRegular"
      sx={{
        mr: 2,
        p: 'auto',
        flexGrow: 1,
        display: { xs: 'none', md: 'flex' },
        width: '20px',
        fontWeight: 300,
        float: 'right',
        color: 'black',
        fontSize: 20,
        textDecoration: 'none',
      }}
    >
      영수증을 부탁해
    </Typography>
  );
}
