export default {
    palette: {
      primary: {
        main: '#03c6fc',
        light: '#8bf6ff',
        dark: '#0093c4',
        contrastText: '#000',
      },
      secondary: {
        main: '#f72339',
        light: '#ffffff',
        dark: '#cb9ca1',
        contrastText: '#000'
      },
    },
    spreadThis: {
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
      },
      invisibleSeparator: {
        border: 'none',
        margin: 4
      },
      visibleSeparator: {
        width: '100%',
        border: '1px solid rgba(0,0,0,0.1)',
        marginBottom: 5
      },
      profile: {
        paper: {
          padding: 20
        },
        profile: {
          '& .image-wrapper': {
              textAlign: 'center',
              position: 'relative',
              '& button': {
                  position: 'absolute',
                  top: '80%',
                  left: '70%'
              }
          },
          '& .profile-image' : {
              width: 180,
              height: 180,
              objectFit: 'cover',
              maxWidth: '100%',
              borderRadius: '50%'
          },
          '& .profile-details': {
              textAlign: 'center',
              '& span, svg': {
                  verticalAlign: 'middle'
              },
              '& a': {
                  color: '#1d9df2'
              }
          },
          '& hr': {
              border: 'none',
              margin: '0 0 10px 0'
          },
          '& svg.button': {
              '&:hover': {
                  cursor: 'pointer'
              }
          }
        },
        buttons: {
            textAlign: 'center',
            '& a': {
                margin: '20px 10px'
            }
        }
      }
    }
  };