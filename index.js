const express = require("express");
const app = express();

app.use(express.json());

const missions = [
"6호선 타기",
"4호선 타기",
"경전철 타기",
"뱀눈이 또는 삼눈이 열차 타기",
"주둥이 열차 타기",
"2호선 타기",
"경의중앙선 타기",
"경춘선 타기",
"서울숲역 방문하기",
"청량리역 방문하기",
"자양역 방문하기",
"1호선 서울교통공사 열차 탑승하기",
"양재시민의숲역 방문하기",
"3호선 구반포역 탑승하기",
"대림역 방문하기",
"GTX 탑승하기",
"마곡나루역 방문하기",
"충정로역 방문하기",
"녹사평역 방문하기",
"6량 열차 타기",
"4량 열차 타기",
"광화문역 방문하기",
"5호선 우진산전 탑승하기"
];

// 닉네임 저장
let userName = {};

function getRandomMission() {
  return missions[Math.floor(Math.random() * missions.length)];
}

function missionResponse(name, missionText, failMessage = false) {

  let text = "";

  if (failMessage) {
    text += "❌ 미션 실패!\n\n";
  }

  text += `🚈 ${name}님의 랜덤 미션은\n\n👉 ${missionText}`;

  return {
    version: "2.0",
    template: {
      outputs: [
        {
          simpleText: {
            text: text
          }
        }
      ],
      quickReplies: [
        {
          label: "✅ 미션 완료",
          action: "message",
          messageText: "완료"
        },
        {
          label: "❌ 패스",
          action: "message",
          messageText: "패스"
        }
      ]
    }
  };
}

app.post("/", (req, res) => {

  const userId = req.body.userRequest.user.id;
  const utterance = req.body.userRequest.utterance;

  // 1️⃣ 닉네임 등록
  if (utterance.startsWith("/등록")) {
    const name = utterance.replace("/등록", "").trim();
    userName[userId] = name;

    return res.json({
      version: "2.0",
      template: {
        outputs: [
          {
            simpleText: {
              text: `✅ ${name}님으로 등록되었습니다!`
            }
          }
        ]
      }
    });
  }

  const name = userName[userId] || "사용자";

  // 2️⃣ 미션 요청
  if (utterance === "미션") {
    return res.json(
      missionResponse(name, getRandomMission())
    );
  }

  // 3️⃣ 완료 버튼 (재추첨 없음)
  if (utterance === "완료") {
    return res.json({
      version: "2.0",
      template: {
        outputs: [
          {
            simpleText: {
              text: "🔥 미션 성공! 수고하셨습니다!"
            }
          }
        ]
      }
    });
  }

  // 4️⃣ 패스 버튼 → 실패 후 새 미션
  if (utterance === "패스") {
    return res.json(
      missionResponse(name, getRandomMission(), true)
    );
  }

  // 기본 안내
  return res.json({
    version: "2.0",
    template: {
      outputs: [
        {
          simpleText: {
            text: "명령어:\n/등록 닉네임\n미션"
          }
        }
      ]
    }
  });

});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});
