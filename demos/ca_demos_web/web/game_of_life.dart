// Copyright (c) 2017, jimmyff. All rights reserved. Use of this source code
// is governed by a BSD-style license that can be found in the LICENSE file.

import 'dart:html';

import 'package:cellular_automaton/cellular_automaton.dart';
import 'package:cellular_automaton/renderer_stagexl.dart';
import 'package:cellular_automaton/rules.dart';

void main() {

  final world = new CellWorld(width: 128, height: 128);

  final display =
      new StageXLRenderer(canvas: querySelector('#stage'), world: world);

  final sim = new Simulator(
      world: world,
      rules: new GameOfLife(),
      speed: new Duration(milliseconds: 60));

  sim.onTick.listen((CellWorld world) => display.render(world));

}
