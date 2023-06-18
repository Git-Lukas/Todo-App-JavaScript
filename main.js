const form = document.querySelector('#form')
const input_text = document.querySelector('#input-text')

const card_todo = document.querySelector('.card-todo')
const template_todo = document.querySelector('#template-todo')

const counter_task = document.querySelector('.counter-task')

let inputs = []

document.addEventListener('click', e => {

    /*==========  CHECK/UNCHECK(markup a task)  ==========*/        
    if(e.target.matches(".template-check")) {
        if(e.target.dataset.check) {

            if(e.target.classList.toggle('checked')) {

                e.target.parentNode.lastElementChild.style.textDecoration = 'line-through'
                inputs = inputs.filter(input => input.id !== e.target.dataset.check)
                counter_task.textContent = `${inputs.length} tasks left`

            }else {

                e.target.parentNode.lastElementChild.style.textDecoration = 'none'
                const arr = JSON.parse(localStorage.getItem('inputs'))
                arr.forEach(item => {
                    if(item.id === e.target.dataset.check) {
                       inputs.push(item)
                    }
                })
                counter_task.textContent = `${inputs.length} tasks left`
                
            }
        }
        return
        
    }

    /*==========  BUTTON(remove a task)  ==========*/
    if(e.target.matches(".close-task-btn")) {
        if(e.target.dataset.close) {

            inputs = inputs.filter(input => input.id !== e.target.dataset.close)
            showTodo()
            
        }
        return
    }

    /*==========  BUTTON(clear completed)  ==========*/
    if(e.target.matches(".clear-btn")) {
        
        inputs = []
        showTodo()

    }

})


document.addEventListener('DOMContentLoaded', e => {

    if(JSON.parse(localStorage.getItem('inputs'))){
        inputs = JSON.parse(localStorage.getItem('inputs'))
        showTodo()
    }
})


form.addEventListener('submit', e => {
    e.preventDefault()

    const input = {
        task: input_text.value,
        id: `${Date.now()}`
    }
    
    if(!input.task.trim()){
        alert('Add a valid task')
        return
    }

    inputs.push(input)
    input_text.value=''

    showTodo()    

})

const showTodo = () => {
    localStorage.setItem('inputs', JSON.stringify(inputs))
    card_todo.textContent = ""
    const fragment = document.createDocumentFragment()

    inputs.forEach(input =>{
        const clone = template_todo.content.cloneNode(true)

        clone.querySelector('.template-task').textContent = input.task
        clone.querySelector('.template-check').dataset.check = input.id
        clone.querySelector('.close-task-btn').dataset.close = input.id

        fragment.appendChild(clone)
    })
    card_todo.appendChild(fragment)
    counter_task.textContent = `${inputs.length} tasks left`
}







