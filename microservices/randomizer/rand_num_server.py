import zmq
import random

random.seed()

context = zmq.Context()
socket = context.socket(zmq.REP)
socket.bind("tcp://*:8721")

def is_number(input):
    try:
        number = float(input)
        if number <= 0:
            return False
        else:
            return True
    except ValueError:
        return False

while True:
    message = socket.recv()
    if message:
        if is_number(message):
            range = int(float(message))
            rand_num = random.randint(1, range)
            num_to_str = bytes(str(rand_num), 'utf-8')
            socket.send(num_to_str)
        else:
            socket.send(b"error")
    else:
        rand_num = random.randint(1, 100000)
        num_to_str = bytes(str(rand_num), 'utf-8')
        socket.send(num_to_str)
context.destroy()
