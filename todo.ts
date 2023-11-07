import inquirer from "inquirer";

let ToDoList: string[] =
    ["Prayer", "Jogging", "Breakfast", "University", "Lunch", "Cricket", "Homework", "Dinner", "Sleep"]

async function createTodo(ToDoList: string[]) {

    do {
        let result = await inquirer.prompt(
            {
                message: "Select an operation",
                type: "list",
                name: "operationList",
                choices: ["View To Do List", "Add Task", "Edit Task", "Delete Task"]
            })
        if (result.operationList == "View To Do List") {
            console.log(ToDoList)
        }


        if (result.operationList == "Add Task") {
            let addTask = await inquirer.prompt(
                {
                    message: "Enter task to add",
                    type: "input",
                    name: "add"
                }
            )
            ToDoList.push(addTask.add)
            console.log(ToDoList)
        }


        if (result.operationList == "Delete Task") {
            let deleteToDo = await inquirer.prompt(
                {
                    message: "Select item to edit",
                    type: "list",
                    name: "deleteTask",
                    choices: ToDoList.map(items => items)
                })

            let confirmDel = await inquirer.prompt(
                {
                    message: "Are you sure you want to delete?",
                    type: "list",
                    name: "confirmationDel",
                    choices: ["Yes", "No"]
                })

            let NonChangeDel = ToDoList
            let deletedList = ToDoList.filter(val => val !== deleteToDo.deleteTask)
            ToDoList = [...deletedList]
            if (confirmDel.confirmationDel == "Yes") { console.log(ToDoList) }
            else { console.log(NonChangeDel) }
        }


        if (result.operationList == "Edit Task") {
            let newToDo = await inquirer.prompt(
                {
                    message: "Select item to edit",
                    type: "list",
                    name: "SelectforEdit",
                    choices: ToDoList.map(items => items)
                })
            let editTask = await inquirer.prompt(
                {
                    message: "Make your changes",
                    type: "input",
                    name: "changes"
                })

            let editedTodo = ToDoList.filter(val => val !== newToDo.SelectforEdit)
            ToDoList = [...editedTodo, editTask.changes]
            console.log(ToDoList)
        }
    } while (true)
}

createTodo(ToDoList)