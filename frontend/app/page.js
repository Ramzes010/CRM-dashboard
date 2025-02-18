import Header from './header/Header';
import CreateWorker from './worker/page';
import Order from './order/main';
import Dashboard from './dashboard/page';

export default function App({ Component, pageProps }) {
  return (
    <div>
      <Header />
     <Order/>
    </div>
  );
}
