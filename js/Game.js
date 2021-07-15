class Game {
  constructor(){}
  
  getState(){
    var gameStateRef  = database.ref('gameState');
    gameStateRef.on("value",function(data){
       gameState = data.val();
    })
   
  }

  update(state){
    database.ref('/').update({
      gameState: state
    });
  }

  async start(){
    if(gameState === 0){
      player = new Player();
      var playerCountRef = await database.ref('playerCount').once("value");
      if(playerCountRef.exists()){
        playerCount = playerCountRef.val();
        player.getCount();
      }
      form = new Form()
      form.display();
    }
    background(bgImg)
    car1 = createSprite(100,200);
    car1.addImage(car1Img);
    car2 = createSprite(300,200);
    car2.addImage(car2Img);
    car3 = createSprite(500,200);
    car3.addImage(car3Img);
    car4 = createSprite(700,200);
    car4.addImage(car4Img);
    cars = [car1, car2, car3, car4];
  }
  play(){
    form.hide()
    textSize(30)
    text("Game Start",120,100)
    Player.getPlayerInfo()
    background("#666666")
    image(trackImg,0,-height*4,width,height*5)
    player.getCarsAtEnd()
    if(allPlayers != undefined){
      var yPosition = 130;
      var x = 200;
      var y;
      var index = 0;
      for(var i in allPlayers){
        index = index+1
        x = x+220;
        y = height-allPlayers[i].distance;
        cars[index-1].x = x;
        cars[index-1].y = y;
        if(index === player.index){
          cars[index-1].shapeColor = "red";
          camera.position.x = width/2;
          camera.position.y = y;
          fill('red');
          ellipse(x,y,60,60)
        }
      }
    }
    if(keyIsDown(UP_ARROW) && player.index != null){
      player.distance+=10;
      player.update()
    }
    if(player.distance>3300){
      gameState = 2;
      player.rank+=1;
      Player.updateCarsAtEnd(player.rank)
    }
    drawSprites()
  }
  end(){
    console.log("Game Over!")
    console.log(player.rank)
  }
}
