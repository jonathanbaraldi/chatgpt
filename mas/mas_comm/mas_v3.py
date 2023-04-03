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

def save_to_file(filename, content):
    with open(filename, "w") as f:
        f.write(content)

def main():
    demand = "Criar uma aplicação em Python para gerenciar uma lista de tarefas, salvando o historico da lista."

    agent1 = Agent("Validador", max_tokens=50, temperature=0.5)
    validation_result = agent1.execute(f"Validar a demanda: {demand}")
    print(f"Validação: {validation_result}")

    if "python" in validation_result.lower():
        agent2 = Agent("Codificador", max_tokens=300, temperature=0.7)
        code = agent2.execute(f"Gerar o código python: {demand}")
        print(f"\nCódigo gerado:\n{code}")

        save_to_file("generated_code.py", code)

        agent3 = Agent("Documentador", max_tokens=150, temperature=0.5)
        documentation = agent3.execute(f"Documentar o código: {code}")
        print(f"\nDocumentação:\n{documentation}")

        save_to_file("documentation.txt", documentation)
    else:
        print("A demanda não é válida para uma aplicação Python.")

if __name__ == "__main__":
    main()
