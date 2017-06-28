import 'dart:html';
import 'package:stagexl/stagexl.dart';

import 'package:cellular_automaton/src/renderers/_ca_renderer.dart';
import 'package:cellular_automaton/src/util/array_2d.dart';

enum StageXLDisplayMode { FULLSCREEN, FIXED }

/// StageXL WebGL renderer for displaying CA on the web
class StageXLRenderer extends CARenderer {
  int _stageWidth;
  int _stageHeight;

  final CanvasElement _canvas;
  Stage _stage;
  StageXLDisplayMode _displayMode;

  num get width => _stageWidth;
  num get height => _stageHeight;

  StageXLRenderer(
      {CanvasElement canvas,
      StageXLDisplayMode displayMode,
      num stageWidth,
      num stageHeight})
      : _canvas = canvas,
        _stageWidth = stageWidth ?? 128,
        _stageHeight = stageHeight ?? 128,
        _displayMode = displayMode {
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

    // TODO: pass in options here
    _stage = new Stage(_canvas, width: width, height: height);

    print('Stage XL setup: ${width}x${height}');

    var renderLoop = new RenderLoop();
    renderLoop.addStage(_stage);

    // output the size of stage.contentRectangle
    _stage.onResize.listen((e) => print(_stage.contentRectangle));
  }

  // TODO: this should accept a patch
  void render(Array2d<int> renderData) {
    _stage.removeChildren();

    var backgroundGrid = new Shape();
    backgroundGrid.addTo(_stage);

    backgroundGrid.graphics.beginPath();
    backgroundGrid.graphics.rect(0, 0, width, height);
    backgroundGrid.graphics.fillColor(Color.DarkViolet);

    num cellWidth = (width / renderData.width);
    num cellHeight = (height / renderData.height);

    for (num x = 0; x < renderData.width; x++) {
      for (num y = 0; y < renderData.height; y++) {
        final color = renderData.get(x, y);
        if (color == null) continue;

        backgroundGrid.graphics.beginPath();
        backgroundGrid.graphics
            .rect(x * cellWidth, y * cellHeight, cellWidth, cellHeight);
        backgroundGrid.graphics.fillColor(color);
      }
    }
  }
}
