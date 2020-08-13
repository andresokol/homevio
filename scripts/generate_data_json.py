import csv

FILENAME = "/home/andresokol/Downloads/contacts_2020_08_13.csv"


cities = set()
data = {}

with open(FILENAME) as f:
    reader = csv.reader(f)

    for row in reader:
        city = row[1]
        orgname = row[3]
        cities.add(city)

        if not city in data:
            data[city] = []
        data[city] += [{"orgname": orgname}]


x = []
for city in cities:
    x += [{"name": city, "value": city}]

# print(x)
print(data)
