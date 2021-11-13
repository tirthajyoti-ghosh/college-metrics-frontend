import Navbar from './components/Navbar';
import Charts from './containers/Charts';
import CollegeDetails from './containers/CollegeDetails';
import Table from './containers/Table';

import './styles/main.scss';

function App() {
    return (
        <div className="App">
            <section className="left">
                <Navbar />
                <Charts />
                <Table type="colleges" />
            </section>

            <section className="right">
                <CollegeDetails />
            </section>
        </div>
    );
}

export default App;
