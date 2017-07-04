import 'dart:async';

Stream<int> timeController(Duration interval, [int maxCount]) {
  StreamController<int> controller;
  Timer timer;
  int counter = 0;

  void tick(_) {
    counter++;
    controller.add(counter); // Ask stream to send counter values as event.
    if (maxCount != null && counter >= maxCount) {
      timer.cancel();
      controller.close(); // Ask stream to shut down and tell listeners.
    }
  }

  void startTimer() {
    timer = new Timer.periodic(interval, tick);
  }

  void stopTimer() {
    if (timer != null) {
      timer.cancel();
      timer = null;
    }
  }

  controller = new StreamController<int>(
      onListen: startTimer,
      onPause: stopTimer,
      onResume: startTimer,
      onCancel: stopTimer);

  return controller.stream;
}
