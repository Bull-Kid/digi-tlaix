import { ComicViewer } from "./components/ComicViewer.js";
import { GeoLocationService } from "./services/GeoLocationService.js";
import { GeoFenceValidator } from "./services/GeoFenceValidator.js";
import { comicPages } from "./data/comicData.js";

const TARGET_LOCATION = {
  latitude: 19.432608,
  longitude: -99.133209
};

const MAX_DISTANCE = 50;

const viewer = new ComicViewer("comic-container");

viewer.hide();

async function init() {

  try {

    const userPosition =
      await GeoLocationService.getCurrentPosition();

    const validation =
      GeoFenceValidator.isInsideRadius(
        userPosition.latitude,
        userPosition.longitude,
        TARGET_LOCATION.latitude,
        TARGET_LOCATION.longitude,
        MAX_DISTANCE
      );

    document.getElementById("status").innerText =
      `Distancia: ${validation.distance.toFixed(2)} m`;

    if (validation.allowed) {

      viewer.loadPages(comicPages);
      viewer.show();

      document.getElementById("access").innerText =
        "✅ Cómic desbloqueado";

    } else {

      document.getElementById("access").innerText =
        "❌ Debes acercarte a menos de 50 metros";
    }

  } catch (error) {

    document.getElementById("access").innerText =
      `Error: ${error}`;
  }
}

init();
