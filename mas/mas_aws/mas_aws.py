import openai

openai.api_key = ""

class Agent1:
    def receive_demand(self, demand: str):
        prompt = f"Generate specifications for yourself to solve the demand: {demand}"
        response = openai.Completion.create(engine="text-davinci-003", prompt=prompt, max_tokens=300, n=1, stop=None, temperature=0.7)

        specifications = response.choices[0].text.strip()
        print("Agent 1: Specifications generated.")
        return specifications

class Agent2:
    def generate_code(self, specifications):
        prompt = f"Please, generate the HTML of your answer to be saved. I have this demand related to AWS, can you help to understand and how to fix? please generate the AWS-CLI or another kind of code to solve the problem: {specifications}"
        response = openai.Completion.create(engine="text-davinci-003", prompt=prompt, max_tokens=2000, n=1, stop=None, temperature=0.7)

        code = response.choices[0].text.strip()
        print("Agent 2: Webpage code generated.")
        return code

class Agent3:
    def save_code(self, code, directory):
        with open(f"{directory}/webpage.html", "w") as file:
            file.write(code)
        print("Agent 3: Saved code.")

class MASController:
    def __init__(self, agent1, agent2, agent3):
        self.agent1 = agent1
        self.agent2 = agent2
        self.agent3 = agent3

    def create_webpage(self, demand, output_directory):
        specifications = self.agent1.receive_demand(demand)
        code = self.agent2.generate_code(specifications)
        self.agent3.save_code(code, output_directory)

def main():
    agent1 = Agent1()
    agent2 = Agent2()
    agent3 = Agent3()

    controller = MASController(agent1, agent2, agent3)


    demand = "TICKET-456. My application JONJONES running inside my ec2 instance-id xas12445 in us-east-1, has problems with performance, like page very slow to load, things like that, what we can do?"

    output_directory = "/Library/WebServer/Documents/chatgpt/mas/mas_aws"

    controller.create_webpage(demand, output_directory)
    print(f"Webpage code saved to {output_directory}/webpage.html")

if __name__ == "__main__":
    main()
