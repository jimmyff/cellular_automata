// Copyright (c) 2017, jimmyff. All rights reserved. Use of this source code
// is governed by a BSD-style license that can be found in the LICENSE file.

import 'dart:html';
import 'package:cellular_automata/cellular_automata.dart';
import 'package:cellular_automata/renderer_stagexl.dart';
import 'package:cellular_automata/rules.dart';

import 'package:stagexl/src/ui/color.dart';

// Simple example of using cellular_automata
void main() {
  // configure the palette
  final palette = new Map<GameOfLifeStates, int>.from({
    GameOfLifeStates.DEAD: Color.Black,
    GameOfLifeStates.DEAD_UNDER_POPULATED: Color.DarkBlue,
    GameOfLifeStates.DEAD_OVER_POPULATED: Color.DarkSlateBlue,
    GameOfLifeStates.ALIVE: Color.Pink,
    GameOfLifeStates.ALIVE_BORN: Color.HotPink,
  });

  // Create the simulator object. This holds the world (the grid) and
  // the rules (the cellular automaton). It also controls the seeding & timing
  final sim = new Simulator(
      world: new CellWorld<GameOfLifeStates>(
          width: 64, height: 64, defaultState: GameOfLifeStates.DEAD),
      rules: new GameOfLife(),
      generationDuration: new Duration(milliseconds: 50),
      palette: palette,
      generator: new MathematicalGenerator<GameOfLifeStates>(
          type: MathematicalGenerators.RANDOM,
          valueTrue: GameOfLifeStates.ALIVE_BORN,
          valueFalse: GameOfLifeStates.DEAD));

  // create the renderer (StageXL in a web context)
  final renderer = new StageXLRenderer(width: 64, height: 64)
    ..initStageXL(
      canvas: querySelector('#canvas'),
      stageWidth: 512,
      stageHeight: 512,
      palette: palette.values.toList(growable: false),
    );

  // render loop (wire the simulation & renderer together)
  sim.onRender.listen((Array2d renderData) {
    // render the cell world state
    renderer.render(renderData);
    //world.applyPalette<int>(changesOnly: true, palette: palette)
  });

  // start the simulation
  sim.start();
}
