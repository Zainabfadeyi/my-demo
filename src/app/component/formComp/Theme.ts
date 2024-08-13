import { createTheme } from '@mui/material/styles';

const Theme = createTheme({
  components: {
    MuiStepIcon: {
      styleOverrides: {
        root: {
          '&.Mui-completed': {
            color: 'green', // Color of the completed step icon
          },
          
        },
      },
    },
  },
});

export default Theme;
