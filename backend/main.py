# backend/main.py
from fastapi.middleware.cors import CORSMiddleware
from fastapi import FastAPI
from pydantic import BaseModel

app = FastAPI()

# 👇 CORS 설정
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # 또는 ["http://localhost:3000"]
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# 📥 클라이언트에서 받아올 데이터 형식
class BoothRequest(BaseModel):
    width: int       # 부스 가로
    height: int      # 부스 세로
    booth_count: int # 부스 개수

# 📤 응답할 자동 배치 결과
@app.post("/auto-layout")
def auto_layout(req: BoothRequest):
    booths = []

    for i in range(req.booth_count):
        booth = {
            "x": i * (req.width + 20),   # 부스 사이 20px 간격
            "y": 100,                    # 모두 같은 y 좌표
            "width": req.width,
            "height": req.height
        }
        booths.append(booth)

    return {"booths": booths}
