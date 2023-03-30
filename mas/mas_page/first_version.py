import openai

openai.api_key = "your_openai_api_key"

class Agent1:
    def receive_demand(self, demand: str):
        # Use GPT-4 to process the demand and generate specifications
        # Return specifications for Agent 2

class Agent2:
    def generate_code(self, specifications):
        # Use GPT-4 to generate the HTML, CSS, and JavaScript code based on specifications
        # Return the generated code for Agent 3

class Agent3:
    def save_code(self, code, directory):
        # Save the generated code in the specified directory
