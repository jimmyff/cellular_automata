/// 2D Array with CA additional features such as wrapping and neighbor counting
library cellular_automata.cell_grid;

import 'dart:collection';
import 'dart:core';
import 'dart:math' as math;

// import 'package:logging/logging.dart';
// final _log = new Logger('cellular_automata.cell_grid');

// Modified array_2d, original class by: @kevmoo
// https://github.com/dart-lang/sample-pop_pop_win/blob/master/lib/src/array_2d.dart

class CellGrid<T> extends ListBase<T> {
  final int width;
  final int height;
  final List<T> _source;

  factory CellGrid(int width, int height, [T initialValue]) {
    final s = new List<T>.filled(width * height, initialValue);
    assert(s.length == width * height);
    if (width == 0) {
      return new CellGrid._skinny(height);
    }
    return new CellGrid.wrap(width, s);
  }

  factory CellGrid.readonlyFrom(int width, Iterable<T> source) {
    final list = new List<T>.from(source);
    final s = source == null ? null : new UnmodifiableListView<T>(list);
    return new CellGrid.wrap(width, s);
  }

  CellGrid._skinny(this.height)
      : width = 0,
        _source = [] {
    assert(height >= 0);
  }

  CellGrid.wrap(this.width, List<T> source)
      : this._source = source,
        this.height = (width != null && width > 0 && source != null)
            ? source.length ~/ width
            : 0 {
    if (width * height == 0) {
    } else {}
  }

  @override
  int get length => _source.length;

  @override
  set length(int value) {
    throw new UnsupportedError('Not supported');
  }

  @override
  T operator [](int index) => _source[index];

  @override
  void operator []=(int index, T value) {
    _source[index] = value;
  }

  // operator +(CellGrid r) {
  // }
  void combine(CellGrid n) {
    final l = n.length;
    for (var i = 0; i < l; i++) if (n[i] != null) _source[i] = n[i];
  }

  // TODO: test
  //  - especially equality across instances, rows, etc
  List<List<T>> get rows => new _CellGridRows(this);

  // Wrap coordinates
  int _wrap(int v, int min, int max) =>
      min != null && v < min ? v + max : (v >= max ? v - max : v);
  int wrapX(int x) => _wrap(x, 0, width);
  int wrapY(int y) => _wrap(y, 0, height);

  T get(int x, int y, [bool wrap, T defaultValue]) {
    int _x = x, _y = y;

    if (wrap == true) {
      _x = wrapX(x);
      _y = wrapY(y);
    } else if (x < 0 || x > (width - 1) || y < 0 || y > (height - 1))
      return defaultValue;

    final i = _getIndex(_x, _y);
    return this[i];
  }

  void set(int x, int y, T value, bool wrap) {
    int _x = x, _y = y;

    if (wrap == true) {
      _x = wrapX(x);
      _y = wrapY(y);
    } else if (x < 0 || x > (width - 1) || y < 0 || y > (height - 1)) return;

    final i = _getIndex(_x, _y);
    this[i] = value;
  }

// If a rule wants to process active cells and moores neighbors they can use this
  CellGrid<bool> activateStatesMooresNeighbors<T>(
      List<T> activeStates, bool wrap,
      [List<T> processStates]) {
//    final List<T> l = grid.toList(growable: false);
    final o = new CellGrid<bool>(width, height, false);

    for (int y = 0; y < height; y++)
      for (int x = 0; x < width; x++)
        if (activeStates.contains(get(x, y, wrap, null))) {
          for (int y2 = y - 1; y2 <= y + 1; y2++) {
            for (int x2 = x - 1; x2 <= x + 1; x2++) {
              o.set(x2, y2, true, wrap);
            }
          }
        }
        // if we just want to process the cells not neighbors
        else if (processStates != null &&
            processStates.contains(get(x, y, wrap, null)))
          o.set(x, y, true, wrap);

    return o;
  }

  /// returns neighboring cells
  List<T> getNeighborhood(int x, int y,
      [bool wrap, T defaultValue, String system = 'moore']) {
    switch (system) {

      // TODO: make an enum
      case 'moore':
      default:
        return [
          get(x - 1, y - 1, wrap, defaultValue),
          get(x, y - 1, wrap, defaultValue),
          get(x + 1, y - 1, wrap, defaultValue),
          get(x - 1, y, wrap, defaultValue),
          get(x + 1, y, wrap, defaultValue),
          get(x - 1, y + 1, wrap, defaultValue),
          get(x, y + 1, wrap, defaultValue),
          get(x + 1, y + 1, wrap, defaultValue)
        ];
    }
  }

  List<T> getAdjacent(int x, int y) {
    final m = getAdjacentIndices(x, y).map((i) => this[i]);
    return new List<T>.from(m);
  }

  List<int> getAdjacentIndices(int x, int y) {
    final List<int> adj = <int>[];

    for (int k = math.max(0, y - 1); k < math.min(height, (y + 2)); k++) {
      for (int j = math.max(0, x - 1); j < math.min(width, (x + 2)); j++) {
        if (j != x || k != y) {
          adj.add(_getIndex(j, k));
        }
      }
    }
    return adj;
  }

  math.Point<int> getCoordinate(int index) {
    final x = index % width;
    final y = index ~/ width;
    assert(_getIndex(x, y) == index);
    return new math.Point<int>(x, y);
  }

  int _getIndex(int x, int y) {
    assert(x >= 0 && x < width);
    assert(y >= 0 && y < height);
    return x + y * width;
  }
}

class _CellGridRows<T> extends ListBase<List<T>> {
  final CellGrid<T> source;

  _CellGridRows(this.source);

  @override
  int get length => source.height;

  @override
  set length(int value) {
    throw new UnsupportedError('Not supported');
  }

  @override
  List<T> operator [](int index) => new _CellGridRow<T>(this.source, index);

  @override
  void operator []=(int index, List<T> value) {
    throw new UnsupportedError('Not supported');
  }

  @override
  bool operator ==(dynamic other) =>
      other is _CellGridRows && other.source == this.source;

  @override
  int get hashCode => source.hashCode;
}

class _CellGridRow<T> extends ListBase<T> {
  final CellGrid<T> source;
  final int row;

  _CellGridRow(this.source, this.row);

  @override
  int get length => source.width;

  @override
  set length(int value) {
    throw new UnsupportedError('Not supported');
  }

  @override
  T operator [](int index) => source.get(index, row);

  @override
  void operator []=(int index, T value) {
    throw new UnsupportedError('Not supported');
  }
}
