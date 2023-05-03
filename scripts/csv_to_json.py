# https://www.geeksforgeeks.org/convert-csv-to-json-using-python/
# https://www.museotilasto.fi/tiedostot/museovirasto/files/Museoiden%20toiminta%202021.csv

# Käytä tätä skriptiä muuntaaksesi Museoviraston museoiden toiminta -csv-tiedoston json-tiedostoksi, jotta saat datan käytettävään muotoon.

import csv
import json


# Function to convert a CSV to JSON
# Takes the file paths as arguments
def make_json(csvFilePath, jsonFilePath):

    # create a dictionary
    data = {}

    # Open a csv reader called DictReader
    with open(csvFilePath, encoding='utf-8') as csvf:
        csvReader = csv.DictReader(csvf, delimiter=';')

        # Convert each row into a dictionary
        # and add it to data
        for rows in csvReader:

            # Assuming a column named 'No' to
            # be the primary key
            key = rows['numero']
            data[key] = rows

    # Open a json writer, and use the json.dumps()
    # function to dump data
    with open(jsonFilePath, 'w', encoding='utf-8') as jsonf:
        jsonf.write(json.dumps(data, indent=4))

# Driver Code

# Decide the two file paths according to your
# computer system
csvFilePath = r'museot.csv'
jsonFilePath = r'museot.json'

# Call the make_json function
make_json(csvFilePath, jsonFilePath)