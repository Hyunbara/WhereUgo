import { API_KEYS } from "../src/config";

export async function fetchTravelData(region) {
  const API_URL = "https://apis.data.go.kr/B551011/KorService1/searchKeyword1";
  const API_KEY = API_KEYS.TOUR_API_KEY;

  try {
    const response = await fetch(`${API_URL}?serviceKey=${API_KEY}&_type=json&keyword=${region}`);
    if (!response.ok) throw new Error("데이터 불러오기 실패!");

    const data = await response.json();
    console.log("✅ 여행지 데이터:", data);

    return data.response.body.items.item;
  } catch (error) {
    console.error("❌ API 호출 오류:", error);
    return [];
  }
}
