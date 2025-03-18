import { API_KEYS } from "../config.js";

export function loadMap(containerId, places) {
  const container = document.getElementById(containerId);
  const options = {
    center: new kakao.maps.LatLng(37.5665, 126.978), // 기본 위치: 서울
    level: 7,
  };

  const map = new kakao.maps.Map(container, options);

  places.forEach((place) => {
    const marker = new kakao.maps.Marker({
      position: new kakao.maps.LatLng(place.latitude, place.longitude),
      map: map,
    });

    kakao.maps.event.addListener(marker, "click", () => {
      alert(`${place.name}\n주소: ${place.address}`);
    });
  });
}

// ✅ 카카오 지도 API 동적 로드
export function loadKakaoMapScript() {
  const script = document.createElement("script");
  script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${API_KEYS.KAKAO_MAP_API_KEY}&libraries=services`;
  script.async = true;
  document.head.appendChild(script);
}
