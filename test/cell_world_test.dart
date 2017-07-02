import "package:test/test.dart";
import 'package:cellular_automata/cellular_automata.dart';

void main() {
  group("Cell World", () {
    test("Get Neighbor indicies", () {
      final world =
          new CellWorld<bool>(width: 8, height: 8, defaultState: false);
      final grid = new Array2d<bool>(8, 8, false);

      final x = 6;
      final y = 2;
      grid.set(x, y, true);

      final output = world.activateStatesMooresNeighbors([true], grid);

      expect(output.get(x - 1, y - 1), equals(true));
      expect(output.get(x, y - 1), equals(true));
      expect(output.get(x + 1, y - 1), equals(true));
      expect(output.get(x - 1, y), equals(true));
      expect(output.get(x + 1, y), equals(true));
      expect(output.get(x - 1, y + 1), equals(true));
      expect(output.get(x, y + 1), equals(true));
      expect(output.get(x + 1, y + 1), equals(true));
//      expect(string.split(","), equals(["foo", "bar", "baz"]));
    });
  });
}
