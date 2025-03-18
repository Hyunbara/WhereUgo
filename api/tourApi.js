import { API_KEYS } from "../src/config";

export async function fetchTravelData(region) {
  const API_URL = "https://apis.data.go.kr/B551011/KorService1/searchKeyword1";
  const API_KEY = API_KEYS.TOUR_API_KEY;

  try {
    const response = await fetch(
      `${API_URL}?serviceKey=${API_KEY}&MobileOS=ETC&MobileApp=WhereUgo&_type=json&numOfRows=10&pageNo=1&keyword=${region}`
    );

    if (!response.ok) throw new Error("데이터 불러오기 실패!");

    const data = await response.json();
    console.log("✅ API 응답 데이터:", data);

    if (!data.response || !data.response.body || !data.response.body.items) {
      throw new Error("API 응답이 올바르지 않습니다.");
    }

    return data.response.body.items.item;
  } catch (error) {
    console.error("❌ API 호출 오류:", error);
    return [];
  }
}
