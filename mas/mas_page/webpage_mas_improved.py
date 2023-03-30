import openai

openai.api_key = ""

class Agent1:
    def receive_demand(self, demand: str):
        print("Agent 1: Processing demand...")
        prompt = f"Generate specifications for a webpage based on the following demand: {demand}"
        response = openai.Completion.create(engine="text-davinci-003", prompt=prompt, max_tokens=100, n=1, stop=None, temperature=0.7)

        specifications = response.choices[0].text.strip()
        print("Agent 1: Specifications generated.")
        return specifications

class Agent2:
    def generate_code(self, specifications):
        print("Agent 2: Generating webpage code...")
        prompt = f"Generate HTML, CSS, and JavaScript code for a webpage based on the following specifications: {specifications}"
        response = openai.Completion.create(engine="text-davinci-003", prompt=prompt, max_tokens=2000, n=1, stop=None, temperature=0.7)

        code = response.choices[0].text.strip()
        print("Agent 2: Webpage code generated.")
        return code

class Agent3:
    def save_code(self, code, directory):
        print("Agent 3: Saving webpage code...")
        html_code, css_code, js_code = self._split_code(code)

        with open(f"{directory}/index.html", "w") as file:
            file.write(html_code)
        print(f"Agent 3: HTML code saved to {directory}/index.html")

        with open(f"{directory}/style.css", "w") as file:
            file.write(css_code)
        print(f"Agent 3: CSS code saved to {directory}/style.css")

        with open(f"{directory}/script.js", "w") as file:
            file.write(js_code)
        print(f"Agent 3: JavaScript code saved to {directory}/script.js")

    def _split_code(self, code):
        html_code = ""
        css_code = ""
        js_code = ""

        code_lines = code.split("\n")
        current_section = ""

        for line in code_lines:
            if "<!-- HTML -->" in line:
                current_section = "html"
            elif "<!-- CSS -->" in line:
                current_section = "css"
            elif "<!-- JavaScript -->" in line:
                current_section = "js"
            else:
                if current_section == "html":
                    html_code += line + "\n"
                elif current_section == "css":
                    css_code += line + "\n"
                elif current_section == "js":
                    js_code += line + "\n"

        return html_code, css_code, js_code

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

    demand = "Create a webpage for my customer with a responsive design and a contact form."
    output_directory = "/Library/WebServer/Documents/chatgpt/mas/mas_page/improved"

    controller.create_webpage(demand, output_directory)
    print("All tasks completed!")

if __name__ == "__main__":
    main()
