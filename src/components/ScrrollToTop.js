import { styled } from '@mui/system';
import React from 'react';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';

const BoxStyled = styled('div')(({theme}) => ({
    width:'50px',
    height: '50px',
    background: theme.palette.primary.main,
    right: '30px',
    position: 'fixed',
    bottom: '50px',
    zIndex:1,
    borderRadius:8,
    display: 'flex',
    justifyContent:'center',
    alignItems: 'center',
    cursor: 'pointer',
    svg :{
        fontSize:40,
        margin: 'auto',
        width:"100%",
        height: "100%",

    }
}))

const ScrollToTop = () => {
     
    const [visibility, setVisibility] = React.useState(false)

     React.useEffect(( ) => {
       window.addEventListener('scroll', (e) => {
        window.scrollY > 200 
        ? setVisibility(true)
        : setVisibility(false)
      })
     }) 
     const scrollOnTopHandel =  () => {
      window.scroll({
            top: 0,
            left: 0,
            behavior: 'smooth'
          })
     }
    return(
      <>
        {visibility && <BoxStyled 
          onClick={scrollOnTopHandel}
        >
            <ArrowDropUpIcon />
        </BoxStyled>}
      </>
    )    
  }

  export default ScrollToTop;