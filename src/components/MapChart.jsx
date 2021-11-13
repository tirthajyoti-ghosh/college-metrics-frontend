/* eslint-disable react/prop-types */
import { Button } from 'antd';
import React, { memo, useState } from 'react';
import {
    ZoomableGroup,
    ComposableMap,
    Geographies,
    Geography,
} from 'react-simple-maps';

const geoUrl = 'https://raw.githubusercontent.com/zcreativelabs/react-simple-maps/master/topojson-maps/world-110m.json';

const MapChart = ({ setTooltipContent, data, dispatchUpdateTableDataType }) => {
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
            <ComposableMap
                data-tip=""
                projectionConfig={{ scale: 160, rotation: [-11, 0, 0] }}
                height={400}
                // style={{ width: '100%', height: 'auto' }}
            >
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
                                            const { country } = d;

                                            dispatchUpdateTableDataType({
                                                type: 'country',
                                                value: country,
                                            });
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
                <Button
                    icon={(
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
                    )}
                    onClick={() => handleZoomIn()}
                />

                <Button
                    onClick={() => handleZoomOut()}
                    icon={(
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
                    )}
                />
            </div>
        </>
    );
};

export default memo(MapChart);
