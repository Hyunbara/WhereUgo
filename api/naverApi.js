import { API_KEYS } from "../config.js";

export async function searchPlaces(query) {
  const API_URL = "https://openapi.naver.com/v1/search/local.json";
  const CLIENT_ID = API_KEYS.NAVER_CLIENT_ID;
  const CLIENT_SECRET = API_KEYS.NAVER_CLIENT_SECRET;

  try {
    const response = await fetch(`${API_URL}?query=${query}`, {
      headers: {
        "X-Naver-Client-Id": CLIENT_ID,
        "X-Naver-Client-Secret": CLIENT_SECRET,
      },
    });

    if (!response.ok) throw new Error("네이버 지역 검색 실패!");

    const data = await response.json();
    console.log("✅ 네이버 지역 검색 결과:", data);

    return data.items;
  } catch (error) {
    console.error("❌ 네이버 API 호출 오류:", error);
    return [];
  }
}
