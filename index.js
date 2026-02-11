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

app.post("/", (req, res) => {
  const randomMission = missions[Math.floor(Math.random() * missions.length)];

  res.json({
    version: "2.0",
    template: {
      outputs: [
        {
          simpleText: {
            text: "🚈이번 랜덤 미션\n\n" + randomMission
          }
        }
      ]
    }
  });
});

app.listen(process.env.PORT || 3000);

  // 2️⃣ 완료 (재추첨 없음)
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

  // 3️⃣ 패스 → 실패 후 새 미션
  if (utterance === "패스") {
    return res.json(
      missionResponse(getRandomMission(), true)
    );
  }

  

});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});
