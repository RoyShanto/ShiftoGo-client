import { useState, useRef, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Fix default marker icon issue
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",
    iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
    shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
});


function FlyToLocation({ coords }) {
    const map = useMap();
    if (coords) {
        map.flyTo(coords, 10, { duration: 1.5 });
    }
    return null;
}

const Coverage = () => {
    const [locations, setLocations] = useState([]);
    useEffect(() => {
        fetch('./data/coverageMap.json')
            .then(res => res.json())
            .then(data => setLocations(data))
    }, [])

    const [searchTerm, setSearchTerm] = useState("");
    const [selectedCoords, setSelectedCoords] = useState(null);
    const markerRef = useRef(null);

    const handleSearch = () => {
        const result = locations.find(
            (loc) =>
                loc.district.toLowerCase() === searchTerm.toLowerCase() ||
                loc.city.toLowerCase() === searchTerm.toLowerCase()
        );

        if (!result) {
            alert("District not found!");
            return;
        }

        const coords = [result.latitude, result.longitude];
        setSelectedCoords(coords);

        setTimeout(() => {
            if (markerRef.current) {
                markerRef.current.openPopup();
            }
        }, 1000);
    };



    return (
        <div className='py-20 px-28 bg-white rounded-4xl mb-48'>
            <div className='mb-12'>
                <h1 className='text-6xl font-extrabold mb-12'>We are available in 64 districts</h1>
                <div className="w-full">
                    <label className="w-1/2 input input-bordered flex items-center gap-3 rounded-full bg-gray-100">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500" fill="none" viewBox="0 0 20 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                d="M21 21l-4.35-4.35M11 19a8 8 0 100-16 8 8 0 000 16z" />
                        </svg>
                        <input type="text" className="grow bg-transparent focus:outline-none" placeholder="Search here" onChange={(e) => setSearchTerm(e.target.value)} />
                        <button className="btn rounded-full bg-[#CAEB66] border-none text-black px-6 -mx-3 hover:bg-lime-400" onClick={handleSearch}> Search </button>
                    </label>
                </div>
            </div>
            <hr className='border-t border-gray-300 mb-12' />
            <h2 className='font-extrabold text-3xl mb-12'>We deliver almost all over Bangladesh</h2>



            {/* Map */}
            <MapContainer
                center={[23.685, 90.3563]}
                zoom={7}
                className="w-full h-[400px] rounded-lg"
                scrollWheelZoom={true}
            >
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution="&copy; OpenStreetMap"
                />

                {locations.map((loc, idx) => (
                    <Marker
                        key={idx}
                        position={[loc.latitude, loc.longitude]}
                        ref={selectedCoords &&
                            loc.latitude === selectedCoords[0] &&
                            loc.longitude === selectedCoords[1]
                            ? markerRef
                            : null}
                    >
                        <Popup>
                            <b>{loc.city}, {loc.district}</b><br />
                            Region: {loc.region}<br />
                            <div className="mt-1 text-xs">
                                Areas: {loc.covered_area.join(", ")}
                            </div>
                        </Popup>
                    </Marker>
                ))}

                <FlyToLocation coords={selectedCoords} />
            </MapContainer>
        </div>
    );
};

export default Coverage;