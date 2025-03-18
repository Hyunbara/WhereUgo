import { API_KEYS } from "./config.js";
import { fetchTravelData } from "../api/tourApi.js"; // 여행지 데이터를 불러오는 함수

document.addEventListener("DOMContentLoaded", () => {
  const questionContainer = document.getElementById("questionContainer");
  const questionText = document.getElementById("questionText");
  const optionsContainer = document.getElementById("optionsContainer");
  const nextButton = document.getElementById("nextButton");
  const resultContainer = document.getElementById("resultContainer");
  const resultList = document.getElementById("resultList");

  let currentQuestionIndex = 0;
  let userAnswers = {};

  // ✅ API 키가 정상적으로 불러와지는지 확인하는 로그 추가
  console.log("✅ 공공데이터포털 API 키:", API_KEYS.TOUR_API_KEY);
  console.log("✅ 네이버 검색 API 키:", API_KEYS.NAVER_CLIENT_ID);
  console.log("✅ 카카오맵 API 키:", API_KEYS.KAKAO_MAP_API_KEY);

  const questions = [
    {
      text: "어떤 여행을 원하시나요?",
      options: ["힐링", "액티비티", "문화탐방", "맛집 탐방"],
      key: "travelType",
    },
    {
      text: "여행 기간은 얼마나 되나요?",
      options: ["1박 2일", "2박 3일", "3박 이상"],
      key: "duration",
    },
    {
      text: "여행 목적은?",
      options: ["휴식", "사진 촬영", "레저", "가족 여행"],
      key: "purpose",
    },
    {
      text: "산 vs 바다?",
      options: ["산", "바다", "상관없음"],
      key: "nature",
    },
    {
      text: "음식 스타일은?",
      options: ["해산물", "고기", "현지 특색 음식"],
      key: "food",
    },
  ];

  function loadQuestion() {
    if (currentQuestionIndex < questions.length) {
      const currentQuestion = questions[currentQuestionIndex];

      questionText.textContent = currentQuestion.text;
      optionsContainer.innerHTML = ""; // 기존 버튼 삭제

      currentQuestion.options.forEach((option) => {
        const button = document.createElement("button");
        button.textContent = option;
        button.classList.add("w-full", "p-2", "bg-gray-200", "rounded", "hover:bg-gray-300");
        button.addEventListener("click", () => {
          userAnswers[currentQuestion.key] = option;
          nextQuestion();
        });
        optionsContainer.appendChild(button);
      });

      nextButton.classList.add("hidden"); // '다음' 버튼 숨김
    } else {
      showRecommendation();
    }
  }

  function nextQuestion() {
    currentQuestionIndex++;
    loadQuestion();
  }

  async function showRecommendation() {
    questionContainer.classList.add("hidden");
    resultContainer.classList.remove("hidden");

    // ✅ 사용자의 답변을 기반으로 여행지를 추천하는 로직
    let recommendedRegion = "서울"; // 기본값

    if (userAnswers.nature === "바다") {
      recommendedRegion = "제주";
    } else if (userAnswers.nature === "산") {
      recommendedRegion = "강원도";
    } else if (userAnswers.travelType === "힐링") {
      recommendedRegion = "전라도";
    } else if (userAnswers.travelType === "액티비티") {
      recommendedRegion = "강원도";
    } else if (userAnswers.travelType === "맛집 탐방") {
      recommendedRegion = "부산";
    }

    console.log("🌍 추천 지역:", recommendedRegion);

    // ✅ 공공데이터포털 API를 이용하여 추천 여행지 가져오기
    const recommendations = await fetchTravelData(recommendedRegion);

    resultList.innerHTML = "";
    if (!recommendations || recommendations.length === 0) {
      resultList.innerHTML = "<p class='text-red-500'>추천 여행지를 찾을 수 없습니다.</p>";
      return;
    }

    recommendations.forEach((place) => {
      const listItem = document.createElement("li");
      listItem.classList.add("p-2", "bg-gray-100", "rounded-lg");
      listItem.innerHTML = `<strong>${place.name}</strong> - ${place.address}`;
      resultList.appendChild(listItem);
    });
  }

  // 첫 번째 질문 로드
  loadQuestion();
});
