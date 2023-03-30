import random
import matplotlib.pyplot as plt
import matplotlib.patches as patches


class Agent:
    def __init__(self, x, y):
        self.x = x
        self.y = y

    def decide(self, environment):
        # Move randomly in the environment
        dx = random.choice([-1, 0, 1])
        dy = random.choice([-1, 0, 1])

        new_x = self.x + dx
        new_y = self.y + dy

        if 0 <= new_x < environment.width and 0 <= new_y < environment.height:
            self.x, self.y = new_x, new_y

    def communicate(self, other_agent):
        # Implement communication between agents
        pass


class Environment:
    def __init__(self, width, height):
        self.width = width
        self.height = height
        self.agents = []

    def add_agent(self, agent):
        self.agents.append(agent)

    def update(self):
        # Update the state of the environment and the agents
        for agent in self.agents:
            agent.decide(self)

    def display(self):
        fig, ax = plt.subplots()
        ax.set_xlim(0, self.width)
        ax.set_ylim(0, self.height)

        for agent in self.agents:
            circle = patches.Circle((agent.x + 0.5, agent.y + 0.5), radius=0.4, edgecolor='black', facecolor='blue')
            ax.add_patch(circle)

        plt.grid(True)
        plt.gca().set_aspect('equal', adjustable='box')
        plt.show()


def main():
    environment = Environment(10, 10)

    agent1 = Agent(0, 0)
    agent2 = Agent(1, 1)
    agent3 = Agent(2, 2)

    environment.add_agent(agent1)
    environment.add_agent(agent2)
    environment.add_agent(agent3)

    for i in range(5):
        environment.update()
        environment.display()


if __name__ == "__main__":
    main()
