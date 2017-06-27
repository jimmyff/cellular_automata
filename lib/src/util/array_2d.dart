// Array2d : Author: @kevmoo
// https://github.com/dart-lang/sample-pop_pop_win/blob/master/lib/src/array_2d.dart

import 'dart:collection';
import 'dart:math' as math;

import 'dart:core';

class Array2d<T> extends ListBase<T> {
  final int width;
  final int height;
  final List<T> _source;

  factory Array2d(int width, int height, [T initialValue]) {
    final s = new List<T>.filled(width * height, initialValue);
    assert(s.length == width * height);
    if (width == 0) {
      return new Array2d._skinny(height);
    }
    return new Array2d.wrap(width, s);
  }

  factory Array2d.readonlyFrom(int width, Iterable<T> source) {
    var list = new List<T>.from(source);
    var s = source == null ? null : new UnmodifiableListView<T>(list);
    return new Array2d.wrap(width, s);
  }

  Array2d._skinny(this.height)
      : width = 0,
        _source = [] {
    assert(height >= 0);
  }

  Array2d.wrap(int width, List<T> source)
      : this.width = width,
        this._source = source,
        this.height = (width != null && width > 0 && source != null)
            ? source.length ~/ width
            : 0 {
    if (width * height == 0) {} else {}
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

  // TODO: test
  //  - especially equality across instances, rows, etc
  List<List<T>> get rows => new _Array2dRows(this);

  T get(int x, int y) {
    final i = _getIndex(x, y);
    return this[i];
  }

  void set(int x, int y, T value) {
    final i = _getIndex(x, y);
    this[i] = value;
  }

  List<T> getAdjacent(int x, int y) {
    final m = getAdjacentIndices(x, y).map((i) => this[i]);
    return new List<T>.from(m);
  }

  List<int> getAdjacentIndices(int x, int y) {
    final List<int> adj = new List<int>();

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

class _Array2dRows<T> extends ListBase<List<T>> {
  final Array2d<T> source;

  _Array2dRows(this.source);

  @override
  int get length => source.height;

  @override
  set length(int value) {
    throw new UnsupportedError('Not supported');
  }

  @override
  List<T> operator [](int index) => new _Array2dRow<T>(this.source, index);

  @override
  void operator []=(int index, List<T> value) {
    throw new UnsupportedError('Not supported');
  }

  @override
  bool operator ==(other) {
    return other is _Array2dRows && other.source == this.source;
  }

  @override
  int get hashCode => source.hashCode;
}

class _Array2dRow<T> extends ListBase<T> {
  final Array2d<T> source;
  final int row;

  _Array2dRow(this.source, this.row);

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
