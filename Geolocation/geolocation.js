let map, infoWindow;

function initMap() { 39.630114,15.728312
  map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: 39.630114, lng: 15.728312 },
    zoom: 5,
  });
  
  var coord = document.getElementById("coord");
  const locationButton = document.createElement("button");

  locationButton.textContent = "Activar geolocalización";
  locationButton.classList.add("custom-map-control-button");
  map.controls[google.maps.ControlPosition.TOP_CENTER].push(locationButton);
  locationButton.addEventListener("click", () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };

          var markerPos = new google.maps.Marker({
            position: pos,
            map: map,
        });
          map.setZoom(10);
          map.setCenter(pos);
          coord.innerHTML = "Latitud: " + position.coords.latitude + 
        "<br>Longitud: " + position.coords.longitude;
        },
        () => {
          handleLocationError(true, infoWindow, map.getCenter());
        }
      );
    } else {
      handleLocationError(false, infoWindow, map.getCenter());
    }
    
    const image =
      "https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png";
    const marker1 = new google.maps.Marker({
      position: { lat: 39.524545, lng: 2.499948 },
      map,
      icon: image,
    });

    
    const marker2 = new google.maps.Marker({
      position: { lat: 39.571289, lng: 2.656733 },
      map,
      icon: image,
    });

    
    const marker3 = new google.maps.Marker({
      position: { lat: 39.8934035, lng: 3.0736522 },
      map,
      icon: image,
    });

    
    const marker4 = new google.maps.Marker({
      position: { lat: 39.5436123, lng: 3.3315682 },
      map,
      icon: image,
    });

    const marker5 = new google.maps.Marker({
        position: { lat: 39.3193459, lng: 2.9889481 },
        map,
        icon: image,
      });
  });
}

function handleLocationError(browserHasGeolocation, infoWindow, pos) {
  infoWindow.setPosition(pos);
  infoWindow.setContent(
    browserHasGeolocation
      ? "Error: El servicio de geolocalización falló."
      : "Error: Tu navegador no soporta el servicio de geolocalización."
  );
  infoWindow.open(map);
}
