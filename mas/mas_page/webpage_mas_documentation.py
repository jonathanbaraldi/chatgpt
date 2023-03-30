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
        print("Agent 2: Webpage code generated.")
        return code

class Agent3:
    def save_code(self, code, directory):
        print("Agent 3: Saving webpage code...")
        with open(f"{directory}/webpage_doc.html", "w") as file:
            file.write(code)
        print(f"Agent 3: Webpage code saved to {directory}/webpage.html")

class Agent4:
    def generate_documentation(self, specifications):
        print("Agent 4: Generating documentation...")
        prompt = f"Create a brief documentation in Markdown format for a webpage based on the following specifications: {specifications}"
        response = openai.Completion.create(engine="text-davinci-003", prompt=prompt, max_tokens=3500, n=1, stop=None, temperature=0.7)

        documentation = response.choices[0].text.strip()
        print("Agent 4: Documentation generated.")
        return documentation

    def save_documentation(self, documentation, directory):
        print("Agent 4: Saving documentation...")
        with open(f"{directory}/webpage_README.md", "w") as file:
            file.write(documentation)
        print(f"Agent 4: Documentation saved to {directory}/README.md")

class MASController:
    def __init__(self, agent1, agent2, agent3, agent4):
        self.agent1 = agent1
        self.agent2 = agent2
        self.agent3 = agent3
        self.agent4 = agent4

    def create_webpage_and_documentation(self, demand, output_directory):
        specifications = self.agent1.receive_demand(demand)
        code = self.agent2.generate_code(specifications)
        self.agent3.save_code(code, output_directory)

        documentation = self.agent4.generate_documentation(specifications)
        self.agent4.save_documentation(documentation, output_directory)

def main():
    agent1 = Agent1()
    agent2 = Agent2()
    agent3 = Agent3()
    agent4 = Agent4()

    controller = MASController(agent1, agent2, agent3, agent4)

    demand = "Create a webpage for my customer with a contact form"
    # demand = "Create a webpage for my customer with a responsive design and a contact form."
    output_directory = "/Library/WebServer/Documents/chatgpt/mas/mas_page"

    controller.create_webpage_and_documentation(demand, output_directory)
    print("All tasks completed!")

if __name__ == "__main__":
    main()