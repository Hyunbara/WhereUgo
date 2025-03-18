// api/kakaoMap.js
export function loadMap(containerId, places) {
  const container = document.getElementById(containerId);
  const options = {
    center: new kakao.maps.LatLng(37.5665, 126.978), // 기본 위치: 서울
    level: 7,
  };

  const map = new kakao.maps.Map(container, options);

  // 마커 추가
  places.forEach((place) => {
    const marker = new kakao.maps.Marker({
      position: new kakao.maps.LatLng(place.latitude, place.longitude),
      map: map,
    });

    // 마커 클릭 이벤트 추가
    kakao.maps.event.addListener(marker, "click", () => {
      alert(`${place.name}\n주소: ${place.address}`);
    });
  });
}
