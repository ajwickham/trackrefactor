//Business or back-end logic:
const carList = ["RedDodgeViper","RevJensMini","Peerless1911Roadster","RedVolkswagenBeetle","YellowCadillac",
"YellowFordFocus","QuarryTruck","HighMountEngine"];
localStorage.transfer3 = carList;
const viewList = ["top","front","back","left","right"];

function Car(carName) {
  this.carName = carName;
}

function Game() {
  this.cars = [];
}

let game = new Game();

Game.prototype.createCarList = function() {
  for (let i = 0; i<carList.length; i++) {
    let carEntry = new Car(carList[i])
    this.cars.push(carEntry);
  }
}
game.createCarList();


//Front end logic
Game.prototype.removeCarClass = function(j,k,div,count) {
  for (let i = j; i<k; i++) {
    $(div+viewList[i]).removeClass(game.cars[count].carName+viewList[i]);
  }
}
Game.prototype.addCarClass = function(j,k,div,count) {
  for (let i = j; i<k; i++) {
    $(div+viewList[i]).addClass(game.cars[count].carName+viewList[i]);
  }  
}

Game.prototype.resetCarChoice = function(carselected) {
  for (let i=0; i<carList.length; i++) {
    if (carselected===game.cars[i].carName) {
    }
  } 
};

$(document).ready(function() {

  //Functions to next through right views of the cars.
  let count1 = -1;
  let count2 = -1;
  
  $("button#next1").click(function() {
    if (count1>-1 && count1<carList.length)  {
      game.removeCarClass(0,5,"div.car1",count1);
    }
    
    count1 += 1;
    
    if (count1<carList.length) {
      game.addCarClass(4,5,"div.car1",count1);
    }
    if (count1===carList.length) {
      count1 = -1
    }    
  });

  $("button#next2").click(function() { 
    if (count2>-1 && count2<carList.length)  {
      game.removeCarClass(0,5,"div.car2",count2);
    }
    
    count2+=1;
    
    if (count2<carList.length) {
      game.addCarClass(4,5,"div.car2",count2);
    }
    if (count2===carList.length) {
      count2 = -1
    }    
  });

//Functions to view and select cars

  $("button#view1").click(function() {
    game.addCarClass(0,4,"div.car1",count1);
  });   
  $("button#clearview1").click(function() {
    game.removeCarClass(0,4,"div.car1",count1);  
  }); 
  
  let car1selected = 0
  let car2selected = 0
  $("button#select1").click(function() {
    car1selected=game.cars[count1].carName;
    if (car1selected===car2selected) {
      alert("I'm sorry, you can't choose the same car as player 2");
      car1selected=0
    }
    else {
      alert(car1selected+" selected");
      localStorage.transfer1 = car1selected;
    }; 
  }); 

  $("button#view2").click(function() {
    game.addCarClass(0,4,"div.car2",count2);
  });   
  $("button#clearview2").click(function() {
    game.removeCarClass(0,4,"div.car2",count2);       
  }); 

  $("button#select2").click(function() {
    car2selected=game.cars[count2].carName;
    if (car1selected===car2selected) {
      alert("I'm sorry, you can't choose the same car as player 1");
      car2selected=0
    }
    else {
      alert(car2selected+" selected");
      localStorage.transfer2 = car2selected;
    }; 
  }); 

  $("button#red1").click(function() {
    alert("Your choice of racecar has been reset");
    game.resetCarChoice(car1selected);  
    car1selected=0
  }); 

  $("button#red2").click(function() {
    alert("Your choice of racecar has been reset");
      game.resetCarChoice(car2selected); 
      car2selected=0
  }); 
});





$(document).ready(function() {


 
//RACETRACK PAGE


/*Turn cards.  The original project was carried out before learning about arrays and loops, which made representing flipping through a stack of cards
tricky. As an approximation of that a random number is created that equals a class. There are 3 of each type of card, 9 types of card plus 5 racecar
cards. So the random number is multiplied by 32 and the integer value taken to create 32 classes (0 is the first random number). Statistically this is
rubbish, after 15 cards the chance of getting the red racecar is one in 16, eventually with only one card left, if the red racecar hasn't been played 
yet the chance is 1 in 1.

After learning about arrays this refactored version includes an array basis for the cards.  A future project could also distribute the icons around the track randomly*/

function Racer(name,space,oldLoc,aOrC) {
  this.space = space;
  this.name = name;
  this.oldLoc = oldLoc;
  this.aOrC = aOrC;
}

let racer1 = new Racer;  //future refactor project to have more than 2 players?
let racer2 = new Racer;

racer1.name = localStorage.getItem("transfer1"); //brings car choices across from selector page
racer2.name = localStorage.getItem("transfer2");

$("#red3").click(function() {  /* This places the car on the start line. */
  alert("car1 is "+racer1.name+" car2 is "+racer2.name);
  $("div.s17Arotate").addClass(racer1.name+"top");
  document.getElementById("s17A").style.zIndex = "15";
  $("div.s17Crotate").addClass(racer2.name+"top");
  document.getElementById("s17C").style.zIndex = "5";
}); 

// This is the stack of cards function
var cardStack = []
const stackBuilder = function(x,y) {
  let i
  let j
  let iconStack=[]
  let racecarStack=[]
    for (let i=0; i<x; i+=1) {
    iconStack.push("RedHelmet","BlueHelmet","YellowHelmet","RedFlag","GreenFlag","YellowFlag","RedTyre","BlueTyre","GreenTyre")
  }
  for (let j=0; j<y; j+=1) {
    racecarStack.push("RedRacecar","BlueRacecar","GreenRacecar","PurpleRacecar","YellowRacecar")
  }
  cardStack= iconStack.concat(racecarStack); 
  return cardStack 
};

stackBuilder(3,1);

var unplayedCards = cardStack
const nextCard = function(array) {
  let x = Math.round((Math.random()*(array.length-1)))
  let y = array[x]
  array.splice(x,1);
  array.push(y)
  return array
};

//This is the main function, what happens when you click the stack
let card = 0
let uncard=0
let t = 0
let previous = 0
let turn = 0
let turnOn
let turnOff  

$("#stack").click(function() {
  t=1-t  //determines whose turn it is
  if (t===1) {
    turnOn=racer1;
    turnOff=racer2;
  }
  else {
    turnOn =racer2;
    turnOff = racer1;
  };
  
  $("div.back-stand-in").removeClass(previous);  //Removes the card that stands in while the card is being flipped back to home position
  previous=uncard

  if (uncard!=0) {
    $("div.back-stand-in").addClass(uncard);  //puts previous card icon on the stand-in card
    $("div.flip-card-back").removeClass(uncard); //removes the prevous card icon
     $("div.flip-card-inner").removeClass("flip-card");//flips the card back to the home position
  }
                     
  unplayedCards = nextCard(unplayedCards)   //Chooses an icon and puts it on the card.
  card = unplayedCards.pop() 
  $("div.flip-card-back").addClass(card);
  uncard=card;

    alert("Are you ready?");/*for some reason it won't do a second flip
                          without this break here. Event bubbling? */
  $("div.flip-card-inner").addClass("flip-card");  //card is flipped
 
  if (unplayedCards.length<=0) { //replaces stack of cards when it is finished
    stackBuilder(3,1)
    unplayedCards=cardStack.slice(0); 
  }  
});

  
/*  GAME FUNCTIONALITY  */

racer1.space = 0;
racer1.oldLoc = "s17A";    //Tells function how to remove cars from start line
racer1.aOrC = "A";
racer2.space = 0;
racer2.oldLoc = "s17C";
racer2.aOrC = "C";
      
Racer.prototype.shoveCar = function() {                 //Shoves the other car to the side
  $("."+this.oldloc+"rotate").removeClass(this.name+"top"); //This removes picture of other car     
  document.getElementById(this.oldLoc).style.zIndex = "-1";  // puts div to the back
  this.oldLoc = this.oldLoc.substring(0,this.oldLoc.length -1)+this.aOrC;  //changes the loction of other car to the correct side  (irrespective of the length of the string)
  document.getElementById(this.oldLoc).style.zIndex = "5"; //brings div to the front  
  $("#"+this.oldLoc).addClass(this.name+"top");  //adds picture of other car at the shoved side
};

Racer.prototype.placeCar = function(locate) {                         //This puts car in the right place
  $("."+this.oldLoc+"rotate").removeClass(this.name+"top");         //Removes from old location
  document.getElementById(this.oldLoc).style.zIndex = "-1";         //puts div to the back
  document.getElementById(locate).style.zIndex = "5";               //brings div to the front
  $("#"+locate).addClass(this.name+"top");                          //adds picture of car 
  this.oldLoc = locate //This sets up the information for the next turn
  space = this.checkCuts(space);
  this.space = space;
};

Racer.prototype.checkCuts = function(space) {         //Shortcuts need two spaces.  The first is checked that it is not >11 from previous                                          
  let cutSpaces = [32,41,61,73,49,19,77,7];           //The second at the end of the cut is needed to check next move is not >11
  for (let i=0; i < 4; i++) {
    if(cutSpaces[i]===space) {
      space = cutSpaces[(i+4)];
      return space
    }
  }
  return space  
};

Racer.prototype.raceCarCheck = function (position) {
  if (position.slice(-3)==="car"){
    return true;
  }
  return false;
};

function checkspace(locate) {    //Big function that moves cars.  Probably should be broken out into sub functions
  if (position != uncard) {
    alert("no that's "+position+" not "+uncard);  // Something about stop or go to end of function
  }
  else {
    if ((space-(turnOn.space))>11) {
      if (turnOn.raceCarCheck(position) === false) {
      alert("Did you miss a "+uncard+" before that?");
      }
      else {
        turnOn.placeCar(locate);
      }
    }
    else {
      if (space===(turnOff.space-1)||space===turnOff.space||space===(turnOff.space+1)) {  
        turnOff.shoveCar();  
        locate = locate.substring(0,locate.length -1)+turnOn.aOrC;//This sets up car to go to its side
      }
      turnOn.placeCar(locate);
    }
  }  
};    

    // Turn starts by clicking pile of cards.  Then click the appropriate icon. This kicks off the big move car function above

    $("#r18").click(function() {  
      position = "RedHelmet";
      space = 1
      if (turn===1) {
        checkspace("r18A");
      }
      if (turn===2) {
        checkspace("r18C");
      }
            
    });

    $("#q18").click(function() {  
      position = "BlueTyre";
      space = 2
      checkspace("q18B"); 
    });

    $("#p18").click(function() {  
      position = "YellowHelmet";
      space = 3
      checkspace("p18B"); 
    });

    $("#o18").click(function() {  
      position = "GreenFlag";
      space = 4
      checkspace("o18B"); 
    });

    $("#m18").click(function() {  
      position = "RedTyre";
      space = 6
      checkspace("m18B"); 
    });

    $("#l18").click(function() {  
      position = "YellowFlag";
      space = 7
      checkspace("l18B"); 
    });

    $("#k18").click(function() {  
      position = "BlueHelmet";
      space = 8
      checkspace("k18B"); 
    });

    $("#j18").click(function() {  
      position = "RedFlag";
      space = 9
      checkspace("j18B"); 
    });

    $("#i19").click(function() {  
      position = "GreenTyre";
      space = 10
      checkspace("i19B"); 
    });

    $("#h19").click(function() {  
      position = "RedHelmet";
      space = 11
      checkspace("h19B"); 
    });

    $("#g19").click(function() {  
      position = "BlueTyre";
      space = 12
      checkspace("g19B"); 
    });

    $("#f19").click(function() {  
      position = "RedRacecar";
      space = 13
      checkspace("f19B"); 
    });

    $("#e19").click(function() {  
      position = "YellowHelmet";
      space = 14
      checkspace("e19B"); 
    });

    $("#d19").click(function() {  
      position = "GreenFlag";
      space = 15
      checkspace("d19B"); 
    });

    $("#c18").click(function() { 
      position = "RedTyre";
      space = 16
      checkspace("c18B"); 
    });

    $("#c17").click(function() {  
      position = "YellowFlag";
      space = 17
      checkspace("c17B"); 
    });

    $("#c16").click(function() {  
      position = "BlueHelmet";
      space = 18
      checkspace("c16B"); 
    });

    $("#c13").click(function() {  
      position = "RedFlag";
      space = 19
      checkspace("c13B"); 
    });

    $("#d12").click(function() {  
      position = "GreenTyre";
      space = 20
      checkspace("d12B"); 
    });

    $("#d11").click(function() {  
      position = "RedHelmet";
      space = 21
      checkspace("d11B"); 
    });

    $("#d10").click(function() {  
      position = "BlueTyre";
      space = 22
      checkspace("d10B"); 
    });

    $("#c9").click(function() {  
      position = "YellowHelmet";
      space = 23
      checkspace("c9B"); 
    });

    $("#c7").click(function() {  
      position = "GreenFlag";
      space = 24
      checkspace("c7B"); 
    });

    $("#c6").click(function() {  
      position = "BlueRacecar";
      space = 25
      checkspace("c6B"); 
    });
    
    $("#c5").click(function() {  
      position = "RedTyre";
      space = 27
      checkspace("c5B"); 
    });

    $("#c3").click(function() {  
      position = "YellowFlag";
      space = 28
      checkspace("c3B"); 
    });

    $("#d3").click(function() {  
      position = "BlueHelmet";
      space = 29
      checkspace("d3B"); 
    });
   
    $("#e2").click(function() {  
      position = "RedFlag";
      space = 30
      checkspace("e2B"); 
    });

    $("#f2").click(function() {  
      position = "GreenTyre";
      space = 31
      checkspace("f2B"); 
    });

    $("#g3").click(function() {  
      position = "RedHelmet";
      space = 32  //this isn't working - it thinks its too far if its on the previous red helmet
      checkspace("j4B"); 
    });

    $("#g4").click(function() {  
      position = "BlueTyre";
      space = 33
      checkspace("g4B"); 
    });
    
    $("#h5").click(function() {  
      position = "YellowHelmet";
      space = 34
      checkspace("h5B"); 
    });

    $("#h6").click(function() {  
      position = "GreenFlag";
      space = 35
      checkspace("h6B"); 
    });

    $("#g8").click(function() {  
      position = "RedTyre";
      space = 36
      checkspace("g8B"); 
    });

    $("#g9").click(function() {  
      position = "YellowFlag";
      space = 37
      checkspace("g9B"); 
    });

    $("#f10").click(function() {  
      position = "GreenRacecar";
      space = 38
      checkspace("f10B"); 
    });

    $("#f11").click(function() {  
      position = "BlueHelmet";
      space = 39
      checkspace("f11B"); 
    });
    
    $("#g12").click(function() {  
      position = "RedFlag";
      space = 40
      checkspace("g12B"); 
    });

    $("#g14").click(function() {  
      position = "GreenTyre";
      space = 41
      checkspace("c14B"); 
    });

    $("#h14").click(function() {  
      position = "RedHelmet";
      space = 42
      checkspace("h14B"); 
    });
    
    $("#i13").click(function() {  
      position = "BlueTyre";
      space = 43
      checkspace("i13B"); 
    });

    $("#j12").click(function() {  
      position = "YellowHelmet";
      space = 44
      checkspace("j12B"); 
    });

    $("#j10").click(function() {  
      position = "GreenFlag";
      space = 45
      checkspace("j10B"); 
    });

    $("#j9").click(function() {  
      position = "RedTyre";
      space = 46
      checkspace("j9B"); 
    });

    $("#j8").click(function() {  
      position = "YellowFlag";
      space = 47
      checkspace("j8B"); 
    });

    $("#j6").click(function() {  
      position = "BlueHelmet";
      space = 48
      checkspace("j6B"); 
    });

    $("#j5").click(function() {  
      position = "RedFlag";
      space = 49
      checkspace("j5B"); 
    });

    $("#k3").click(function() {  
      position = "GreenTyre";
      space = 50
      checkspace("k3B"); 
    });

    $("#l2").click(function() {  
      position = "RedHelmet";
      space = 51
      checkspace("l2B"); 
    });

    $("#m2").click(function() {  
      position = "PurpleRacecar";
      space = 52
      checkspace("m2B"); 
    });

    $("#n2").click(function() {  
      position = "BlueTyre";
      space = 53
      checkspace("n2B"); 
    });

    $("#o2").click(function() {  
      position = "YellowHelmet";
      space = 54
      checkspace("o2B"); 
    });

    $("#p2").click(function() {  
      position = "GreenFlag";
      space = 55
      checkspace("p2B"); 
    });

    $("#q2").click(function() {  
      position = "RedTyre";
      space = 56
      checkspace("q2B"); 
    });
    
    $("#q3").click(function() {  
      position = "YellowFlag";
      space = 57
      checkspace("q3B"); 
    });
    
    $("#r3").click(function() {  
      position = "BlueHelmet";
      space = 58
      checkspace("r3B"); 
    });

    $("#s4").click(function() {  
      position = "RedFlag";
      space = 59
      checkspace("s4B"); 
    });
    
    $("#s5").click(function() {  
      position = "GreenTyre";
      space = 60
      checkspace("s5B"); 
    });
     
    $("#r6").click(function() {  
      position = "RedHelmet";
      space = 61
      checkspace("r11B"); 
    });

    $("#q7").click(function() {  
      position = "YellowRacecar";
      space = 62
      checkspace("q7B"); 
    });

    $("#q8").click(function() {  
      position = "BlueTyre";
      space = 62
      checkspace("q8B"); 
    });


    $("#p8").click(function() {  
      position = "YellowHelmet";
      space = 63
      checkspace("p8B"); 
    });

    $("#o8").click(function() {  
      position = "GreenFlag";
      space = 64
      checkspace("o8B"); 
    });

    $("#n8").click(function() {  
      position = "RedTyre";
      space = 65
      checkspace("n8B"); 
    });

    $("#m8").click(function() {  
      position = "YellowFlag";
      space = 66
      checkspace("m8B"); 
    });

    $("#l9").click(function() {  
      position = "BlueHelmet";
      space = 68
      checkspace("l9B"); 
    });

    $("#l10").click(function() {  
      position = "RedFlag";
      space = 69
      checkspace("l10B"); 
    });

    $("#l11").click(function() {  
      position = "GreenTyre";
      space = 70
      checkspace("l11B"); 
    });

    $("#l12").click(function() {  
      position = "RedHelmet";
      space = 71
      checkspace("l12B"); 
    });

    $("#m12").click(function() {  
      position = "BlueTyre";
      space = 72
      checkspace("m12B"); 
    });

    $("#n12").click(function() {  
      position = "YellowHelmet";
      space = 73
      checkspace("n18B"); 
    });

    $("#o11").click(function() {  
      position = "GreenFlag";
      space = 74
      checkspace("o11B"); 
    });

    $("#p11").click(function() {  
      position = "RedTyre";
      space = 75
      checkspace("p11B"); 
    });

    $("#q11").click(function() {  
      position = "YellowFlag";
      space = 76
      checkspace("q11B"); 
    });

    $("#s12").click(function() {  
      position = "BlueHelmet";
      space = 77
      checkspace("s12B"); 
    });

    $("#s13").click(function() {  
      position = "RedFlag";
      space = 78
      checkspace("s13B"); 
    });

    $("#s14").click(function() {  
      position = "GreenTyre";
      space = 79
      checkspace("s14B"); 
    });
    
});//end of document 



/* This functionality was originally built to toggle through viewing the cars on Car Selector
   page.  
   But this was hard to synchronise with later functions built using add and remove classes
   so was replaced. Kept it here to demonstrate capacity to use toggle, and in case I needed
  it somewhere else

    

  $("button#next1").click(function() {
    $(count1+=1);
      if (count1===1) {
        $(".Red_Dodge_Viper1-showing").toggle();
        car1 = "RedDodgeViper"
      }
      else if (count1===2) {
        $(".Red_Dodge_Viper1-showing").toggle();
        $(".Red_Dodge_Viper1-hidden").toggle();
        $(".Bigwheelcorvette1-showing").toggle();
        car1 = "Bigwheelcorvette"
      }
      else if (count1===3){
        $(".Bigwheelcorvette1-showing").toggle();  
        $(".Bigwheelcorvette1-hidden").toggle();
        $(".Red_helmet1-showing").toggle();
      }
      else if (count1===4){
        $(".Red_helmet1-showing").toggle();  
        $(".Red_helmet1-hidden").toggle();
        $(".Purple_racecar1-showing").toggle();
      }
      else if (count1===5){
        $(".Purple_racecar1-showing").toggle();  
        $(".Purple_racecar1-hidden").toggle();
        count1=0;
      }
  });

  $("button#next2").click(function() {
    $(count2+=1);
      if (count2===1) {
        $(".Red_Dodge_Viper2-showing").toggle();
        car2 = "RedDodgeViper"
      }
      else if (count2===2) {
        $(".Red_Dodge_Viper2-showing").toggle();
        $(".Red_Dodge_Viper2-hidden").toggle();
        $(".Bigwheelcorvette2-showing").toggle();
        car2 = "Bigwheelcorvette"
      }
      else if (count2===3){
        $(".Bigwheelcorvette2-showing").toggle();  
        $(".Bigwheelcorvette2-hidden").toggle();
        $(".Red_helmet2-showing").toggle();
      }
      else if (count2===4){
        $(".Red_helmet2-showing").toggle();  
        $(".Red_helmet2-hidden").toggle();
        $(".Purple_racecar2-showing").toggle();
      }
      else if (count2===5){
        $(".Purple_racecar2-showing").toggle();  
        $(".Purple_racecar2-hidden").toggle();
        count2=0;
      }
  });*/