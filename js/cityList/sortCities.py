import json

newData = []

with open('city.list.min.json') as json_cities:
    data = json.load(json_cities)
    for city in data:
        if city['country'] ==  'GB':
            newData.append(city)

with open('newCities.json', 'w') as outfile:
    json.dump(newData, outfile)

    
