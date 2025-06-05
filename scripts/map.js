import { YOUR_GOOGLE_MAPS_API_KEY } from './config.js';

function showFallbackIframe() {
  const mapContainer = document.getElementById("map");
  mapContainer.innerHTML = `
    <iframe
      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2031.1255919735046!2d10.604718!3d60.289372!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4640d7a2b5b8e933%3A0x4fbad94448b56d61!2sOppdalslinna%20242%2C%202740%20Roa%2C%20Norway!5e0!3m2!1sen!2sno!4v1717599999999!5m2!1sen!2sno"
      width="100%"
      height="400"
      style="border:0; border-radius: 12px;"
      allowfullscreen=""
      loading="lazy"
      referrerpolicy="no-referrer-when-downgrade">
    </iframe>
  `;
}

function initMap() {
  try {
    const farmLocation = { lat: 60.289372, lng: 10.604718 };
    const map = new google.maps.Map(document.getElementById("map"), {
      zoom: 14,
      center: farmLocation,
    });

    const marker = new google.maps.Marker({
      position: farmLocation,
      map,
      title: "Braastad Gård",
    });

    const infoWindow = new google.maps.InfoWindow({
      content: `
        <div style="font-family: Arial; font-size: 14px; line-height: 1.4;">
          <strong>Braastad Gård</strong><br>
          Oppdalslinna 242<br>
          2740 Roa, Norway
        </div>
      `
    });

    marker.addListener("click", () => {
      infoWindow.open(map, marker);
    });

    infoWindow.open(map, marker);
  } catch (error) {
    console.error("Google Maps initialization failed:", error);
    showFallbackIframe();
  }
}

function loadGoogleMapsAPI(apiKey) {
  if (!apiKey || apiKey.trim() === "") {
    showFallbackIframe();
    return;
  }

  window.initMap = initMap;

  const script = document.createElement('script');
  script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&callback=initMap`;
  script.async = true;
  script.defer = true;

  script.onerror = () => {
    console.error("Failed to load Google Maps API script");
    showFallbackIframe();
  };

  document.head.appendChild(script);
}

document.addEventListener('DOMContentLoaded', () => {
  try {
    loadGoogleMapsAPI(YOUR_GOOGLE_MAPS_API_KEY);
  } catch (error) {
    console.error("Unexpected error:", error);
    showFallbackIframe();
  }
});
