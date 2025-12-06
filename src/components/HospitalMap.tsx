import { useEffect, useRef, useState } from 'react';
import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import { Button } from '@/components/ui/button';
import { MapPin, Navigation } from 'lucide-react';

interface Hospital {
  id: string;
  name: string;
  address: string;
  lat: number;
  lng: number;
  phone: string;
  specialty: string;
}

const sampleHospitals: Hospital[] = [
  { id: '1', name: 'City Cancer Center', address: '123 Medical Drive', lat: 40.7128, lng: -74.006, phone: '+1-555-0101', specialty: 'Oncology' },
  { id: '2', name: 'Regional Oncology Hospital', address: '456 Health Avenue', lat: 40.7282, lng: -73.9942, phone: '+1-555-0102', specialty: 'Radiation Oncology' },
  { id: '3', name: 'Memorial Cancer Institute', address: '789 Care Street', lat: 40.7589, lng: -73.9851, phone: '+1-555-0103', specialty: 'Surgical Oncology' },
  { id: '4', name: 'University Cancer Center', address: '321 Research Blvd', lat: 40.6892, lng: -74.0445, phone: '+1-555-0104', specialty: 'Medical Oncology' },
  { id: '5', name: 'Community Cancer Hospital', address: '654 Wellness Way', lat: 40.7484, lng: -73.9857, phone: '+1-555-0105', specialty: 'Comprehensive Cancer Care' },
];

const HospitalMap = () => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<maplibregl.Map | null>(null);
  const [userLocation, setUserLocation] = useState<[number, number] | null>(null);
  const [selectedHospital, setSelectedHospital] = useState<Hospital | null>(null);
  const [isLocating, setIsLocating] = useState(false);

  useEffect(() => {
    if (!mapContainer.current) return;

    map.current = new maplibregl.Map({
      container: mapContainer.current,
      style: 'https://basemaps.cartocdn.com/gl/positron-gl-style/style.json',
      center: [-74.006, 40.7128],
      zoom: 11,
    });

    map.current.addControl(new maplibregl.NavigationControl(), 'top-right');

    // Add hospital markers
    sampleHospitals.forEach((hospital) => {
      const marker = new maplibregl.Marker({ color: '#ef4444' })
        .setLngLat([hospital.lng, hospital.lat])
        .setPopup(
          new maplibregl.Popup({ offset: 25 }).setHTML(`
            <div class="p-2">
              <h3 class="font-bold text-sm">${hospital.name}</h3>
              <p class="text-xs text-gray-600">${hospital.address}</p>
              <p class="text-xs text-gray-600">${hospital.phone}</p>
              <p class="text-xs font-medium text-primary">${hospital.specialty}</p>
            </div>
          `)
        )
        .addTo(map.current!);

      marker.getElement().addEventListener('click', () => {
        setSelectedHospital(hospital);
      });
    });

    return () => {
      map.current?.remove();
    };
  }, []);

  const handleGetLocation = () => {
    setIsLocating(true);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setUserLocation([longitude, latitude]);
          
          if (map.current) {
            // Add user marker
            new maplibregl.Marker({ color: '#3b82f6' })
              .setLngLat([longitude, latitude])
              .setPopup(new maplibregl.Popup().setHTML('<p class="font-medium">Your Location</p>'))
              .addTo(map.current);

            map.current.flyTo({
              center: [longitude, latitude],
              zoom: 13,
            });
          }
          setIsLocating(false);
        },
        (error) => {
          console.error('Error getting location:', error);
          setIsLocating(false);
        }
      );
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-semibold">Nearby Cancer Hospitals</h3>
        <Button onClick={handleGetLocation} disabled={isLocating} variant="outline" size="sm">
          <Navigation className="w-4 h-4 mr-2" />
          {isLocating ? 'Locating...' : 'Use My Location'}
        </Button>
      </div>
      
      <div className="relative rounded-xl overflow-hidden border border-border shadow-lg">
        <div ref={mapContainer} className="w-full h-[400px]" />
      </div>

      {selectedHospital && (
        <div className="bg-card border border-border rounded-lg p-4 animate-fade-in">
          <div className="flex items-start gap-3">
            <div className="p-2 bg-primary/10 rounded-lg">
              <MapPin className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h4 className="font-semibold">{selectedHospital.name}</h4>
              <p className="text-sm text-muted-foreground">{selectedHospital.address}</p>
              <p className="text-sm text-muted-foreground">{selectedHospital.phone}</p>
              <span className="inline-block mt-2 text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">
                {selectedHospital.specialty}
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HospitalMap;
