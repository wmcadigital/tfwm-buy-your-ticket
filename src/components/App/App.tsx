import ContextProvider from 'state/ProviderComposer';
import ViewToShow from './ViewToShow';

const App = () => {
  return (
    <ContextProvider>
      <ViewToShow />
    </ContextProvider>
  );
};

export default App;
