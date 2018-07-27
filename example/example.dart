import 'package:cellular_automata/cellular_automata.dart';
import 'package:cellular_automata/rules.dart';
import 'package:cellular_automata/renderer_ascii.dart';

// Simple example showing the 'Brian Brain' automaton.
// For prettier outputs see the platform specific renderers
// Run in terminal with command: pub run example/example.dart
void main() {
  final width = 48;
  final height = 22;

  final palette = new Map<BriansBrainStates, String>.from({
    BriansBrainStates.dead: '_',
    BriansBrainStates.dying: 'x',
    BriansBrainStates.living: 'O'
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
          defaultState: BriansBrainStates.dead,
          palette: palette,
          wrap: true,
          rules: new BriansBrain(),
        )..applyGenerator(new MathematicalGenerator<BriansBrainStates>(
                type: MathematicalGenerators.random,
                valueTrue: BriansBrainStates.living,
                valueFalse: BriansBrainStates.dead)));
    })
    ..onFullPaint.listen((CellGrid<String> snapshot) {
      renderer
        ..clearConsole()
        ..render(snapshot);
    })
    ..onComplete.listen((SceneCompleteReason s) {
      scene.stop();
      print('All done! (Generation ${scene.generationCounter})');
    })
    ..start();
}
