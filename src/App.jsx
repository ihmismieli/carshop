import CarList from './components/CarList'
import Container from '@mui/material/Container'
import CssBaseline from '@mui/material/CssBaseline'
import AppBar  from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'

function App() {
  return (
    // Käytetään hallitsemaan sisältöä ja rajoittamaan komponentin leveyttä
    <Container maxWidth='xl'>
    {/* sovelluksen yläpalkki, johon voi sijoittaa otsikon tai valikon. static meinaa ettei se liiku scrollauksen mukana */}
      <AppBar position='static'>
        {/* osa Appbar komponenttia ja auttaa asettamaan sisällön oikeaan paikkaan AppBarissa */}
        <Toolbar>
          {/* käytetään tekstin esittämiseen MUI:n mukaisesti */}
          <Typography variant='h6'>Car Shop</Typography>
        </Toolbar>
      </AppBar>
      <CarList />
      {/* varmistaa että Css-tyylit näkyvät oikein selaimissa */}
      <CssBaseline />
    </Container>
  )
}

export default App
