import Navbar from './components/Navbar';
import Charts from './containers/Charts';
import Table from './containers/Table';

import './styles/main.scss';

function App() {
    return (
        <div className="App">
            <Navbar />
            <Charts />
            <Table type="colleges" />
        </div>
    );
}

export default App;
