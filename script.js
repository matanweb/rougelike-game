const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Game variables
const tileSize = 40;
const gridWidth = canvas.width / tileSize;
const gridHeight = canvas.height / tileSize;

// Player properties
const player = {
    x: 1,
    y: 1,
    width: tileSize,
    height: tileSize,
    color: 'blue'
};

// Enemy properties
const enemy = {
    x: 5,
    y: 5,
    width: tileSize,
    height: tileSize,
    color: 'red'
};

// Draw the player and enemy
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw player
    ctx.fillStyle = player.color;
    ctx.fillRect(player.x * tileSize, player.y * tileSize, player.width, player.height);

    // Draw enemy
    ctx.fillStyle = enemy.color;
    ctx.fillRect(enemy.x * tileSize, enemy.y * tileSize, enemy.width, enemy.height);
}

// Move the player
function movePlayer(dx, dy) {
    player.x += dx;
    player.y += dy;
    player.x = Math.max(0, Math.min(gridWidth - 1, player.x));
    player.y = Math.max(0, Math.min(gridHeight - 1, player.y));
    draw();
}

// Keydown event handler
document.addEventListener('keydown', (event) => {
    switch (event.key) {
        case 'ArrowUp':
            movePlayer(0, -1);
            break;
        case 'ArrowDown':
            movePlayer(0, 1);
            break;
        case 'ArrowLeft':
            movePlayer(-1, 0);
            break;
        case 'ArrowRight':
            movePlayer(1, 0);
            break;
    }
});

// Initialize the game
draw();
