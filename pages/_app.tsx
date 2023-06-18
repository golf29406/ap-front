import '../styles/global.css';
import { AppProps } from 'next/app';
import { NextComponentType } from 'next';

type MyAppProps = AppProps & {
  Component: NextComponentType;
};

const MyApp: React.FC<MyAppProps> = ({ Component, pageProps }) => {
return <Component {...pageProps} />
};

export default MyApp;
