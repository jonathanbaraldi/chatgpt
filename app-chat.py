import os
import sys

class TodoList:
    def __init__(self):
        self.tasks = []

    def add_task(self, task):
        self.tasks.append(task)

    def remove_task(self, index):
        self.tasks.pop(index)

    def list_tasks(self):
        for index, task in enumerate(self.tasks):
            print(f"{index + 1}. {task}")

def print_usage():
    print("Uso:")
    print("  python todo.py add 'Tarefa'")
    print("  python todo.py remove 'Índice'")
    print("  python todo.py list")

def main():
    if len(sys.argv) < 2:
        print_usage()
        return

    todo_list = TodoList()
    command = sys.argv[1].lower()

    if command == "add":
        if len(sys.argv) < 3:
            print("Por favor, insira uma tarefa.")
            return
        task = sys.argv[2]
        todo_list.add_task(task)
        print(f"Tarefa adicionada: '{task}'")
    elif command == "remove":
        if len(sys.argv) < 3:
            print("Por favor, insira o índice da tarefa a ser removida.")
            return
        try:
            index = int(sys.argv[2]) - 1
            if index < 0 or index >= len(todo_list.tasks):
                raise ValueError
        except ValueError:
            print("Índice inválido.")
            return
        task = todo_list.tasks[index]
        todo_list.remove_task(index)
        print(f"Tarefa removida: '{task}'")
    elif command == "list":
        if not todo_list.tasks:
            print("Nenhuma tarefa na lista.")
        else:
            todo_list.list_tasks()
    else:
        print_usage()

if __name__ == "__main__":
    main()
