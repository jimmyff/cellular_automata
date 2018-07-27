import 'package:cellular_automata/cellular_automata.dart';
import 'package:cellular_automata/rules.dart';
import 'package:cellular_automata/renderer_ascii.dart';

// Simple example of cellular_automata.
// For prettier outputs see the platform specific renderers
// Run in terminal with command: pub run example/majority_vote.dart
void main() {
  final width = 48;
  final height = 22;

  final palette = new Map<bool, String>.from({true: '_', false: 'X'});

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
            automaton: new Automaton<bool, String>(
          width: width,
          height: height,
          defaultState: false,
          palette: palette,
          wrap: true,
          rules: new MajorityVote(),
        )..applyGenerator(new MathematicalGenerator<bool>(
                type: MathematicalGenerators.random,
                valueTrue: true,
                valueFalse: false)));
    })
    ..onFullPaint.listen((CellGrid<String> snapshot) {
      renderer
        ..clearConsole()
        ..render(snapshot);

      print('');
      print('Rules: Majority Vote');
      print('Generation: ${scene.generationCounter}');
      print('');
    })
    ..onComplete.listen((SceneCompleteReason s) {
      scene.stop();
      print('All done! Stable scene detected.');
    })
    ..start();
}
