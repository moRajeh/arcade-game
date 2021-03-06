// Enemies our player must avoid
var Enemy = function(x, y) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.x = x;
    this.y = y;
    this.height = 65;
    this.width = 95;
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.

    if (this.x > 490) {
        this.x = -100 * Math.round(Math.random() * 5) + 1;
    } else {
        this.x += 100 * dt;
    }


    //To calculate the collision, I've got the idea from here   https://developer.mozilla.org/en-US/docs/Games/Techniques/2D_collision_detection 
    let a = this.x - player.x;
    if (this.y == player.y && Math.sqrt(a * a) < this.width / 2 + player.width / 2) {
        player.x = 202;
        player.y = 400;
    }

};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function(x, y) {
    this.x = x;
    this.y = y;
    this.height = 75;
    this.width = 65;
    this.sprite = 'images/char-boy.png';
}
Player.prototype.update = function() {
    document.querySelector('.winningDialog').open = false;
    if (this.y == -15) {
        document.querySelector('.winningDialog').showModal();
        document.querySelector('.restart').addEventListener('click', restartGame);
    }
}

function restartGame() {
    document.querySelector('.winningDialog').open = false;
    player.x = 202;
    player.y = 400;
}

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}
Player.prototype.handleInput = function(input) {
    if (input == 'right') {
        if (this.x < 402) {
            this.x += 100;
        }
    } else if (input == 'left') {
        if (this.x > 2) {
            this.x -= 100;
        }
    } else if (input == 'up') {
        if (this.y > -15) {
            this.y -= 83;
        }
    } else if (input == 'down') {
        if (this.y < 400) {
            this.y += 83;
        }
    }
}

const enemiesYpostions = [68, 151, 234];
// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player


const player = new Player(202, 400);
const allEnemies = enemiesYpostions.map((y, index) => {
    return new Enemy(-100 * (index + 1), y);
});




// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
})