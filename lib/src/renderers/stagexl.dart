import 'dart:html';
import 'package:stagexl/stagexl.dart';

import 'package:cellular_automata/src/renderers/_ca_renderer.dart';
import 'package:cellular_automata/src/util/array_2d.dart';

enum StageXLDisplayMode { FULLSCREEN, FIXED }

/// StageXL WebGL renderer for displaying CA on the web
class StageXLRenderer extends CARenderer {
  int _width;
  int _height;

  Array2d<Bitmap> _bitmapGrid;

  StageXLRenderer({int width, int height})
      : _width = width ?? 128,
        _height = height ?? 128;

  /// StageXL specific setup
  initStageXL(
      {CanvasElement canvas,
      StageXLDisplayMode displayMode: StageXLDisplayMode.FIXED,
      num stageWidth,
      num stageHeight,
      List<int> palette}) {
    print('Stage XL: ${_width}x$_height (${stageWidth}x${stageHeight}px)');

    final cellWidth = stageWidth / _width;
    final cellHeight = stageHeight / _height;

    StageXL.stageOptions
      ..renderEngine = RenderEngine.WebGL
      ..backgroundColor = Color.Black
      ..stageAlign = StageAlign.NONE;

    // handle scaling
    switch (displayMode) {
      case StageXLDisplayMode.FIXED:
        StageXL.stageOptions.stageScaleMode = StageScaleMode.SHOW_ALL;
        break;
      case StageXLDisplayMode.FULLSCREEN:
        StageXL.stageOptions.stageScaleMode = StageScaleMode.EXACT_FIT;
        break;
    }

    final _stage = new Stage(canvas, width: stageWidth, height: stageHeight);

    // setup the bitmap texture...
    final container = new BitmapContainer();
    _bitmapGrid = new Array2d<Bitmap>(_width, _height, null);
    for (num x = 0; x < _bitmapGrid.width; x++) {
      for (num y = 0; y < _bitmapGrid.height; y++) {
        final bitmap = new Bitmap()
          ..x = x * cellWidth
          ..y = y * cellHeight
          ..bitmapData = null;
        container.addChild(bitmap);
        _bitmapGrid.set(x, y, bitmap);
      }
    }

    // setup the color palette
    _palette = new BitmapData(cellWidth * 16, cellHeight);
    _stage.addChild(container);
    final shape = new Shape();
    for (var i = 0; i < palette.length; i++)
      shape.graphics
        ..beginPath()
        ..rect(i * cellWidth, 0, cellWidth, cellHeight)
        ..fillColor(palette[i]);

    _palette.draw(shape);
    _paletteFrames = _palette.sliceIntoFrames(cellWidth, cellHeight);

    for (var i = 0; i < palette.length; i++)
      _paletteMap[palette[i]] = _paletteFrames[i];

    // setup render loop
    new RenderLoop()..addStage(_stage);
  }

  BitmapData _palette;
  final Map<int, BitmapData> _paletteMap = {};
  List<BitmapData> _paletteFrames;

  @override
  void render(Array2d<int> renderData) {
    for (num x = 0; x < renderData.width; x++) {
      for (num y = 0; y < renderData.height; y++) {
        final color = renderData.get(x, y);

        // Patches pass nulls
        if (color == null) continue;
        _bitmapGrid.get(x, y).bitmapData = _paletteMap[color];
      }
    }
  }
}
