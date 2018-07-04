import 'package:logging/logging.dart';

import 'package:cellular_automata/cellular_automata.dart';
import 'package:cellular_automata/src/renderers/_ca_renderer.dart';

final _log = new Logger('cellular_automata.renderers.ascii');

class AsciiRenderer extends CARenderer {
  AsciiRenderer();

  void clearConsole() {
    print("\x1B[2J\x1B[0;0H");
  }

  @override
  void render<String>(CellGrid<String> renderData) {
    for (int y = 0; y < renderData.height; y++) {
      var row = '';
      for (int x = 0; x < renderData.width; x++) {
        final char = renderData.get(x, y) ?? ' ';
        row += char;
      }
      print(row);
    }
  }
}
