import 'dart:html';
import 'package:stagexl/stagexl.dart';

import 'package:cellular_automata/src/renderers/_ca_renderer.dart';
import 'package:cellular_automata/src/util/array_2d.dart';

enum StageXLDisplayMode { FULLSCREEN, FIXED }

/// StageXL WebGL renderer for displaying CA on the web
class StageXLRenderer extends CARenderer {
  int _gridWidth;
  int _gridHeight;
  int _stageWidth;
  int _stageHeight;

  final CanvasElement _canvas;
  Stage _stage;
  StageXLDisplayMode _displayMode;

  num get width => _stageWidth;
  num get height => _stageHeight;

  num get gridWidth => _gridWidth;
  num get gridHeight => _gridHeight;

  Array2d<Bitmap> _bitmapGrid;
  Sprite _sprite;

  StageXLRenderer(
      {CanvasElement canvas,
      StageXLDisplayMode displayMode,
      num stageWidth,
      num stageHeight,
      int gridWidth,
      int gridHeight})
      : _canvas = canvas,
        _stageWidth = stageWidth ?? 128,
        _stageHeight = stageHeight ?? 128,
        _gridWidth = gridWidth ?? 128,
        _gridHeight = gridHeight ?? 128,
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

    _bitmapGrid = new Array2d<Bitmap>(_gridWidth, _gridHeight, null);
    _sprite = new Sprite();

    for (num x = 0; x < _bitmapGrid.width; x++) {
      for (num y = 0; y < _bitmapGrid.height; y++) {
        var bitmap = new Bitmap();
        bitmap.x = x * (width / _bitmapGrid.width);
        bitmap.y = y * (height / _bitmapGrid.height);
        _sprite.addChild(bitmap);
        _bitmapGrid.set(x, y, bitmap);
      }
    }
    // add the sprite
    _stage.addChild(_sprite);

    // output the size of stage.contentRectangle
    _stage.onResize.listen((e) => print(_stage.contentRectangle));
  }

  Map<int, BitmapData> _colours = {};

  void render(Array2d<int> renderData) {
    num cellWidth = (width / renderData.width);
    num cellHeight = (height / renderData.height);

    for (num x = 0; x < renderData.width; x++) {
      for (num y = 0; y < renderData.height; y++) {
        final color = renderData.get(x, y);
        if (color == null) continue;

        _colours[color] ??= new BitmapData(cellWidth, cellHeight, color);

        _bitmapGrid.get(x, y).bitmapData = _colours[color];
      }
    }
  }
}
