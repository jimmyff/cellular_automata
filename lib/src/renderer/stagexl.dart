import 'dart:html';
import 'package:stagexl/stagexl.dart';

import 'package:cellular_automaton/cellular_automaton.dart';

/// StageXL WebGL renderer for displaying CA on the web
class StageXLRenderer {
  final int _width;
  final int _height;

  final CanvasElement _canvas;
  Stage _stage;

  StageXLRenderer({CanvasElement canvas, CellWorld world})
      : _canvas = canvas,
        _width = world.width,
        _height = world.height {
    // configure StageXL default options.

    StageXL.stageOptions.renderEngine = RenderEngine.WebGL;
    StageXL.stageOptions.backgroundColor = Color.BlueViolet;

    // configure StageXL stage scale mode

    StageXL.stageOptions.stageScaleMode = StageScaleMode.SHOW_ALL;
    //StageXL.stageOptions.stageScaleMode = StageScaleMode.EXACT_FIT;
    //StageXL.stageOptions.stageScaleMode = StageScaleMode.NO_BORDER;
    //StageXL.stageOptions.stageScaleMode = StageScaleMode.NO_SCALE;

    // configure StageXL stage align

    StageXL.stageOptions.stageAlign = StageAlign.NONE;
    //StageXL.stageOptions.stageAlign = StageAlign.TOP_LEFT;

    // init Stage and RenderLoop

    _stage = new Stage(_canvas, width: _width, height: _height);

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
    backgroundGrid.graphics.rect(0, 0, _width, _height);
    backgroundGrid.graphics.fillColor(Color.DarkViolet);

    num cellWidth = (_width / world.width);
    num cellHeight = (_height / world.height);

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
