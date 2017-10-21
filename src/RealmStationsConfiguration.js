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
import Realm  from 'realm';

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
        stationType : {type:'StationType'},
        stationWeightUnit : {type:'StationWeightUnit'},
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

class StationWeightUnit{}

 StationWeightUnit.schema = {
     name: 'StationWeightUnit',
     primaryKey: 'id',
     properties:{
         id:    'int',    // primary key
         weightUnit : {type: 'string'},
     }
 }

export default new Realm({schema: [StationsConfiguration, Station, StationType,StationWeightUnit ]});
