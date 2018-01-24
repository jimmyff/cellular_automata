# Changelog

## 0.9

- Dart 2.0. Tested and all works correctly.
- Enabled Travis CI: [https://travis-ci.org/jimmyff/cellular_automata/](https://travis-ci.org/jimmyff/cellular_automata/)

## 0.8

- `MCellGenerations` rule parser added. This can parse all MCell Generations configs. 
- Credits
- `onStable` renamed `onComplete`, now passes `SimulatorCompleteReason` enum value. Current states are: `duration` and `stable`
- Demos updated to include MCell
- Credits file created to credit those that wrote/discovered the rules
- Decent Refactor, reorganised stuff! 
  - `Simulator` renamed `Player`
  - `Array2D` replaced with `CellGrid` which combines Array2D with CA specific functionality which simplifies `CellWorld`.
  - `CARules` interface updated
  - `CellWorld` renamed `Simulator`
   

## 0.7

- Optimised `MajorityVote` Rules, utilises edge detection to determine activity
- Added `paintFullSize` option to `CanvasRenderer`: This allows the scene to be painted at actual size rather than small and then resized via CSS.
- Added `maxAge` as a `Simulator` constructor parameter, if this is set then `onStable` is called when the generation count surpasses `maxAge`
- Added `package:logging` so debug information can be enabled / disabled 
- Updated demos

## 0.6

- Stable simulation detection. This broadcast to the `onStable` stream after detecting repeating identical generations or repeating generation `activeCellCount` patterns spanning up to 8 generations.
- Demos updated to auto reset on stable scene (excluding rendering examples)

## 0.5

- Added new default renderer for web: `CanvasRenderer`. This is a simple native Canvas renderer. This has been added as `StageXLRenderer` has performance issues with large scenes.
- Added demos for both `StageXLRenderer` and `CanvasRenderer`
- Demos moved over to use `CanvasRenderer`

## 0.4

- Added `MajorityVote` Rules
- Optimised `BriansBrain` processing
- Updated demos

## 0.3

- Added `GameOfLifeSimple` Rules. This simulation is a simpler version of `GameOfLife`, it only has binary states and implemented with minimal code
- Added `BriansBrain` Rules
- Updated demos

## 0.2

- Optimised cell processing, now only processes cells that neighbor active states
- Added tests (more to add)
- Improved StageXL bitmap colours crispness by adding frame margin 

## 0.1

- Refactored so Rule's cell-states are now passed as generic types in to the Cell World for better analyzer & tooling support
- Added a `CAGenerators` for generating/seeding worlds
- Renderers are now further decoupled from the Simulation. They now just require an CellGrid containing states expressed in a palette.
- Added a very simple demo (simple_example.dart) to show minimum setup code
- `CellWorld` now stores full cell-states and Rules also deal with full cell-states which makes code more readable
- Fixed mathematical generators

## 0.0

- Initial version, includes basic implementation of `GameOfLife` with `StageXLRenderer`
- Hosted demos
