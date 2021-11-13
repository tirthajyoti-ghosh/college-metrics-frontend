import Navbar from './components/Navbar';
import Charts from './containers/Charts';
import CollegeDetails from './containers/CollegeDetails';
import Table from './containers/Table';

import './styles/main.scss';

function App() {
    return (
        <div className="App">
            <Navbar />

            <main>
                <section className="left">
                    <Charts />
                    <Table type="colleges" scrollY={500} />
                </section>

                <section className="right">
                    <CollegeDetails />
                </section>
            </main>
        </div>
    );
}

export default App;
