import { useGlobalContext } from 'state/globalState/context';
import StartPage from './StartPage';
import Form from './Form';

const ViewToShow = () => {
  const [globalState] = useGlobalContext();
  const { form } = globalState;

  return <>{form.isStarted ? <Form /> : <StartPage />}</>;
};

export default ViewToShow;
