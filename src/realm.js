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


class StationsConfiguration{

}

StationsConfiguration.schema = {
    name:'StationsConfiguration',
    primaryKey: 'id',
    properties: {
        id:    'int',    // primary key
        profileName: {type: 'string'},
        stations:    {type:'list', objectType: 'Station'},
    }
}

class Station{
    
}

Station.schema = {
    name: 'Station',
    properties:{
        stationName : {type: 'string'},
        stationType : {type:'list', objectType: 'StationType'},
        stationWeightUnit : {type:'list', objectType: 'stationWeightUnit'},
        maxWeight   : {type: 'int'},
        stationArm  : {type: 'float'},
    }
}

class StationType{
   
}

StationType.schema = {
    name: 'StationType',
    properties:{
        typeName : {type: 'string'},
    }
}

class stationWeightUnit{
    
 }
 
 stationWeightUnit.schema = {
     name: 'stationWeightUnit',
     properties:{
         weightUnit : {type: 'string'},
     }
 }
 
 

