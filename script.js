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

// Enemies
const enemies = [
    { x: 5, y: 5, width: tileSize, height: tileSize, color: 'red' },
    { x: 7, y: 2, width: tileSize, height: tileSize, color: 'green' }
];

// Weapon properties
const weapon = {
    x: -1,
    y: -1,
    width: tileSize / 2,
    height: tileSize / 2,
    color: 'yellow',
    isActive: false
};

// Draw the player, enemies, and weapon
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw player
    ctx.fillStyle = player.color;
    ctx.fillRect(player.x * tileSize, player.y * tileSize, player.width, player.height);

    // Draw enemies
    enemies.forEach(enemy => {
        ctx.fillStyle = enemy.color;
        ctx.fillRect(enemy.x * tileSize, enemy.y * tileSize, enemy.width, enemy.height);
    });

    // Draw weapon
    if (weapon.isActive) {
        ctx.fillStyle = weapon.color;
        ctx.fillRect(weapon.x * tileSize, weapon.y * tileSize, weapon.width, weapon.height);
    }
}

// Move the player
function movePlayer(dx, dy) {
    player.x += dx;
    player.y += dy;
    player.x = Math.max(0, Math.min(gridWidth - 1, player.x));
    player.y = Math.max(0, Math.min(gridHeight - 1, player.y));
    draw();
}

// Move enemies
function moveEnemies() {
    enemies.forEach(enemy => {
        // Basic enemy movement logic (move randomly)
        const direction = Math.floor(Math.random() * 4);
        switch (direction) {
            case 0: enemy.x = Math.max(0, enemy.x - 1); break; // Left
            case 1: enemy.x = Math.min(gridWidth - 1, enemy.x + 1); break; // Right
            case 2: enemy.y = Math.max(0, enemy.y - 1); break; // Up
            case 3: enemy.y = Math.min(gridHeight - 1, enemy.y + 1); break; // Down
        }
    });
}

// Check for collision
function checkCollision(obj1, obj2) {
    return !(obj1.x + obj1.width <= obj2.x ||
             obj1.x >= obj2.x + obj2.width ||
             obj1.y + obj1.height <= obj2.y ||
             obj1.y >= obj2.y + obj2.height);
}

// Attack with weapon
function attack() {
    weapon.x = player.x;
    weapon.y = player.y;
    weapon.isActive = true;

    // Check for collisions with enemies
    enemies.forEach((enemy, index) => {
        if (checkCollision(weapon, enemy)) {
            // Remove enemy if hit
            enemies.splice(index, 1);
        }
    });

    // Deactivate weapon after a short delay
    setTimeout(() => {
        weapon.isActive = false;
        draw();
    }, 100);
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
        case ' ':
            attack(); // Spacebar to attack
            break;
    }
    moveEnemies(); // Move enemies on each key press
    draw(); // Redraw the game state
});

// Initialize the game
draw();
