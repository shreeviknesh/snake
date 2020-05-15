// Defines the NN model for the snake game
// Architecture
//
// Inputs: 
// 1. Manhattan distance to food (with direction)
// 2. Distance to closest wall
// 3. Current X, Y
// 4. Current Direction
//
// Output:
// The direction to go in: either [1,0], [-1,0], [0,1], [0,-1]
