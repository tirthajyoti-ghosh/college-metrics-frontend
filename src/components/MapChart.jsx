import React, { memo, useState } from 'react';
import {
    ZoomableGroup,
    ComposableMap,
    Geographies,
    Geography,
} from 'react-simple-maps';

const geoUrl = 'https://raw.githubusercontent.com/zcreativelabs/react-simple-maps/master/topojson-maps/world-110m.json';
const data = [
    {
        country: 'Iran',
        count: 1,
    },
    {
        country: 'United States',
        count: 1,
    },
    {
        country: 'Italy',
        count: 1,
    },
    {
        country: 'Norway',
        count: 1,
    },
    {
        country: 'Iraq',
        count: 1,
    },
    {
        country: 'Madagascar',
        count: 1,
    },
    {
        country: 'Guatemala',
        count: 1,
    },
    {
        country: 'Albania',
        count: 1,
    },
    {
        country: 'Brazil',
        count: 3,
    },
    {
        country: 'Syria',
        count: 2,
    },
    {
        country: 'Canada',
        count: 1,
    },
    {
        country: 'Mauritius',
        count: 1,
    },
    {
        country: 'Honduras',
        count: 1,
    },
    {
        country: 'Portugal',
        count: 7,
    },
    {
        country: 'Zimbabwe',
        count: 1,
    },
    {
        country: 'Japan',
        count: 3,
    },
    {
        country: 'Thailand',
        count: 1,
    },
    {
        country: 'Greece',
        count: 4,
    },
    {
        country: 'Poland',
        count: 2,
    },
    {
        country: 'Czech Republic',
        count: 3,
    },
    {
        country: 'Ukraine',
        count: 3,
    },
    {
        country: 'Palestine',
        count: 1,
    },
    {
        country: 'Russia',
        count: 10,
    },
    {
        country: 'Colombia',
        count: 2,
    },
    {
        country: 'France',
        count: 2,
    },
    {
        country: 'Philippines',
        count: 6,
    },
    {
        country: 'Sweden',
        count: 1,
    },
    {
        country: 'Mongolia',
        count: 1,
    },
    {
        country: 'Slovenia',
        count: 2,
    },
    {
        country: 'Indonesia',
        count: 11,
    },
    {
        country: 'China',
        count: 20,
    },
    {
        country: 'Netherlands',
        count: 1,
    },
    {
        country: 'Yemen',
        count: 1,
    },
    {
        country: 'Mexico',
        count: 2,
    },
];

// eslint-disable-next-line react/prop-types
const MapChart = ({ setTooltipContent }) => {
    const [position, setPosition] = useState({ coordinates: [0, 0], zoom: 1 });
    function handleZoomIn() {
        if (position.zoom >= 4) return;
        setPosition((pos) => ({ ...pos, zoom: pos.zoom * 2 }));
    }

    function handleZoomOut() {
        if (position.zoom <= 1) return;
        setPosition((pos) => ({ ...pos, zoom: pos.zoom / 2 }));
    }

    return (
        <>
            <ComposableMap data-tip="" projectionConfig={{ scale: 200 }}>
                <ZoomableGroup
                    center={position.coordinates}
                    zoom={position.zoom}
                    onMoveEnd={() => setPosition(position)}
                >
                    <Geographies geography={geoUrl}>
                        {({ geographies }) => geographies.map((geo) => {
                            const d = data.find((s) => s.country === geo.properties.NAME);
                            return (
                                <Geography
                                    key={geo.rsmKey}
                                    geography={geo}
                                    fill={d ? '#ff5233' : '#ffedea'}
                                    onClick={() => {
                                        if (d) {
                                            const { country, count } = d;
                                            console.log(country, count);
                                        }
                                    }}
                                    onMouseEnter={() => {
                                        if (d) {
                                            const { country, count } = d;
                                            setTooltipContent(`${country} — ${count}`);
                                        } else {
                                            setTooltipContent(`${geo.properties.NAME} — 0`);
                                        }
                                    }}
                                    onMouseLeave={() => {
                                        setTooltipContent('');
                                    }}
                                />
                            );
                        })}
                    </Geographies>
                </ZoomableGroup>
            </ComposableMap>
            <div className="controls">
                <button onClick={handleZoomIn} type="button">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="3"
                    >
                        <line x1="12" y1="5" x2="12" y2="19" />
                        <line x1="5" y1="12" x2="19" y2="12" />
                    </svg>
                </button>
                <button onClick={handleZoomOut} type="button">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="3"
                    >
                        <line x1="5" y1="12" x2="19" y2="12" />
                    </svg>
                </button>
            </div>
        </>
    );
};

export default memo(MapChart);
