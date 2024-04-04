## Description

App for creating and listing parcels.
The app opens at localhost:4200 with the list of parcels in the database.
There is a search for both country and description, and it will sort the results with parcels with country set to Estonia first, and date ascending.
There are buttons for both the list and the form to add a new parcel at the top.
The form requires all fields to be filled, and for the SKU field to be unique. 

## Running the app

Connecting to the database requires starting a MySQL server on your laptop with the following details:
```bash
host: 'localhost'
port: 3306
username: 'root'
password: 'mysqltest'
database: 'test'
```

To run backend, cd into backend package and
```bash
$ npm install
```
```bash
$ npm run start:dev
```

To run frontend, cd into app-ui package and
```bash
ng build
```
```bash
ng serve
```

## Comments
The service works, but certain things can definitely be improved upon in future iterations. 
One idea is to dockerize the app, which would ease setup quite a bit. 
Adding integration and unit tests for the controller and service would help with quality assurance. 
The logging currently is minimal, and backend controllers have basic error handling, improving upon both would also help with traceability.
Currently the backend generates unique IDs for the parcels which can be seen in the database. 
As they are uuids, they are not easily guessable, but human-readable and typeable may be questionable, as they are long. 
In the next iteration I would use a custom solution for unique IDs for each parcel separate from the id in the database.
I am not much of a designer, so the design of the pages is very basic as well.
