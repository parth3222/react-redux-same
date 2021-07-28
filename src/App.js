import './App.css';
import User from './components/User';
import { Provider } from 'react-redux'
import store from './services/store';

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <User />
      </div>
    </Provider>
  );
}

export default App;
