from threading import Lock


class Foo:
    def __init__(self):
        self.firstMutex = Lock()
        self.secondMutex = Lock()
        self.firstMutex.acquire()
        self.secondMutex.acquire()

    def first(self, printFirst: 'Callable[[], None]') -> None:
        printFirst()
        self.firstMutex.release()

    def second(self, printSecond: 'Callable[[], None]') -> None:
        with self.firstMutex:
            printSecond()
            self.secondMutex.release()

    def third(self, printThird: 'Callable[[], None]') -> None:
        with self.secondMutex:
            printThird()
