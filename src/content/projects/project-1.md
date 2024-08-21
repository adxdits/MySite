---
title: Tower Defense Game using OpenGL

description: This web application is a visually captivating tower defense game built using OpenGL, designed to deliver an engaging and strategic gaming experience.
publishDate: 'April 28 2024'
seo:
  image:
    src: '/game.png'
---

![Project preview](https://github.com/adxdits/OpenGl-game/blob/main/screenshots/towers.png?raw=true)
<a href="https://github.com/adxdits/OpenGl-game/" target="_blank" style="display: inline-block; padding: 10px 20px; font-size: 16px; color: #fff; background-color: #007bff; text-align: center; text-decoration: none; border-radius: 5px;">Check it on Github</a>

---

**Project Overview:**
**Defender’s Realm** is a visually captivating tower defense game built using OpenGL, designed to deliver an engaging and strategic gaming experience. This web application challenges users to protect their realm from waves of enemies by strategically placing towers and utilizing a range of defensive strategies within a richly detailed virtual environment.

## Objectives

1. Develop a tower defense game that leverages OpenGL to deliver stunning graphics and smooth gameplay.
2. Create a diverse range of towers, enemies, and levels to provide players with a strategic and engaging challenge.
3. Ensure the game mechanics and visuals combine to create a compelling experience that keeps players invested in defending their realm.

## Features

1. **Stunning 3D Graphics:**

- **Defender’s Realm** utilizes OpenGL to render high-quality 3D environments, allowing for immersive and visually impressive gameplay.
- The game features intricate level designs and detailed tower and enemy models to enhance the strategic depth and visual appeal.

2. **Diverse Tower Types and Upgrades:**

- Players can choose from a variety of towers, each with unique abilities and attributes.
- Towers can be upgraded with different enhancements, allowing for strategic customization and adaptation to various enemy types.

3. **Challenging Enemy Waves:**

- The game includes a broad array of enemy types, each with distinct behaviors and strengths.
- Players face increasingly difficult waves of enemies, requiring careful planning and adaptation to defend their realm effectively.

4. **Interactive Level Design:**

- Levels are designed with multiple paths and strategic points for tower placement, offering numerous tactical possibilities.
- Environmental elements and obstacles are integrated into the levels, adding layers of complexity to the defensive strategy.

5. **Progression and Achievements:**

- Players can track their progress through various levels and achievements, with performance metrics and rewards for successful defense.
- The game features a progression system that unlocks new towers, upgrades, and levels as players advance.

## Technology Stack

- **Graphics Engine:** OpenGL for rendering 3D graphics and managing game visuals.
- **Game Development Framework:** C++ with a focus on performance and real-time processing.
- **Backend:** Node.js for handling game data synchronization and player interactions.
- **Database:** MongoDB for storing player profiles, game progress, and leaderboard information.

## Gameplay Instructions

1. **Starting the Game:**

   - Once in the menu, the player must press "E" to start the game.
   - Players can begin placing towers on the map by entering "construction" mode by pressing "T". Towers can only be placed on empty spaces outside the path. Each tower costs 5 coins to build.

2. **Enemy Waves:**

   - Enemies will appear at regular intervals and follow a predefined path.
   - If enemies reach the base at the end of the path, they will start attacking it, causing it to lose health points. The game ends if the base’s health points reach 0.

3. **Game Controls:**
   - The player can pause the game at any time by pressing "P".
   - To quit the game, press "Q".

## Code Structure

The code is divided into multiple classes, each representing a part of the application. The core of the application is handled by the `Map` class, which contains a significant portion of the logic, such as the list of towers, enemies, and map loading and rendering.

```cpp
class Map {

    public:

        static const int SCALE = 60; // Each square is 60 px side

        int width;
        int height;

        int coins = 100;
        int lives = 100;

        int xCursor;
        int yCursor;

        double elapsedTime = 0.0;

        double enemyTimer;

        bool towerMode = false;

        glm::vec3 inColor;
        glm::vec3 outColor;
        glm::vec3 pathColor;

        // Matrix of squares using vector of vectors
        std::vector<std::vector<Square>> squares;
        std::vector<Tower> towers;
        std::vector<Enemy> enemies;
        Graph graph;

        /*
         * Texture
         */
        GLuint grassTexture {};
        GLuint pathTexture {};
        GLuint inTexture {};
        GLuint outTexture {};
        GLuint hammerTexture {};

        bool validateItd(std::string itdPath);
        void loadMapFromFile(std::string pngPath, std::string itdPath);
        void loadGraphFromFile(std::string itdPath);
        void loadTextures();

        void setup(std::string pngPath, std::string itdPath);

        void switchTowerMode();
        void placeTower();

        void createEnemy();
        void updateEnemies();

        void render();
        void updateHoverSquare();
        void update();

};
```
