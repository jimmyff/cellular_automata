/// The main library, this is required to run cellular_automata
library cellular_automata;

export 'package:logging/logging.dart';

export 'package:cellular_automata/src/scene.dart';
export 'package:cellular_automata/src/generation.dart';
export 'package:cellular_automata/src/automaton.dart';
export 'package:cellular_automata/src/cell_grid.dart';
export 'package:cellular_automata/src/rules/_ca_rules.dart';

export 'package:cellular_automata/src/renderers/_ca_renderer.dart';

export 'package:cellular_automata/src/generators/_ca_generator.dart';
export 'package:cellular_automata/src/generators/mathematical.dart';
