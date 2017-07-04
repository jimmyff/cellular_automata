import 'dart:html';

import 'package:cellular_automata/src/util/array_2d.dart';
import 'package:cellular_automata/src/renderers/_ca_renderer.dart';

enum CanvasDisplayMode { FULLSCREEN, FIXED }

/// StageXL WebGL renderer for displaying CA on the web
class CanvasRenderer extends CARenderer {
  int _width;
  int _height;
  CanvasElement _canvas;
  CanvasRenderingContext2D _ctx;

  CanvasRenderer({int width, int height})
      : _width = width ?? 128,
        _height = height ?? 128;

  /// StageXL specific setup
  void initCanvas(
      {CanvasElement canvas,
      CanvasDisplayMode displayMode: CanvasDisplayMode.FIXED,
      num canvasWidth: 256,
      num canvasHeight: 256}) {
    print('Canvas: ${_width}x$_height (${canvasWidth}x${canvasHeight}px)');

    _canvas = canvas
      ..width = _width
      ..height = _height;

    _ctx = _canvas.context2D;

    // handle scaling
    switch (displayMode) {
      case CanvasDisplayMode.FIXED:
        canvas.style
          ..imageRendering = 'pixelated'
          ..width = '${canvasWidth}px'
          ..height = '${canvasHeight}px';
        break;
      case CanvasDisplayMode.FULLSCREEN:
        canvas.style
          ..imageRendering = 'pixelated'
          ..width = '100%'
          ..height = '100%'
          ..position = 'fixed'
          ..top = '0px'
          ..left = '0px'
          ..right = '0px'
          ..bottom = '0px';
        break;
    }
  }

  @override
  void render(Array2d<int> renderData) {
    for (num x = 0; x < renderData.width; x++)
      for (num y = 0; y < renderData.height; y++) {
        final color = renderData.get(x, y);
        if (color == null) continue; // Patches pass nulls if no change
        _ctx
          ..fillStyle = renderData.get(x, y)
          ..fillRect(x, y, 1, 1);
      }
  }
}