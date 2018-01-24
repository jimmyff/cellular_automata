# Cellular Automata 
[![Build Status](https://travis-ci.org/jimmyff/cellular_automata.svg?branch=master)](https://travis-ci.org/jimmyff/cellular_automata)
  
A cellular automata library / playground written in Dart. Happily accepting pull requests! ^_^
 
 * Author: Jimmy Forrester-Fellowes ([jimmyff](https://github.com/jimmyff))
 * Github: [https://github.com/jimmyff/cellular_automata](https://github.com/jimmyff/cellular_automata)
 * Dart Pub: [https://pub.dartlang.org/packages/cellular_automata](https://pub.dartlang.org/packages/cellular_automata)
 * Travis: [https://travis-ci.org/jimmyff/cellular_automata/](https://travis-ci.org/jimmyff/cellular_automata/)
 * Demos: [http://jimmyff.github.io/cellular_automata](http://jimmyff.github.io/cellular_automata)

## Features

 * Simple system for writing optimised rules
 * MCell rules compatible, current systems supported:
   * MCell Generations
 * Generators to seed the simulation
 * Map states to colours/characters for rendering
 * Controls: pause, resume, stepBack, stepForward
 * Stale simulation detection (repeating generations or patterns in activity)
 * Utilises the `package:logging` for debug & info ([view on pub](https://pub.dartlang.org/packages/logging))
 * Decoupled renderers:
   * Canvas: (Web), fullscreen support
   * StageXL: (Web), WebGL, fullscreen support, (performance issues with big scenes)
  
## Implemented rules/simulations
  
 * Conway's Game of Life ([source](https://github.com/jimmyff/cellular_automata/blob/master/lib/src/rules/game_of_life.dart))
 * Conway's Game of Life Simple (binary states) ([source](https://github.com/jimmyff/cellular_automata/blob/master/lib/src/rules/game_of_life_simple.dart))
 * Brian's Brain ([source](https://github.com/jimmyff/cellular_automata/blob/master/lib/src/rules/brians_brain.dart))
 * Majority Vote ([source](https://github.com/jimmyff/cellular_automata/blob/master/lib/src/rules/majority_vote.dart))
 * MCell Generations rule parser. See the demos including:
   * Star Wars
   * Rake
   * Star Wars
   * Sedi Mental 
   * Frozen Sprials
  
## Demos
  
See the `demos/` [folder](https://github.com/jimmyff/cellular_automata/tree/master/demos) for demos. You can try the [hosted demos](http://jimmyff.github.io/cellular_automata) here.
  
## Performance

Dartium performance is significantly faster than compiled performance at the moment. Also there are some generator [defects](https://github.com/dart-lang/sdk/issues/30049) that are yet to be resolved. To try and increase use the `trust-type-annotations` flag in your pubspec:

```
transformers:
- $dart2js:
    checked: false
    minify: true
    commandLineOptions: ['--trust-type-annotations', '--trust-primitives']

```
  
## Roadmap

 * Add more MCell rule parsers
 * Add MCell rule database
 * Add multiple states to 'Majority Vote'
 * Add visual feedback to show processing of simulations - useful whilst building and debugging
 * Support for entities to exist which would allow for simulations such as Langton's Ant
 * Add a multiple states generator
 * Add more tests
 * Transitions for switching between two simulations
 * Multiple simulations/rule-sets running in a single scene
 * Generated color palettes
 * Interactive mode (edit mode)
 * Analysis tools (histograms for state counts)
 * Add an LED Matrix renderer for raspberry pi using GPIO pins
 * Flutter renderer
 * CLI renderer
 * Hexagonal grids
 * Infinite world size support
 
## Credits
   
Please see the [credits](https://github.com/jimmyff/cellular_automata/blob/master/CREDITS.md) file for a list of the authors that discovered the rules that have been implemented in this project.
  
## Licence
   
Please see the [cellular_automata license](https://github.com/jimmyff/cellular_automata/blob/master/LICENSE).