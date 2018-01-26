// Copyright (c) 2017, jimmyff. All rights reserved. Use of this source code
// is governed by a BSD-style license that can be found in the LICENSE file.

import 'dart:html';
import 'package:cellular_automata/cellular_automata.dart';
import 'package:cellular_automata/rules.dart';

import 'package:cellular_automata_web/renderer_canvas.dart';

// Simple example of using cellular_automata
void main() {
  Player createSim() {
    // configure the palette
    final palette = new Map<GameOfLifeStates, String>.from({
      GameOfLifeStates.DEAD: '#000',
      GameOfLifeStates.DEAD_UNDER_POPULATED: '#483D8B',
      GameOfLifeStates.DEAD_OVER_POPULATED: '#00008B',
      GameOfLifeStates.ALIVE: '#FF69B4',
      GameOfLifeStates.ALIVE_BORN: '#FFC0CB',
    });

    // Create the simulator object. This holds the world (the grid) and
    // the rules (the cellular automaton). It also controls the seeding & timing
    final player = new Player(
        simulator: new Simulator<GameOfLifeStates>(
          width: 64,
          height: 64,
          defaultState: GameOfLifeStates.DEAD,
          wrap: true,
          rules: new GameOfLife(),
        ),
        frameDuration: const Duration(milliseconds: 50),
        palette: palette,
        generator: new MathematicalGenerator<GameOfLifeStates>(
            type: MathematicalGenerators.RANDOM,
            valueTrue: GameOfLifeStates.ALIVE_BORN,
            valueFalse: GameOfLifeStates.DEAD));

    // create the renderer (StageXL in a web context)
    final renderer = new CanvasRenderer(width: 64, height: 64)
      ..initCanvas(
        canvas: querySelector('#canvas'),
        canvasWidth: 512,
        canvasHeight: 512,
      );

    // render loop (wire the simulation & renderer together)
    player.onRender.listen((CellGrid renderData) {
      // render the cell world state
      renderer.render(renderData);
    });
    return player;
  }

  Player ca;

  void startSim() {
    ca = createSim();
    ca.start();

    ca.onComplete.listen((SimulationCompleteReason s) {
      ca.stop();
      startSim();
    });
  }

  startSim();

  // attach controls
  final ButtonElement back = querySelector('#controls_back');
  final ButtonElement pause = querySelector('#controls_pause');
  final ButtonElement play = querySelector('#controls_play');
  final ButtonElement forward = querySelector('#controls_forward');

  pause.onClick.listen((e) => ca.pause());
  play.onClick.listen((e) => ca.resume());
  back.onClick.listen((e) => ca.stepBack());
  forward.onClick.listen((e) => ca.stepForward());
}
