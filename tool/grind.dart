library cellular_automata.tool.grind;

export 'package:bwu_grinder_tasks/bwu_grinder_tasks.dart' hide main;
import 'package:bwu_grinder_tasks/bwu_grinder_tasks.dart'
    show Task, grind, writeVersionInfoFile;

void main([List<String> args]) {
  grind(args);
}

@Task('update-version')
dynamic updateVersion() => writeVersionInfoFile();
