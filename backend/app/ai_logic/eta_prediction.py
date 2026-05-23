from sklearn.tree import DecisionTreeRegressor
 
# Ուսուցողական տվյալներ [հեռավորություն(կմ), ծանրաբեռնվածություն, խցանում(0-2)]
X = [
    [1.0, 0, 0], [2.5, 1, 0], [4.0, 2, 1], 
    [6.0, 1, 1], [8.0, 3, 2], [10.0, 4, 2]
]
y = [10, 18, 25, 32, 50, 65] # Ժամանակը րոպեներով
 
model = DecisionTreeRegressor()
model.fit(X, y)
 
def predict_delivery_time(distance, courier_load, traffic_level):
    prediction = model.predict([[distance, courier_load, traffic_level]])
    return round(prediction[0], 1)
