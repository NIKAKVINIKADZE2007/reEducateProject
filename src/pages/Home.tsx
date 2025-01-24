import NewInvoice from '../components/newInvoice';

type Props = {
  showNewInvoice: boolean;
};
const Home: React.FC<Props> = ({ showNewInvoice }) => {
  return <div>{showNewInvoice && <NewInvoice />}</div>;
};

export default Home;
