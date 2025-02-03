import Header from '../components/header/Header';
import CreateWorker from '../components/worker/CreateWorker';
import Order from '../components/order/page';
import Dashboard from './dashboard/page';

export default function App({ Component, pageProps }) {
  return (
    <div>
      <Header />
     <Order/>
    </div>
  );
}
