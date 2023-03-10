import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

import { ChakraProvider } from '@chakra-ui/react'
import SSRProvider from 'react-bootstrap/SSRProvider';
import {BrowserRouter} from 'react-router-dom';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';
import Context from './components/ContextProvider/Context';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
      <Context>
        <BrowserRouter>
        
          <SSRProvider>
              <App />
          </SSRProvider>
          
        </BrowserRouter>
      </Context>

);