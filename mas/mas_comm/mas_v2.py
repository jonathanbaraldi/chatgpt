import openai

# Substitua "your_api_key" pela sua chave API real
openai.api_key = ""

class Agent:
    def __init__(self, role, max_tokens, temperature):
        self.role = role
        self.max_tokens = max_tokens
        self.temperature = temperature

    def execute(self, task):
        response = openai.Completion.create(
            engine="text-davinci-002",
            prompt=f"Eu sou um agente {self.role}. {task}",
            max_tokens=self.max_tokens,
            n=1,
            stop=None,
            temperature=self.temperature,
        )
        return response.choices[0].text.strip()

def main():
    demand = "Script python que gerencie uma lista de tarefas e salve a lista localmente "

    agent1 = Agent("Validador", max_tokens=50, temperature=0.5)
    validation_result = agent1.execute(f"Validar a demanda: {demand}")

    if "valida" in validation_result.lower():
        agent2 = Agent("Codificador", max_tokens=300, temperature=0.7)
        code = agent2.execute(f"Crie os arquivos python para atender a demanda e salve localmente com o nom de task1.py : {demand}")

        agent3 = Agent("Documentador", max_tokens=150, temperature=0.5)
        documentation = agent3.execute(f"Documentar o código e salver em readme_task.md: {code}")

        print("Código gerado:")
        print(code)
        print("\nDocumentação:")
        print(documentation)
    else:
        print("A demanda não é válida para uma aplicação Python.")

if __name__ == "__main__":
    main()
