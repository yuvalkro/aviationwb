import Realm  from 'realm';

class AircraftMaker{}

AircraftMaker.schema = {
    name:'AircraftMaker',
    primaryKey: 'id',
    properties: {
        id:    'int',    // primary key
        makerName : {type: 'string'},
        makerCode : {type: 'string'},
    }
}

class AircraftModel{}

AircraftModel.schema = {
    name:'AircraftModel',
    primaryKey: 'id',
    properties: {
        id:    'int',    // primary key
        modelName : {type: 'string'},
        makerCode : {type: 'string'},
    }
}

class Envelope{}

Envelope.schema = {
    name:'Envelope',
    primaryKey: 'id',
    properties: {
        id:    'int',    // primary key
        profileName : {type: 'string'},
        MaxRampWeight: {type: 'string'},
        weightUnit: {type: 'string'},
        armUnit: {type: 'string'},
        xAxisUseMoment : {type: 'string'},
        envelopeLayers : {type:'list', objectType: 'EnvelopeLayer'},
    }
}

class EnvelopeLayer{}

EnvelopeLayer.schema = {
    name:'EnvelopeLayer',
    primaryKey: 'id',
    properties: {
        id:    'int',    // primary key
        layerName : {type: 'string'},

    }
}

class Airplane{}

Airplane.schema = {
    name:'Airplane',
    primaryKey: 'id',
    properties: {
        id:    'int',    // primary key
        maker: {type: 'string'},
        model: {type: 'string'},
        tailNumbers:    {type:'list', objectType: 'TailNumber'},
    }
}

class TailNumber{}

TailNumber.schema = {
    name:'TailNumber',
    primaryKey: 'id',
    properties: {
        id:    'int',    // primary key
        tailNumber: {type: 'string'},
        remark: {type: 'string'},
        emptyWeight: {type: 'string'},
        emptyWeightArm: {type: 'string'},
        emptyWeightMoment: {type: 'string'},
        scProfile: {type: 'string'},
        envelopeProfile: {type: 'string'},
    }
}
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

export default new Realm({schema: [StationsConfiguration, Station, StationType,StationWeightUnit ,AircraftMaker,AircraftModel,Airplane,TailNumber]});
