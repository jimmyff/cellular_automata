import "package:test/test.dart";
import 'package:cellular_automata/cellular_automata.dart';
import 'package:cellular_automata/rules.dart';

void main() {
  group("Cell World", () {
    test("Get Neighbor indicies", () {
      final sim = new Automaton<bool, bool>(
          width: 8,
          height: 8,
          defaultState: false,
          wrap: true,
          rules: new GameOfLifeSimple());
      final grid = new CellGrid<bool>(8, 8, false);

      final x = 6;
      final y = 2;
      grid.set(x, y, true, sim.rules.wrap);

      // TODO: don't hardcode wrap
      final output = grid.activateStatesMooresNeighbors([true], sim.rules.wrap);

      expect(output.get(x - 1, y - 1, sim.rules.wrap, sim.rules.defaultState),
          equals(true));
      expect(output.get(x, y - 1, sim.rules.wrap, sim.rules.defaultState),
          equals(true));
      expect(output.get(x + 1, y - 1, sim.rules.wrap, sim.rules.defaultState),
          equals(true));
      expect(output.get(x - 1, y, sim.rules.wrap, sim.rules.defaultState),
          equals(true));
      expect(output.get(x + 1, y, sim.rules.wrap, sim.rules.defaultState),
          equals(true));
      expect(output.get(x - 1, y + 1, sim.rules.wrap, sim.rules.defaultState),
          equals(true));
      expect(output.get(x, y + 1, sim.rules.wrap, sim.rules.defaultState),
          equals(true));
      expect(output.get(x + 1, y + 1, sim.rules.wrap, sim.rules.defaultState),
          equals(true));
    });
  });
}
