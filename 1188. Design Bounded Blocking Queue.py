# enqueue ->
# enqueueLock.acquire()
# enqueueLock.insert(element)
# if(len(enqueueLock) == capacity) enqueueLock.acquire()
# else enqueueLock.release()
#
# if queue > 0, dequeueLock.release()

# dequeue ->
# dequeueLock.aquire()
# val = queue.pop()
# if(len(queue) > 0) dequeueLock.release()
# enqueueLock.release()
# return val


# Solution without semaphore
from threading import Lock


from threading import BoundedSemaphore


class BoundedBlockingQueue(object):
    def __init__(self, capacity: int):  # capacity 2
        self.appendSemaphore = BoundedSemaphore(capacity)
        self.popSemaphore = BoundedSemaphore(capacity)
        for i in range(capacity):
            self.popSemaphore.acquire()
        self.queue = collections.deque()

    def enqueue(self, element: int) -> None:
        self.appendSemaphore.acquire()
        self.queue.append(element)
        self.popSemaphore.release()

    def dequeue(self) -> int:
        self.popSemaphore.acquire()
        poppedValue = self.queue.popleft()
        self.appendSemaphore.release()

        return poppedValue

    def size(self) -> int:
        return len(self.queue)


class BoundedBlockingQueue2(object):

    def __init__(self, capacity: int):  # capacity 2
        self.capacity = capacity
        self.enqueueLock = Lock()
        self.dequeueLock = Lock()
        self.dequeueLock.acquire()
        self.queue = collections.deque()

    def enqueue(self, element: int) -> None:
        self.enqueueLock.acquire()
        self.queue.append(element)  # len 1

        if len(self.queue) < self.capacity:
            self.enqueueLock.release()  # 1 < 2 true |
        if len(self.queue) > 0 and self.dequeueLock.locked():
            self.dequeueLock.release()  # 1 > 0 true

    def dequeue(self) -> int:
        self.dequeueLock.acquire()
        poppedValue = self.queue.popleft()  # len 0

        if len(self.queue) > 0:
            self.dequeueLock.release()  # 0 > 0 false,  dequeueLock locked |
        if len(self.queue) < self.capacity and self.enqueueLock.locked():
            self.enqueueLock.release()  # ennqueue is unlocked
        return poppedValue

    def size(self) -> int:
        return len(self.queue)

# Solution with semaphore
# semPush(2)
# semPull(0)
#
#
#
#
