export async function fetchPlaceDetails(placeId) {
  const API_URL = "한국관광공사_상세정보_API";
  const API_KEY = "API_KEY";

  const response = await fetch(`${API_URL}?serviceKey=${API_KEY}&contentId=${placeId}`);
  const data = await response.json();
  return data;
}
