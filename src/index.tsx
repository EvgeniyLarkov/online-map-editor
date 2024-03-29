import './index.css';
import './shared/libs/wdyr';

import React from 'react';
import { ChakraProvider } from '@chakra-ui/react';

import ReactDOM from 'react-dom/client';

import App from './app';
// eslint-disable-next-line import/extensions
import initLocalization from './shared/i18n';
// // import reportWebVitals from './reportWebVitals';

initLocalization();

const rootNode: HTMLElement | null = document.getElementById('root');
if (rootNode) {
	const root: ReactDOM.Root = ReactDOM.createRoot(rootNode);
	root.render(
		<React.StrictMode>
			<ChakraProvider>
				<App />
			</ChakraProvider>
		</React.StrictMode>
	);
} else {
	throw new Error('Root node is not defined');
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
