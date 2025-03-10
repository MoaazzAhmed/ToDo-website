const body = document.querySelector("body")
const toggle_image = document.querySelector("#toggle-img")
const custom_check_box = document.querySelector(".input-checkbox")
const tasks_container = document.querySelector(".tasks")
const items_left = document.querySelector("#items-left")
const bg_img = document.querySelector("#bg-img")


const tasks = []
let active = []
const completed = []
let idCounter = 0

function changeTheme() {
    body.classList.toggle("light")
    toggle_image.src = (body.classList.contains("light")) ? "images/icon-moon.svg" : "images/icon-sun.svg"
    bg_img.src = (body.classList.contains("light")) ? "images/bg-desktop-light.jpg" : "images/bg-desktop-dark.jpg"
}

function checkInput() {
    custom_check_box.classList.toggle("check")
}

function renderTasks() {
    tasks_container.innerHTML = ""
    tasks.forEach(task => {
        let taskElement = document.createElement("div")
        taskElement.classList.add("task")
        taskElement.id = `${task.id}`

        taskElement.innerHTML = `
            <div class="custom-check ${task.status == "completed" ? "check" : ""}" onclick="toggleTask(${task.id})">
                <span></span>
            </div>
            <span>${task.value}</span>
            <close class="close" onclick="removeTask(${task.id})"><img src="images/icon-cross.svg"></close>
        `

        tasks_container.appendChild(taskElement)
    })
    items_left.innerHTML = tasks.filter(task => task.status == "uncompleted").length

}

function render_activeTasks() {
    tasks_container.innerHTML = ""
    active.forEach(task => {
        let taskElement = document.createElement("div")
        taskElement.classList.add("task")
        taskElement.id = `${task.id}`

        taskElement.innerHTML = `
            <div class="custom-check ${task.status == "completed" ? "check" : ""}" onclick="toggleTask(${task.id})">
                <span></span>
            </div>
            <span>${task.value}</span>
            <close class="close" onclick="removeTask(${task.id})"><img src="images/icon-cross.svg"></close>
        `

        tasks_container.appendChild(taskElement)
    })

}
function render_completedTasks() {
    tasks_container.innerHTML = ""
    completed.forEach(task => {
        let taskElement = document.createElement("div")
        taskElement.classList.add("task")
        taskElement.id = `${task.id}`

        taskElement.innerHTML = `
            <div class="custom-check ${task.status == "completed" ? "check" : ""}" onclick="toggleTask(${task.id})">
                <span></span>
            </div>
            <span>${task.value}</span>
            <close class="close" onclick="removeTask(${task.id})"><img src="images/icon-cross.svg"></close>
        `

        tasks_container.appendChild(taskElement)
    })
}

function toggleTask(taskId) {
    tasks.forEach(task => {
        if (task.id == taskId) {
            task.status = (task.status == "completed") ? "uncompleted" : "completed"
        }
    })
    renderTasks()
}

function removeTask(taskId) {
    const taskIndex = tasks.findIndex((task) => { task.id == taskId })
    tasks.splice(taskIndex, 1)
    renderTasks()
}

document.querySelector("#task-input").addEventListener("keydown", function (e) {
    if (e.key == "Enter") {
        if (this.value != "") {
            let newTask = {
                id: idCounter++,
                value: this.value,
                status: (custom_check_box.classList.contains("check")) ? "completed" : "uncompleted"
            }
            tasks.push(newTask)
            this.value = ""
            renderTasks()
        }
        else {
            alert("Fill the empty field")
        }


    }
})

function filtered_completedTasks() {
    completed.length = 0
    for (const task of tasks) {
        if (task.status == "completed")
            completed.push(task)
    }

    render_completedTasks()
}
function filtered_activeTasks() {
    active.length = 0
    for (const task of tasks) {
        if (task.status == "uncompleted")
            active.push(task)
    }

    render_activeTasks()
}

function clearCompleted() {
    active = tasks.filter(task => task.status != "completed")

    tasks.length = 0
    tasks.push(...active)
    renderTasks()
}