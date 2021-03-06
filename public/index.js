function Price (barId,people,time)
{
  for(var i =0;i<bars.length;i++){
    if (bars[i].id == barId){
      var timeComponent = Number(bars[i].pricePerHour) * Number(time);
      var peopleComponent = Number(bars[i].pricePerPerson) * Number (people);
      var bookingPrice = timeComponent + peopleComponent;
}
}
return bookingPrice;
}


function amountBooker (barId)
{
  for(var i=0;i<events.length;i++)
  {
    if(events[i].id == barId)
    var Booker = events[i].price;
  }
  return Booker;
}
function amountBar(barId)
{
  for(var i=0;i<events.length;i++)
  {
    if(events[i].id==barId)
    var Bar = Number(events[i].price) - (Number(events[i].price) * 0.3);
  }
  return Bar;
}
function amountInsurance(barId)
{
 for(var i=0;i<events.length;i++)
  {
    if(events[i].id==barId)
    var Insurance = events[i].commission.insurance;
  } 
  return Insurance;
}
function amountTreasury(barId){
  for(var i=0;i<events.length;i++)
  {
    if(events[i].id==barId)
    var Treasury = events[i].commission.treasury;
  } 
  return Treasury;
}
function amountPrivateaser(barId){
  for(var i=0;i<events.length;i++)
  {
    if(events[i].id==barId)
    
   {
    if(events[i].options.deductibleReduction == true)
    {
      var Privateaser = events[i].commission.privateaser + events[i].persons;
    }
    else
    {
      var Privateaser = events[i].commission.privateaser;
    }
  }
  } 
  return Privateaser;
}

function priceForEachBooker(){
  for(var i=0;i<events.length;i++)
  {
      var barId = events[i].barId;
      var people = events[i].persons;
      var time = events[i].time;
      if(people>=60){
        var finalPrice = Price(barId,people,time) * 0.5;
      }
      else if(people < 60 && people >=20){
         var finalPrice = Price(barId,people,time) * 0.7;
      }
      else if(people >= 10 && people <20){
         var finalPrice = Price(barId,people,time) * 0.9;
      }
      else
      {
        var finalPrice = Price(barId,people,time);
      }
      events[i].price = finalPrice; 
}
return finalPrice;
}


function computeCommission(){
  
  for (var i=0;i<events.length;i++)
  {
      var test = events[i].price;
      var commission = events[i].price * 0.3;
      events[i].commission.insurance = commission / 2 ;
      events[i].commission.treasury  = events[i].persons;
      events[i].commission.privateaser = Math.abs(events[i].commission.treasury - events[i].commission.insurance);     
  }
}

function isDeductible()
{
  for (var i=0 ;i<events.length;i++)
  {
    if(events[i].options.deductibleReduction == true){

      var priceFinal = Number(events[i].price) + Number(events[i].persons);
      events[i].price = priceFinal
    }
  }
}


function payTheActors(){
  for(var i=0;i<actors.length;i++)
  { 
    var eventIdActors = actors[i].eventId;
    for(var j=0;j<actors[i].payment.length;j++){
        if(actors[i].payment[j].who == 'booker')

          {
            actors[i].payment[j].amount = amountBooker(eventIdActors);
          }
        else if (actors[i].payment[j].who == 'bar')
        {
          actors[i].payment[j].amount = amountBar(eventIdActors);
        }
        else if (actors[i].payment[j].who == 'insurance')
        {
          actors[i].payment[j].amount = amountInsurance(eventIdActors);
        }
        else if (actors[i].payment[j].who == 'treasury')
        {
          actors[i].payment[j].amount = amountTreasury(eventIdActors);
        }
        else if (actors[i].payment[j].who == 'privateaser')
        {
          actors[i].payment[j].amount = amountPrivateaser(eventIdActors);
        }

    }
  }
  
}


'use strict';
//list of bats
//useful for ALL 5 steps
//could be an array of objects that you fetched from api or database
const bars = [{
  'id': 'f944a3ff-591b-4d5b-9b67-c7e08cba9791',
  'name': 'freemousse-bar',
  'pricePerHour': 50,
  'pricePerPerson': 14
}, {
  'id': '165d65ec-5e3f-488e-b371-d56ee100aa58',
  'name': 'solera',
  'pricePerHour': 100,
  'pricePerPerson': 40
}, {
  'id': '6e06c9c0-4ab0-4d66-8325-c5fa60187cf8',
  'name': 'la-poudriere',
  'pricePerHour': 250,
  'pricePerPerson': 80
}];

//list of current booking events
//useful for ALL steps
//the time is hour
//The `price` is updated from step 1 and 2
//The `commission` is updated from step 3
//The `options` is useful from step 4
const events = [{
  'id': 'bba9500c-fd9e-453f-abf1-4cd8f52af377',
  'booker': 'esilv-bde',
  'barId': 'f944a3ff-591b-4d5b-9b67-c7e08cba9791',
  'time': 4,
  'persons': 8,
  'options': {
    'deductibleReduction': false
  },
  'price': 0,
  'commission': {
    'insurance': 0,
    'treasury': 0,
    'privateaser': 0
  }
}, {
  'id': '65203b0a-a864-4dea-81e2-e389515752a8',
  'booker': 'societe-generale',
  'barId': '165d65ec-5e3f-488e-b371-d56ee100aa58',
  'time': 8,
  'persons': 30,
  'options': {
    'deductibleReduction': true
  },
  'price': 0,
  'commission': {
    'insurance': 0,
    'treasury': 0,
    'privateaser': 0
  }
}, {
  'id': '94dab739-bd93-44c0-9be1-52dd07baa9f6',
  'booker': 'otacos',
  'barId': '6e06c9c0-4ab0-4d66-8325-c5fa60187cf8',
  'time': 5,
  'persons': 80,
  'options': {
    'deductibleReduction': true
  },
  'price': 0,
  'commission': {
    'insurance': 0,
    'treasury': 0,
    'privateaser': 0
  }
}];

//list of actors for payment
//useful from step 5
const actors = [{
  'eventId': 'bba9500c-fd9e-453f-abf1-4cd8f52af377',
  'payment': [{
    'who': 'booker',
    'type': 'debit',
    'amount': 0
  }, {
    'who': 'bar',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'insurance',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'treasury',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'privateaser',
    'type': 'credit',
    'amount': 0
  }]
}, {
  'eventId': '65203b0a-a864-4dea-81e2-e389515752a8',
  'payment': [{
    'who': 'booker',
    'type': 'debit',
    'amount': 0
  }, {
    'who': 'bar',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'insurance',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'treasury',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'privateaser',
    'type': 'credit',
    'amount': 0
  }]
}, {
  'eventId': '94dab739-bd93-44c0-9be1-52dd07baa9f6',
  'payment': [{
    'who': 'booker',
    'type': 'debit',
    'amount': 0
  }, {
    'who': 'bar',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'insurance',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'treasury',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'privateaser',
    'type': 'credit',
    'amount': 0
  }]
}];
priceForEachBooker();
computeCommission();
isDeductible();
payTheActors();
console.log(bars);
console.log(events);
console.log(actors);


