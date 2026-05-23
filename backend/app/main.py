from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List
from app.ai_logic.courier_selection import select_best_courier
from app.ai_logic.eta_prediction import predict_delivery_time

app = FastAPI(title="AI Delivery System API")

# Թույլատրում ենք Ֆրոնտենդին կապնվել Բեքենդի հետ
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Թույլատրում է բոլոր հասցեներից (ներառյալ localhost:3000)
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class OrderLocation(BaseModel):
    latitude: float
    longitude: float

class Courier(BaseModel):
    id: int
    name: str
    latitude: float
    longitude: float
    load: int

class SystemCheckRequest(BaseModel):
    order_location: OrderLocation
    couriers: List[Courier]
    traffic_level: int

@app.get("/")
def read_root():
    return {"message": "Առաքման ԱԻ Համակարգի Բեքենդը պատրաստ է։"}

@app.post("/api/process-delivery")
def process_delivery(request: SystemCheckRequest):
    if not request.couriers:
        raise HTTPException(status_code=400, detail="Առաքիչների ցուցակը դատարկ է։")

    order_loc = request.order_location.model_dump()
    couriers_list = [c.model_dump() for c in request.couriers]

    best_courier = select_best_courier(order_loc, couriers_list)

    estimated_time = predict_delivery_time(
        distance=best_courier["calculated_distance_km"],
        courier_load=best_courier["load"],
        traffic_level=request.traffic_level
    )

    return {
        "status": "success",
        "selected_courier": {
            "id": best_courier["id"],
            "name": best_courier["name"],
            "distance_km": best_courier["calculated_distance_km"]
        },
        "estimated_delivery_time_minutes": estimated_time
    }
