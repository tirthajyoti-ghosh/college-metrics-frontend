import React, { useState } from 'react';
import ReactTooltip from 'react-tooltip';

import DonutChart from './components/DonutChart';
import MapChart from './components/MapChart';

function App() {
    const [content, setContent] = useState('');

    return (
        <div className="App">
            <DonutChart />
            <MapChart setTooltipContent={setContent} />
            <ReactTooltip>{content}</ReactTooltip>
        </div>
    );
}

export default App;
