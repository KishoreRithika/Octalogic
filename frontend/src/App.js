import logo from './logo.svg';
import './App.css';
import Question from './components/Question';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';

function App() {
  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <Question />
    </MuiPickersUtilsProvider>
  );
}

export default App;
