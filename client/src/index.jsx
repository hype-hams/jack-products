//index.jsx to render App.jsx later on, do not delete until otherwise..
//Only make new .jsx files in your own component folders until otherwise (this is to avoid merge conflicts or complications)
import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './components/App.jsx';

const root = createRoot(document.getElementById('root'));
root.render(<App />);



//import styles from '../dist/style.css'

//put callback her

