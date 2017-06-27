import 'dart:html';
import 'dart:async';
import 'package:stagexl/stagexl.dart';

import 'package:cellular_automaton/src/renderer/_ca_renderer.dart';
import 'package:cellular_automaton/cellular_automaton.dart';

enum StageXLDisplayMode { FULLSCREEN, FIXED }

/// StageXL WebGL renderer for displaying CA on the web
class StageXLRenderer extends CARenderer {
  int _stageWidth;
  int _stageHeight;

  num _resolutionHeight = 600;
  num _resolutionWidth = 800;

  final CanvasElement _canvas;
  Stage _stage;
  StageXLDisplayMode _displayMode;

  num get width => _stageWidth;
  num get height => _stageHeight;

  StageXLRenderer(
      {CanvasElement canvas,
      CellWorld world,
      StageXLDisplayMode displayMode,
      num stageWidth,
      num stageHeight})
      : _canvas = canvas,
        _stageWidth = stageWidth ?? 128,
        _stageHeight = stageHeight ?? 128,
        _displayMode = displayMode {
    // configure StageXL default options.

    StageXL.stageOptions.renderEngine = RenderEngine.WebGL;
    StageXL.stageOptions.backgroundColor = Color.Black;

    // handle resize events...
    switch (_displayMode) {
      case StageXLDisplayMode.FIXED:
        StageXL.stageOptions.stageScaleMode = StageScaleMode.SHOW_ALL;
        break;
      case StageXLDisplayMode.FULLSCREEN:
        StageXL.stageOptions.stageScaleMode = StageScaleMode.EXACT_FIT;
        break;
    }

    StageXL.stageOptions.stageAlign = StageAlign.NONE;

    // init Stage and RenderLoop

    _stage = new Stage(_canvas, width: width, height: height);

    print('Stage XL setup: ${width}x${height}');

    var renderLoop = new RenderLoop();
    renderLoop.addStage(_stage);

    // output the size of stage.contentRectangle
    _stage.onResize.listen((e) => print(_stage.contentRectangle));
  }

  void render(CellWorld world) {
    _stage.removeChildren();

    var backgroundGrid = new Shape();
    backgroundGrid.addTo(_stage);

    backgroundGrid.graphics.beginPath();
    backgroundGrid.graphics.rect(0, 0, width, height);
    backgroundGrid.graphics.fillColor(Color.DarkViolet);

    num cellWidth = (width / world.width);
    num cellHeight = (height / world.height);

    for (num x = 0; x < world.width; x++) {
      for (num y = 0; y < world.height; y++) {
        if (world.state(x, y) == 0) continue;
        backgroundGrid.graphics.beginPath();
        backgroundGrid.graphics
            .rect(x * cellWidth, y * cellHeight, cellWidth, cellHeight);

        backgroundGrid.graphics.fillColor(
            world.history(1, x, y) == 1 ? Color.Orange : Color.Yellow);
      }
    }
  }
}
