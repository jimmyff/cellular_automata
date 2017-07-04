import 'package:cellular_automata/src/rules/_ca_rules.dart';
import 'package:cellular_automata/cellular_automata.dart';
import 'dart:math' as math;

/// Implementation of a Majority voting CA
class MajorityVote extends CARules {
// TODO: implement whatToProcess - follow state boundaries

  @override
  int calculateState(int x, int y, CellWorld world) {
    final int currentState = world.getState(x, y);

    // Distribution: {STATE, [COUNT, STATE]}
    final Map<int, List<int>> distribution = {};
    world.getNeighborhood(x, y)
      ..forEach((int i) {
        if (distribution[i] == null)
          distribution[i] = [1, i];
        else
          distribution[i][0]++;
      });

    // Sort the Distribution
    List<int> highestStates = [];
    int highestStateCount = 0;
    distribution.values.toList(growable: false)
      ..forEach((v) {
        if (v[0] > highestStateCount) {
          highestStateCount = v[0];
          highestStates = [v[1]];
        } else if (v[0] == highestStateCount) {
          highestStates.add(v[1]);
        }
      });

    // if a majority return that state
    if (highestStates.length == 1) return highestStates[0];

    // If not a majority - random select a winning state
    return highestStates[(new math.Random().nextInt(highestStates.length))];

    // TODO: implement other drawer handlers
  }
}
