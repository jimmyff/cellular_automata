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

  num _cellHeight;
  num _cellWidth;

  Array2d<Bitmap> _bitmapGrid;
  Sprite _sprite;

  StageXLRenderer(
      {CanvasElement canvas,
      StageXLDisplayMode displayMode,
      num stageWidth,
      num stageHeight,
      int gridWidth,
      int gridHeight,
      List<int> palette})
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

    print(
        'Stage XL setup: ${width}x${height} grid:  ${_gridWidth}x${gridHeight}');

    var renderLoop = new RenderLoop();
    renderLoop.addStage(_stage);

    _bitmapGrid = new Array2d<Bitmap>(_gridWidth, _gridHeight, null);
    _sprite = new Sprite();

    _cellWidth = _stageWidth / gridWidth;
    _cellHeight = stageHeight / gridHeight;

    var container = new BitmapContainer();

    for (num x = 0; x < _bitmapGrid.width; x++) {
      for (num y = 0; y < _bitmapGrid.height; y++) {
        var bitmap = new Bitmap()
          ..x = x * _cellWidth
          ..y = y * _cellHeight
          ..bitmapData = null;
//        _sprite.addChild(bitmap);
        container.addChild(bitmap);
        _bitmapGrid.set(x, y, bitmap);
      }
    }

    _palette = new BitmapData(_cellWidth * 16, _cellHeight);
    _stage.addChild(container);
    if (palette != null && palette.length > 0) {
      var shape = new Shape();
      for (int i = 0; i < palette.length; i++) {
        shape.graphics.beginPath();
        shape.graphics.rect(i * _cellWidth, 0, _cellWidth, _cellHeight);
        shape.graphics.fillColor(palette[i]);
//          _palette.setPixel(0, _paletteIndex.length, color);
//        _paletteIndex.add(color);
      }
      _palette.draw(shape);
      _paletteFrames = _palette.sliceIntoFrames(_cellWidth, _cellHeight);

      for (int i = 0; i < palette.length; i++) {
        print(
            '$i palette: ${palette} map: ${_paletteMap} frames: ${_paletteFrames}');
        _paletteMap[palette[i]] = _paletteFrames[i];
      }
    }

    // add the sprite
//    _stage.addChild(_sprite);

    // output the size of stage.contentRectangle
    _stage.onResize.listen((e) => print(_stage.contentRectangle));
  }

  BitmapData _palette;
  Map<int, BitmapData> _paletteMap = {};
  List<BitmapData> _paletteFrames;
  List<int> _paletteIndex = [];

  void render(Array2d<int> renderData) {
//    num cellWidth = (width / renderData.width);
//    num cellHeight = (height / renderData.height);

    for (num x = 0; x < renderData.width; x++) {
      for (num y = 0; y < renderData.height; y++) {
        final color = renderData.get(x, y);
        if (color == null) continue;

//        if (!_paletteIndex.contains(color)) {
//          var shape = new Shape();
//          shape.graphics.beginPath();
//          shape.graphics.rect(_paletteIndex.length*_cellWidth, 0, _cellWidth, _cellHeight);
//          shape.graphics.fillColor(color);
//          _palette.draw(shape);
////          _palette.setPixel(0, _paletteIndex.length, color);
//          _paletteIndex.add(color);
//          _paletteFrames = _palette.sliceIntoFrames(1, 1);
//          _paletteMap[color] = _paletteFrames.last;
//        }
        _bitmapGrid.get(x, y).bitmapData = _paletteMap[color];
      }
    }
  }
}
