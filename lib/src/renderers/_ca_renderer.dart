import 'package:cellular_automata/cellular_automata.dart';

/// Abstract renderer class, all renderers should extend this
abstract class CARenderer {
  // TODO: this should be dynamic but causes problems with stagexl implementation
  void render<T>(CellGrid<T> renderData);

  void applyPaletteAndRender<T, S>(CellGrid<T> snapshot, Map<T, S> palette) {
    return render<S>(applyPalette<T, S>(snapshot, palette));
  }

  CellGrid<S> applyPalette<T, S>(CellGrid<T> snapshot, Map<T, S> palette) {
    final output = new CellGrid<S>(snapshot.width, snapshot.height);
    for (num x = 0; x < snapshot.width; x++) {
      for (num y = 0; y < snapshot.height; y++) {
        output.set(
            x,
            y,
            snapshot.get(x, y) == null ? null : palette[snapshot.get(x, y)],
            false);
      }
    }
    return output;
  }
}
