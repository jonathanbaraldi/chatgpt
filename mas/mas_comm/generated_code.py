Código:

tarefas = []

def adicionar_tarefa(descricao):
    tarefas.append(descricao)

def listar_tarefas():
    for tarefa in tarefas:
        print(tarefa)

def remover_tarefa(descricao):
    tarefas.remove(descricao)