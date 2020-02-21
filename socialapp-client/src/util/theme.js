export default {
    palette: {
      primary: {
        main: '#4fc3f7',
        light: '#8bf6ff',
        dark: '#0093c4',
        contrastText: '#000',
      },
      secondary: {
        main: '#ffcdd2',
        light: '#ffffff',
        dark: '#cb9ca1',
        contrastText: '#000'
      },
    },
    typography: {
      button: {
        fontSize: 'large',
        textTransform: 'none'
      }
    },
    formStyles: {
      typography: {
        useNextVariants: true
      },
      form: {
        display: 'flex',
        textAlign: 'center'
      },
      image: {
          maxWidth: '75px',
          maxHeight: '65px',
          margin: "20px auto 20px auto"
      },
      pageTitle: {
          margin: "10px auto 10px auto" 
      },
      textField: {
          margin: "10px auto 10px auto"
      },
      button: {
          display: 'block',
          maxWidth: '200px',
          margin: '20px auto 10px auto',
          position: 'relative'
      },
      customError: {
          // color: "red",
          fontSize: '0.8rem',
          marginTop: '10px'
      },
      progress: {
          position: 'absolute',
          top: '50%',
          left: '50%',
          marginTop: -12,
          marginLeft: -12,
      }
    }
  };