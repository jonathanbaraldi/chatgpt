import time
from pubsub import pub

class Agent:
    def __init__(self, name):
        self.name = name
        pub.subscribe(self.receive_message, 'message_channel')

    def send_message(self, message):
        print(f"{self.name} enviou: {message}")
        pub.sendMessage('message_channel', sender=self, message=message)

    def receive_message(self, sender, message):
        if sender != self:
            print(f"{self.name} recebeu: {message}")
            self.respond(message)

    def respond(self, message):
        if message.lower() == "olá":
            self.send_message("Olá! Como posso ajudá-lo?")
        elif message.lower() == "tchau":
            self.send_message("Tchau! Até mais!")
        else:
            self.send_message("Não entendi sua mensagem. Pode repetir?")

if __name__ == "__main__":
    agent1 = Agent("Agent1")
    agent2 = Agent("Agent2")

    agent1.send_message("Olá")
    time.sleep(1)
    agent2.send_message("Tchau")
    time.sleep(1)
