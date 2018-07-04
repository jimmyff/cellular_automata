import 'package:cellular_automata/cellular_automata.dart';
import 'package:cellular_automata/rules.dart';
import 'package:cellular_automata/src/renderers/ascii_renderer.dart';

// Simple example of cellular_automata.
// For prettier outputs see the platform specific renderers
// Run in terminal with command: pub run example/majority_vote.dart
void main() {
  final width = 48;
  final height = 22;

  final palette = new Map<BriansBrainStates, String>.from({
    BriansBrainStates.OFF: '_',
    BriansBrainStates.DYING: 'x',
    BriansBrainStates.ON: 'O'
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
            automaton: new Automaton<BriansBrainStates, String>(
          width: width,
          height: height,
          defaultState: BriansBrainStates.OFF,
          palette: palette,
          wrap: true,
          rules: new BriansBrain(),
        )..applyGenerator(new MathematicalGenerator<BriansBrainStates>(
                type: MathematicalGenerators.RANDOM,
                valueTrue: BriansBrainStates.ON,
                valueFalse: BriansBrainStates.OFF)));
    })
    ..onFullPaint.listen((CellGrid<String> snapshot) {
      renderer
        ..clearConsole()
        ..render(snapshot);

      print('');
      print('Rules: Brian\'s Brain');
      print('Generation: ${scene.generationCounter}');
      print('');
    })
    ..onComplete.listen((SimulationCompleteReason s) {
      scene.stop();
      print('All done! Stable scene detected.');
    })
    ..start();
}
