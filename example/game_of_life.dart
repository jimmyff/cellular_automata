import 'package:cellular_automata/cellular_automata.dart';
import 'package:cellular_automata/rules.dart';
import 'package:cellular_automata/src/renderers/ascii_renderer.dart';

// Simple example of cellular_automata.
// For prettier outputs see the platform specific renderers
// Run in terminal with command: pub run example/game_of_life.dart
void main() {
  final width = 48;
  final height = 22;

  final palette = new Map<GameOfLifeStates, String>.from({
    GameOfLifeStates.DEAD: ' ',
    GameOfLifeStates.DEAD_UNDER_POPULATED: '_',
    GameOfLifeStates.DEAD_OVER_POPULATED: '_',
    GameOfLifeStates.ALIVE: 'O',
    GameOfLifeStates.ALIVE_BORN: '*',
  });

  final AsciiRenderer renderer = new AsciiRenderer();
  final scene = new Scene<String>(
    width: width,
    height: height,
    fpsTarget: 10,
  );
  scene
    ..onPrepare.listen((int count) {
      scene
        ..clearAutomata()
        ..addAutomaton(
            automaton: new Automaton<GameOfLifeStates, String>(
          width: width,
          height: height,
          defaultState: GameOfLifeStates.DEAD,
          palette: palette,
          wrap: true,
          rules: new GameOfLife(),
        )..applyGenerator(new MathematicalGenerator<GameOfLifeStates>(
                type: MathematicalGenerators.RANDOM,
                valueTrue: GameOfLifeStates.ALIVE_BORN,
                valueFalse: GameOfLifeStates.DEAD)));
    })
    ..onFullPaint.listen((CellGrid<String> snapshot) {
      renderer
        ..clearConsole()
        ..render(snapshot);

      print('');
      print('Rules: Conway\'s Game of Life');
      print('Generation: ${scene.generationCounter}');
      print('');
    })
    ..onComplete.listen((SimulationCompleteReason s) {
      scene.stop();
      print('All done! Stable scene detected.');
    })
    ..start();
}
