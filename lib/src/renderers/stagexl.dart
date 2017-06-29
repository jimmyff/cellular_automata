import 'dart:html';
import 'package:stagexl/stagexl.dart';

import 'package:cellular_automata/src/renderers/_ca_renderer.dart';
import 'package:cellular_automata/src/util/array_2d.dart';

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

  void render(Array2d<int> renderData) {
    // TODO: This shouldn't remove children - but needs to otherwise lags
    _stage.removeChildren();

    var grid = new Shape();
    grid.addTo(_stage);

    num cellWidth = (width / renderData.width);
    num cellHeight = (height / renderData.height);

    for (num x = 0; x < renderData.width; x++) {
      for (num y = 0; y < renderData.height; y++) {
        final color = renderData.get(x, y);
        if (color == null) continue;

        grid.graphics.beginPath();
        grid.graphics
            .rect(x * cellWidth, y * cellHeight, cellWidth, cellHeight);
        grid.graphics.fillColor(color);
      }
    }
  }
}
