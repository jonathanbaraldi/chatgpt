import openai

openai.api_key = ""

class Agent1:
    def receive_demand(self, demand: str):
        print("Agent 1: Processing demand...")
        prompt = f"Generate specifications for a webpage based on the following demand: {demand}"
        response = openai.Completion.create(engine="text-davinci-003", prompt=prompt, max_tokens=500, n=1, stop=None, temperature=0.7)

        specifications = response.choices[0].text.strip()
        print("Agent 1: Specifications generated.")
        return specifications

class Agent2:
    def generate_code(self, specifications):
        print("Agent 2: Generating webpage code...")
        prompt = f"Generate HTML, CSS, and JavaScript code for a webpage based on the following specifications: {specifications}"
        response = openai.Completion.create(engine="text-davinci-003", prompt=prompt, max_tokens=3500, n=1, stop=None, temperature=0.7)

        code = response.choices[0].text.strip()
        print(code)
        print("Agent 2: Webpage code generated.")
        return code

class Agent3:
    def validate_code(self, code):
        print("Agent 3: Validating code...")
        # Add your validation logic here
        # Return True if the code is valid, otherwise False
        # This is a simple example that checks if the HTML, CSS, and JavaScript code is not empty
        is_valid = bool(code.strip())
        if not is_valid:
            print("Agent 3: Invalid code. Returning to Agent 1...")
        else:
            print("Agent 3: Code validated.")

        return is_valid

class Agent4:
    def save_code(self, code, directory):
        print("Agent 4: Saving webpage code...")
        with open(f"{directory}/webpage.html", "w") as file:
            file.write(code)
        print(f"Agent 4: Webpage code saved to {directory}/webpage.html")

class Agent5:
    def generate_history(self, demand, specifications, code, is_valid):
        print("Agent 5: Generating history...")
        history = f"Demand: {demand}\nSpecifications: {specifications}\nCode: {code}\nIsValid: {is_valid}"
        print("Agent 5: History generated.")
        return history

    def save_history(self, history, directory):
        print("Agent 5: Saving history...")
        with open(f"{directory}/history.txt", "a") as file:
            file.write(history + "\n\n")
        print(f"Agent 5: History saved to {directory}/history.txt")

class MASController:
    def __init__(self, agent1, agent2, agent3, agent4, agent5):
        self.agent1 = agent1
        self.agent2 = agent2
        self.agent3 = agent3
        self.agent4 = agent4
        self.agent5 = agent5

    def create_webpage_and_save(self, demand, output_directory):
        specifications = self.agent1.receive_demand(demand)
        code = self.agent2.generate_code(specifications)

        is_valid = self.agent3.validate_code(code)
        while not is_valid:
            specifications = self.agent1.receive_demand(demand)
            code = self.agent2.generate_code(specifications)
            is_valid = self.agent3.validate_code(code)

        self.agent4.save_code(code, output_directory)
        history = self.agent5.generate_history(demand, specifications, code, is_valid)
        self.agent5.save_history(history, output_directory)

       
def main():
    agent1 = Agent1()
    agent2 = Agent2()
    agent3 = Agent3()
    agent4 = Agent4()
    agent5 = Agent5()

    controller = MASController(agent1, agent2, agent3, agent4, agent5)

    demand = "Create a webpage for my customer with a responsive, functional and beautiful calculator"
    output_directory = "/Library/WebServer/Documents/chatgpt/mas/mas_page/improved2"

    controller.create_webpage_and_save(demand, output_directory)
    print("All tasks completed!")

if __name__ == "__main__":
    main()
