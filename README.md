# PetBacker-backend

Backend API for a PetBacker-frontend, built using NodeJS, Express, Mongoose, MongoDB Atlas and Heroku for storage.

## Documentation for API?

## Sign Up
- Method : POST
- URL : https://petbacker.herokuapp.com/register
- req body example : {"FirstName" : "harshal", "LastName" : "ghutkule", "Email" : "a@a.com","Password": "secret123"}
- In response you will get a bearer token that you have to use in all requests

## Login
- Method : POST
- URL : https://petbacker.herokuapp.com/login
- req body example : {"email" : "abc@gmail.com", "password": "secret123"}
- In response you will get a bearer token that you have to use in all requests

## Get user data
- Method : GET
- URL : https://petbacker.herokuapp.com/users/${_id}
- In response you will get user details
- Use token as Bearer token

## Update user information
- Method : PATCH
- URL : https://petbacker.herokuapp.com/users/${_id}
- Req Body example : {"FirstName": "abcd", "LastName": "abcd", "Email": "abc@gmail.com"}
- In response it will update user information
- Use token as Bearer token

## Reset user password
- Method : PATCH
- URL : https://petbacker.herokuapp.com/reset/${_id}
- Req Body example : {"Password": "oldPassword", "ConfirmPassword": "newPassword"}
- In response it will reset password
- Use token as Bearer token

## Search By City Name
- Method : GET
- URL : https://petbacker.herokuapp.com/services/city/${city name}
- In response you will get data by city name

## Get Pet Sitter List [Pagination]
- Method : GET
- URL : https://petbacker.herokuapp.com/services?page=${1}&size=5
- In response you will get data according to page number and size of page

## Sort Pet Sitter List
- Method : GET
- URL : https://petbacker.herokuapp.com/services?page=${1}&size=5&sort=${1 or -1}
- In response you will get data according to page number and size of page with sorting in Ase. and Desc order

## Add Pet Detail
- Method : POST
- URL : https://petbacker.herokuapp.com/petdetails
- req body example : {'name':'a','cost':500,'onboard': 2,'typeOfPet': ['dog','cat','bird','reptile'] // select any one,
  'breed': 'bulldog',
  'sizeOfPet': ['1-5kg','5-10kg','10-20kg','20-40kg'] // select any one,
  'date': 29-04-2022,
  'time': 4.30,
  'numberOfNights':2,
  'address':'Mumbai',
  'pickup':'Yes' or 'No',
  'status':'default:false',
  'user_id':It will take that user id whoever login
  }
- Use token as Bearer token
- Pet detail save on backend with userId

## Delete Pet Detail
- Method : DELETE
- URL : https://petbacker.herokuapp.com/petdetails/${id}
- Use token as Bearer token
- In response pet detail remove from user/admin list

## Admin accept Pet Request/change status of Pet Detail
- Method : POST
- URL : https://petbacker.herokuapp.com/petdetails/${id}
- req body example : {'status':'true'}
- Use token as Bearer token
- It will update the status of pet detail

## Add Pet Sitter [Admin]
- Method : POST
- URL : https://petbacker.herokuapp.com/services
- req body example : {'Url':'image url',
  'Name':'pet sitter name',
  'City':'pet sitter city',
  'Address':'pet sitter state',
  'Cost':'charges per day example: 599',
  'Verified':'Yes" or 'No',
  'Rating':'user rating 4,5,3',
  'Summary': 'pet sitter city',
  'NumberOfPets': 'number of pets he/she can sit',
  'AcceptedPetTypes':['dog','cat','bird','reptile'],
  'AcceptedPetSize':['1-5kg','5-10kg','10-20kg','20-40kg'],
  'AdultSupervision':'Pets will never be left unattended',
  'PlaceWhereLeftUnsupervised':'The place your pet will be if they are left unsupervised at home. example: Free roam of the house',
  'PlaceForSleep':'Wherever they want',
  'PottyBreaks':3,
  'WalksPerDay':2,
  'TypeOfHome':'pet sitter home type example: Apartment/Condo',
  'OutdoorArea':'pet sitter outdoor area example: Medium',
  'EmergencyTransport':'Yes' or 'No',
  }
- Use token as Bearer token
- Pet Sitter get added to list on backend

## Delete Pet Sitter [Admin]
- Method : DELETE
- URL : https://petbacker.herokuapp.com/services/${id}
- Use token as Bearer token
- In response pet sitter remove from list

## Update/Edit Pet Sitter [Admin]
- Method : PATCH
- URL : https://petbacker.herokuapp.com/services/${id}
- Req Body example : {'same as add pet sitter body'}
- Use token as Bearer token
- In response pet sitter will update.

## Get Pet Sitter list
- Method : GET
- URL : https://petbacker.herokuapp.com/services
- In response you will get Pet Sitter list
