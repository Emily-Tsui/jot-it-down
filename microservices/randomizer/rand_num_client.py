import zmq

context = zmq.Context()

amount = 0
socket = context.socket(zmq.REQ)
socket.connect("tcp://localhost:8721")

#This lets you try the Microservice 6 times.
while amount < 6:
    user_input = input("What is the range of the number: ")
    to_send = bytes(user_input, 'utf-8')

    socket.send(to_send)

    message = socket.recv()

    try: 
        int(message)
        print(f"{int(message)}")
    except ValueError:
        print("Error from input received")
    
    amount += 1