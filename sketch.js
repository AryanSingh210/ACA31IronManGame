var bg, bgImage, player, playerImg, stoneImg, diamondImg, spikesImg;
var diamondGroup, stoneGroup, spikeGroup;
var score = 0;

function preload() {
    bgImage = loadImage('./images/bg.jpg');
    playerImg = loadImage('./images/iron.png');
    stoneImg = loadImage('./images/stone.png');
    diamondImg = loadImage('./images/diamond.png');
    spikesImg = loadImage('./images/spikes.png');
}

function setup() {
    createCanvas(1000, 600);
    bg = createSprite(580, 300)
    bg.addImage(bgImage)
        // bg.scale = 2
        // bg.velocityY = 6;
    player = createSprite(70, 500, 20, 50);
    player.addImage(playerImg);
    player.scale = 0.3;
    diamondGroup = new Group();
    spikeGroup = new Group();
    stoneGroup = new Group();
}

function draw() {

    if (player.x < 20) {
        player.x = 20
    }
    if (player.y < 50) {
        player.y = 50
    }
    if (player.y > 500) {
        player.y = 500
    }
    if (player.x > 900) {
        player.x = 900;
    }


    if (keyDown('up')) {
        player.y = player.y - 10;
    }
    if (keyDown('down')) {
        player.y = player.y + 10;
    }
    if (keyDown('left')) {
        player.x = player.x - 10;
    }
    if (keyDown('right')) {
        player.x = player.x + 10;
    }


    generateDiamonds();
    for (var i = 0; i < (diamondGroup).length; i++) {
        var temp = (diamondGroup).get(i)
        if (temp.isTouching(player)) {
            score += 1;
            temp.destroy();
            temp = null
        }
    }

    generateStones();
    for (var j = 0; j < (stoneGroup).length; j++) {
        var temp1 = (stoneGroup).get(j)
        if (temp1.isTouching(player)) {
            player.collide(temp1)
        }
    }

    generateSpikes();
    for (var k = 0; k < (spikeGroup).length; k++) {
        var temp2 = (spikeGroup).get(k)
        if (temp2.isTouching(player)) {
            player.x = 70;
            player.y = 500;
        }
    }


    drawSprites();

    textSize(24);
    fill('white')
    text('Score: ' + score, 800, 50)

}

function generateDiamonds() {
    if (frameCount % 50 === 0) {
        var diamond = createSprite(500, 50, 20, 20);
        diamond.addImage(diamondImg)
        diamond.x = Math.round(random(50, 800))
        diamond.velocityY = 4;
        diamond.scale = 0.6;
        diamond.lifetime = 1200;
        diamondGroup.add(diamond);
        // console.log(diamond)
    }
}

function generateStones() {
    if (frameCount % 100 === 0) {
        var stone = createSprite(50, 100, 20, 20);
        stone.addImage(stoneImg);
        stone.x = Math.round(random(100, 400));
        stone.velocityY = 5;
        stone.scale = 0.5;
        stone.lifetime = 300;
        stoneGroup.add(stone)
            // console.log(stone)
    }
}

function generateSpikes() {
    if (frameCount % 100 === 0) {
        var spikes = createSprite(500, 50, 20, 20);
        spikes.addImage(spikesImg);
        spikes.x = Math.round(random(50, 800));
        spikes.velocityY = 5;
        spikes.lifetime = 300;
        spikeGroup.add(spikes)
            // spikes.scale = 0.6;
            // console.log(stone)
    }
}