// Copyright (c) 2017, jimmyff. All rights reserved. Use of this source code
// is governed by a BSD-style license that can be found in the LICENSE file.

import 'dart:html';
import 'dart:async';

import 'package:params/client.dart';

import 'package:cellular_automaton/cellular_automaton.dart';
import 'package:cellular_automaton/renderer_stagexl.dart';
import 'package:cellular_automaton/rules.dart';


void startSimulation ({
  num worldWidth,
  num worldHeight,
  num stageWidth,
  num stageHeight,
  String generator,
  StageXLDisplayMode displayMode,
  CanvasElement canvas
}) {

  final world = new CellWorld(
      width: worldWidth,
      height: worldHeight
  );

  final display = new StageXLRenderer(
    canvas: canvas,
    world: world,
    displayMode: displayMode,
    stageWidth: stageWidth,
    stageHeight: stageHeight
  );

  final sim = new Simulator(
      world: world,
      rules: new GameOfLife(),
      speed: new Duration(milliseconds: 60),
      generator: generator
  );

  sim.onTick.listen((CellWorld world) => display.render(world));
}

// Process the input parameteres
void _initSimulation([dynamic _]) {
  num worldWidth = params['width']!=null?int.parse(params['width']):null;
  num worldHeight = params['height']!=null?int.parse(params['height']):null;
  num stageWidth;
  num stageHeight;

  final num renderSize = int.parse(params['render_size'] ?? '8');
  final String generator = params['generator'];
  StageXLDisplayMode displayMode;

  String bodyClass;

  switch (params['stage']) {
    case 'fullscreen':
      displayMode = StageXLDisplayMode.FULLSCREEN;
      stageWidth = window.innerWidth;
      stageHeight = window.innerHeight;
      worldWidth = (stageWidth/renderSize).round();
      worldHeight = (stageHeight/renderSize).round();
      bodyClass = 'stage-full-window';
      break;
    case 'fixed':
    default:
      displayMode = StageXLDisplayMode.FIXED;
      stageWidth = worldWidth*renderSize;
      stageHeight = worldHeight*renderSize;
      bodyClass = 'stage-fixed-size';
  }

  querySelector('body').classes.add(bodyClass);

  startSimulation(
      worldWidth: worldWidth,
      worldHeight: worldHeight,
      stageHeight: stageHeight,
      stageWidth: stageWidth,
      generator: generator,
      displayMode: displayMode,
      canvas: querySelector('#stage')
        ..style.width = '${stageWidth}px'
        ..style.height ='${stageHeight}px'
  );


}


  Future<Null> main() async {

  // load the request parameters
  await initParams();
  _initSimulation();
  window.onResize.listen(_initSimulation);

}
