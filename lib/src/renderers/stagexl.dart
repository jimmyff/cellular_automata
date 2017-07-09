import 'dart:html';
import 'package:stagexl/stagexl.dart';

import 'package:logging/logging.dart';

import 'package:cellular_automata/cellular_automata.dart';
import 'package:cellular_automata/src/renderers/_ca_renderer.dart';

final _log = new Logger('cellular_automata.renderers.stage_xl');

enum StageXLDisplayMode { FULLSCREEN, FIXED }

/// StageXL WebGL renderer for displaying CA on the web
class StageXLRenderer extends CARenderer {
  int _width;
  int _height;

  final _paletteMap = <int, BitmapData>{};
  CellGrid<Bitmap> _bitmapGrid;

  StageXLRenderer({int width, int height})
      : _width = width ?? 128,
        _height = height ?? 128;

  /// StageXL specific setup
  void initStageXL(
      {CanvasElement canvas,
      StageXLDisplayMode displayMode: StageXLDisplayMode.FIXED,
      num stageWidth: 256,
      num stageHeight: 256,
      List<int> palette}) {
    _log.fine('Stage XL: ${_width}x$_height (${stageWidth}x${stageHeight}px)');

    final cellWidth = (stageWidth / _width).round();
    final cellHeight = (stageHeight / _height).round();

    StageXL.stageOptions
      ..renderEngine = RenderEngine.WebGL
      ..backgroundColor = Color.Black
      ..antialias = false
      ..stageRenderMode = StageRenderMode.AUTO
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
    _bitmapGrid = new CellGrid<Bitmap>(_width, _height, null);
    for (num x = 0; x < _bitmapGrid.width; x++) {
      for (num y = 0; y < _bitmapGrid.height; y++) {
        final bitmap = new Bitmap()
          ..x = x * cellWidth
          ..y = y * cellHeight
          ..bitmapData = null;
        container.addChild(bitmap);
        _bitmapGrid.set(x, y, bitmap, false);
      }
    }
    _stage.addChild(container);

    // setup the color palette
    List<BitmapData> _paletteFrames;
    final _palette =
        new BitmapData((cellWidth + 2) * palette.length, (cellHeight + 2));
    final shape = new Shape();
    for (var i = 0; i < palette.length; i++)
      shape.graphics
        ..beginPath()
        ..rect(i * (cellWidth + 2), 0, cellWidth + 2, cellHeight + 2)
        ..fillColor(palette[i]);

    _palette.draw(shape);
    _paletteFrames = _palette.sliceIntoFrames(cellWidth, cellHeight,
        frameMargin: 1, frameSpacing: 2);

    for (var i = 0; i < palette.length; i++)
      _paletteMap[palette[i]] = _paletteFrames[i];

    // setup render loop
    new RenderLoop()..addStage(_stage);
  }

  @override
  void render(CellGrid<int> renderData) {
    for (num x = 0; x < renderData.width; x++)
      for (num y = 0; y < renderData.height; y++) {
        final color = renderData.get(x, y);
        if (color == null) continue; // Patches pass nulls if no change
        _bitmapGrid.get(x, y).bitmapData = _paletteMap[color];
      }
  }
}
