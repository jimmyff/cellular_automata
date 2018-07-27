import 'package:cellular_automata/cellular_automata.dart';
import 'package:cellular_automata/rules.dart';
import 'package:cellular_automata/renderer_ascii.dart';

// Simple example of cellular_automata.
// For prettier outputs see the platform specific renderers
// Run in terminal with command: pub run example/game_of_life.dart
void main() {
  final width = 48;
  final height = 22;

  final palette = new Map<GameOfLifeStates, String>.from({
    GameOfLifeStates.dead: ' ',
    GameOfLifeStates.deadUnderPopulated: '_',
    GameOfLifeStates.deadOverPopulated: '_',
    GameOfLifeStates.alive: 'O',
    GameOfLifeStates.aliveBorn: '*',
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
          defaultState: GameOfLifeStates.dead,
          palette: palette,
          wrap: true,
          rules: new GameOfLife(),
        )..applyGenerator(new MathematicalGenerator<GameOfLifeStates>(
                type: MathematicalGenerators.random,
                valueTrue: GameOfLifeStates.aliveBorn,
                valueFalse: GameOfLifeStates.dead)));
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
    ..onComplete.listen((SceneCompleteReason s) {
      scene.stop();
      print('All done! Stable scene detected.');
    })
    ..start();
}
