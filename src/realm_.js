// var stationConfiguration = {
//     name: 'Main Profile ',
//     stations: [
//         {
//         stationName : 'Pilot',
//         stationType : 'Seat',
//         stationWeightUnit : 'Kilogram',
//         maxWeight   : '100',
//         stationArm  :'43'
//       },
//       {
//       stationName : 'Co-Pilot',
//       stationType : 'Seat',
//       stationWeightUnit : 'Kilogram',
//       maxWeight   : '120',
//       stationArm  :'65'
//     }
//   ]
// };


class StationsConfiguration{}

StationsConfiguration.schema = {
    name:'StationsConfiguration',
    primaryKey: 'id',
    properties: {
        id:    'int',    // primary key
        profileName: {type: 'string'},
        stations:    {type:'list', objectType: 'Station'},
    }
}

class Station{}

Station.schema = {
    name: 'Station',
    primaryKey: 'id',
    properties:{
        id:    'int',    // primary key
        stationName : {type: 'string'},
        stationType : {type:'list', objectType: 'StationType'},
        stationWeightUnit : {type:'list', objectType: 'stationWeightUnit'},
        maxWeight   : {type: 'int'},
        stationArm  : {type: 'float'},
    }
}

class StationType{}

StationType.schema = {
    name: 'StationType',
    primaryKey: 'id',
    properties:{
        id:    'int',    // primary key
        typeName : {type: 'string'},
    }
}

class stationWeightUnit{}

 stationWeightUnit.schema = {
     name: 'stationWeightUnit',
     primaryKey: 'id',
     properties:{
         id:    'int',    // primary key
         weightUnit : {type: 'string'},
     }
 }

const Realm = require('realm');


  //creating stations types
Realm.open({schema: [StationType]})
  .then(
       try {
        realm.write(() => {
          realm.create('StationType', {id: 1 , typeName: 'Crew'});
          realm.create('StationType', {id: 2 , typeName: 'Passengers'});
          realm.create('StationType', {id: 3 , typeName: 'Baggage'});
          realm.create('StationType', {id: 4 , typeName: 'Moving'});
          realm.create('StationType', {id: 5 , typeName: 'Fuel'});
          realm.create('StationType', {id: 6 , typeName: 'Fluids'});
          realm.create('StationType', {id: 7 , typeName: 'Other'});
        });
      } catch (e) {
        console.log("Error on creation stations types");
      }
   );
