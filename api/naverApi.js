export async function searchPlaces(query) {
  const API_URL = "네이버_지역검색_API_URL";
  const CLIENT_ID = "네이버_CLIENT_ID";
  const CLIENT_SECRET = "네이버_CLIENT_SECRET";

  const response = await fetch(`${API_URL}?query=${query}`, {
    headers: {
      "X-Naver-Client-Id": CLIENT_ID,
      "X-Naver-Client-Secret": CLIENT_SECRET,
    },
  });

  const data = await response.json();
  return data.items; // 검색 결과 리스트 반환
}
