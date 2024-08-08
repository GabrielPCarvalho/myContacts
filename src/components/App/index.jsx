import { ThemeProvider } from 'styled-components';
import { BrowserRouter } from 'react-router-dom';

import defaultTheme from '../../assets/styles/themes/default';
import GlobalStyles from '../../assets/styles/global';

import { Container } from './styles';
import Header from '../Header';
import Routes from '../../routes.jsx';
import ToastContainer from '../Toast/ToastContainer';

const App = () => {
  return (
    <BrowserRouter>
      <ThemeProvider theme={defaultTheme}>
        <GlobalStyles />
        <ToastContainer />
        <Container>
          <Header />
          <Routes />
        </Container>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
