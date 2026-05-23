from math import radians, sin, cos, sqrt, atan2
 
def calculate_distance(lat1, lon1, lat2, lon2):
    R = 6371  # Երկրի շառավիղը կմ-ով
    d_lat = radians(lat2 - lat1)
    d_lon = radians(lon2 - lon1)
    a = sin(d_lat / 2) ** 2 + cos(radians(lat1)) * cos(radians(lat2)) * sin(d_lon / 2) ** 2
    c = 2 * atan2(sqrt(a), sqrt(1 - a))
    return R * c
 
def select_best_courier(order_location, couriers):
    best_courier = None
    min_score = float("inf")
 
    for courier in couriers:
        distance = calculate_distance(
            order_location["latitude"], order_location["longitude"],
            courier["latitude"], courier["longitude"]
        )
        # Ծանրաբեռնվածության և հեռավորության համատեղում
        score = distance + courier["load"]
 
        if score < min_score:
            min_score = score
            best_courier = courier
            best_courier["calculated_distance_km"] = round(distance, 2)
 
    return best_courier
