# Changelog

## 0.4

- Added 'Majority Vote' Rules
- Optimised 'Brian's Brain' processing
- Updated demos


## 0.3

- Added 'Conway's Game of Life Simple' Rules - has binary states and minimal code
- Added 'Brian's Brain' Rules
- Updated demos


## 0.2

- Optimised cell processing, now only processes cells that neighbor active states
- Added tests (more to add)
- Improved StageXL bitmap colours crispness by adding frame margin 

## 0.1

- Refactored so Rule's cell-states are now passed as generic types in to the Cell World for better analyzer & tooling support
- Added a CAGenerators for generating/seeding worlds
- Renderers are now further decoupled from the Simulation. They now just require an array2d containing states expressed in a palette.
- Added a very simple demo (simple_example.dart) to show minimum setup code
- CellWorld now stores full cell-states and Rules also deal with full cell-states which makes code more readable
- Fixed mathematical generators

## 0.0

- Initial version, includes basic implementation of GameOfLife with StageXL renderer
- Hosted demos
