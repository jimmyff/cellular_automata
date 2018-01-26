// Copyright (c) 2018, jimmyff. All rights reserved. Use of this source code
// is governed by a BSD-style license that can be found in the LICENSE file.

import 'dart:io';

import 'package:cellular_automata/cellular_automata.dart';
import 'package:cellular_automata/rules.dart';

// Simple example of cellular_automata. Outputs ascii.
// For prettier outputs see the platform specific renderers
// Run in terminal with command: pub run example/game_of_life.dart
void main() {

  final width = 64;
  final height = 32;
  const Duration frameDuration = const Duration(milliseconds: 50);

  // create a character palette
  final palette = new Map<GameOfLifeStates, String>.from({
    GameOfLifeStates.DEAD: ' ',
    GameOfLifeStates.DEAD_UNDER_POPULATED: '.',
    GameOfLifeStates.DEAD_OVER_POPULATED: ',',
    GameOfLifeStates.ALIVE: 'O',
    GameOfLifeStates.ALIVE_BORN: 'o',
  });

  // Create the cellular automaton player object & configure the scene
  final player = new Player(
      simulator: new Simulator<GameOfLifeStates>(
        width: width,
        height: height,
        defaultState: GameOfLifeStates.DEAD,
        wrap: true,
        rules: new GameOfLife(),
      ),
      frameDuration: frameDuration,
      palette: palette,
      generator: new MathematicalGenerator<GameOfLifeStates>(
          type: MathematicalGenerators.RANDOM,
          valueTrue: GameOfLifeStates.ALIVE_BORN,
          valueFalse: GameOfLifeStates.DEAD
    )
  );


  // render loop
  player.onRender.listen((CellGrid renderData) {

    // clear the terminal
    print("\x1B[2J\x1B[0;0H");
    
    // print a line to terminal for each row in our grid
    for (int y = 0; y < height; y++) {
      String row = '';
      for (int x = 0; x < width; x++) 
        row = row + renderData.get(x, y).toString();
      print (row);
    }

    print ('');
    print ('Rules: Conway\'s Game of Life');
    print ('Generation: ${player.generationCounter}');
    print ('');
  });

  player.onComplete.listen((SimulationCompleteReason s) {
    player.stop();
    print ('All done! Stable scene detected.');
  });

  // starts the simulation loop
  player.start();

  // keep our command line app running until the player stops
  while (player.isRunning)
    sleep(frameDuration);
 
}
