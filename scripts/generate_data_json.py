import csv

FILENAME = "/home/andresokol/Downloads/data2.csv"


cities = set()
data = {}

with open(FILENAME) as f:
    reader = csv.reader(f)

    i = 1
    for row in reader:
        city = row[1]
        orgname = row[3]
        cities.add(city)

        if not city in data:
            data[city] = []
        data[city] += [{"orgname": orgname, "filename": f"{i}.pdf"}]
        i += 1


x = []
for city in cities:
    x += [{"name": city, "value": city}]

# print(sorted(x, key=lambda x: x["name"]))
print(data)
