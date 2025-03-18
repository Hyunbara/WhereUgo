import { API_KEYS } from "../src/config.js";

let isKakaoLoaded = false;

// 카카오맵 API 로드
export function loadKakaoMapScript(callback) {
  if (isKakaoLoaded) {
    callback();
    return;
  }

  const existingScript = document.getElementById("kakao-map-script");
  if (!existingScript) {
    const script = document.createElement("script");
    script.id = "kakao-map-script";
    script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${API_KEYS.KAKAO_MAP_API_KEY}&libraries=services`;
    script.onload = () => {
      isKakaoLoaded = true;
      console.log("✅ 카카오맵 로드 완료");
      if (callback) callback();
    };
    document.head.appendChild(script);
  } else {
    existingScript.onload = () => {
      isKakaoLoaded = true;
      console.log("✅ 카카오맵 이미 로드됨");
      if (callback) callback();
    };
  }
}

// ✅ 특정 장소를 지도에 표시하는 함수 (좌표 값 확인 추가)
export function showLocationOnMap(place) {
  if (!isKakaoLoaded || !window.kakao || !window.kakao.maps) {
    console.error("❌ 카카오맵이 아직 로드되지 않았습니다.");
    return;
  }

  console.log("🗺️ 선택된 여행지 데이터:", place); // ✅ 여행지 데이터 확인

  const mapContainer = document.getElementById("map");

  if (!mapContainer) {
    console.error("❌ 지도 컨테이너를 찾을 수 없습니다.");
    return;
  }

  // ✅ 좌표 값이 숫자로 변환되는지 확인
  const lat = parseFloat(place.mapy);
  const lng = parseFloat(place.mapx);

  if (isNaN(lat) || isNaN(lng)) {
    console.error("❌ 유효한 좌표 값이 아닙니다:", { mapy: place.mapy, mapx: place.mapx });
    return;
  }

  console.log("📍 지도 중심 좌표:", { lat, lng }); // ✅ 변환된 좌표 확인

  const options = {
    center: new kakao.maps.LatLng(lat, lng), // ✅ 선택한 장소 중심 좌표
    level: 3, // 확대 레벨
  };

  const map = new kakao.maps.Map(mapContainer, options);

  // ✅ 마커 추가
  const marker = new kakao.maps.Marker({
    position: new kakao.maps.LatLng(lat, lng),
    map: map,
  });

  // ✅ 정보창 표시
  const infoWindow = new kakao.maps.InfoWindow({
    content: `<div style="padding:5px;">${place.title}</div>`,
  });

  infoWindow.open(map, marker);
}
