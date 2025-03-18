import { API_KEYS } from "./config.js"; // ✅ 올바른 config.js import
import { fetchTravelData } from "../api/tourApi.js";
import { loadKakaoMapScript, showLocationOnMap } from "../api/kakaoMap.js";

document.addEventListener("DOMContentLoaded", () => {
  const questionContainer = document.getElementById("questionContainer");
  const questionText = document.getElementById("questionText");
  const optionsContainer = document.getElementById("optionsContainer");
  const nextButton = document.getElementById("nextButton");
  const resultContainer = document.getElementById("resultContainer");
  const resultList = document.getElementById("resultList");

  if (!questionText || !optionsContainer || !nextButton) {
    console.error("❌ HTML 요소를 찾을 수 없습니다. index.html을 확인하세요.");
    return;
  }

  let currentQuestionIndex = 0;
  let userAnswers = {};

  // ✅ `questions` 배열 추가 (문제 해결)
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

  function nextQuestion() {
    currentQuestionIndex++;
    loadQuestion();
  }

  function loadQuestion() {
    if (currentQuestionIndex < questions.length) {
      const currentQuestion = questions[currentQuestionIndex];

      questionText.textContent = currentQuestion.text;
      optionsContainer.innerHTML = "";

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

      nextButton.classList.add("hidden");
    } else {
      showRecommendation();
    }
  }

  async function showRecommendation() {
    questionContainer.classList.add("hidden");
    resultContainer.classList.remove("hidden");

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

    const recommendations = await fetchTravelData(recommendedRegion);

    resultList.innerHTML = "";
    if (!recommendations || recommendations.length === 0) {
      resultList.innerHTML = "<p class='text-red-500'>추천 여행지를 찾을 수 없습니다.</p>";
      return;
    }

    recommendations.forEach((place) => {
      const listItem = document.createElement("li");
      listItem.classList.add("p-2", "bg-gray-100", "rounded-lg", "cursor-pointer");
      listItem.innerHTML = `<strong>${place.title}</strong><br>${place.addr1 || "주소 정보 없음"}`;

      // ✅ 여행지 클릭 시 해당 장소를 지도에서 보여줌
      listItem.addEventListener("click", () => {
        console.log("🗺️ 선택된 여행지:", place);
        loadKakaoMapScript(() => showLocationOnMap(place));
      });

      resultList.appendChild(listItem);
    });

    // ✅ 카카오맵을 한 번만 로드
    loadKakaoMapScript(() => {
      console.log("🗺️ 카카오맵 로드 완료");
    });
  }

  // 첫 번째 질문 로드
  loadQuestion();
});
