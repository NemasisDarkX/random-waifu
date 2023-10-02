import json


with open('waifu-data.json', 'r') as file:
    data = json.load(file)
name_waifu=input('waifu name:')
const0=input('Link0:')
const1=input('Link1:')
const2=input('Link2:')
const3=input('Link3:')
const4=input('Link4:')
const5=input('Link5:')
const6=input('Link6:')
const7=input('Link7:')
const8=input('Link8:')
const9=input('Link9:')

def add_images(character, image_urls):
    for i in range(len(image_urls)):
        character[f'image{i}'] = image_urls[i]


kyouko_character = next((char for char in data if char['name'] == name_waifu), None)
if kyouko_character:
    image_urls = [
        const0,
        const1,
        const2,
        const3,
        const4,
        const5,
        const6,
        const7,
        const8,
        const9,
    ]
    add_images(kyouko_character, image_urls)


with open('waifu-data.json', 'w') as file:
    json.dump(data, file, indent=4)
