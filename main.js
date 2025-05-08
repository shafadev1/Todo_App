document.addEventListener('DOMContentLoaded', () => {
    const nameInput = document.getElementById('name');
    const newTodoForm = document.getElementById('new-todo-form');
    const todoList = document.getElementById('todo-list');

    let todos = JSON.parse(localStorage.getItem('todos')) || [];

    const saveTodos = () => {
        localStorage.setItem('todos', JSON.stringify(todos));
    };

    const displayTodos = () => {
        todoList.innerHTML = '';

        todos.forEach((todo, index) => {
            const todoItem = document.createElement('div');
            todoItem.classList.add('todo-item');
            if (todo.done) todoItem.classList.add('done');

            const label = document.createElement('label');
            const input = document.createElement('input');
            const span = document.createElement('span');
            const content = document.createElement('div');
            const actions = document.createElement('div');
            const edit = document.createElement('button');
            const deleteBtn = document.createElement('button');

            input.type = 'checkbox';
            input.checked = todo.done;

            span.classList.add('bubble');
            if (todo.category === 'personal') {
                span.classList.add('personal');
            } else {
                span.classList.add('business');
            }

            content.classList.add('todo-content');
            content.innerHTML = `<input type="text" value="${todo.content}" readonly />`;

            actions.classList.add('actions');
            edit.classList.add('edit');
            deleteBtn.classList.add('delete');

            edit.textContent = 'Edit';
            deleteBtn.textContent = 'Delete';

            label.appendChild(input);
            label.appendChild(span);
            todoItem.appendChild(label);
            todoItem.appendChild(content);
            todoItem.appendChild(actions);

            actions.appendChild(edit);
            actions.appendChild(deleteBtn);

            todoList.appendChild(todoItem);

            // Checkbox event
            input.addEventListener('change', () => {
                todo.done = input.checked;
                saveTodos();
                displayTodos();
            });

            // Edit event
            edit.addEventListener('click', () => {
                const input = content.querySelector('input');
                input.removeAttribute('readonly');
                input.focus();

                input.addEventListener('blur', () => {
                    input.setAttribute('readonly', true);
                    todo.content = input.value;
                    saveTodos();
                    displayTodos();
                });
            });

            // Delete event
            deleteBtn.addEventListener('click', () => {
                todos.splice(index, 1);
                saveTodos();
                displayTodos();
            });
        });
    };

    // Tambah todo baru
    newTodoForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const todo = {
            content: e.target.elements.content.value,
            category: e.target.elements.category.value,
            done: false,
            createdAt: new Date().getTime(),
        };

        if (todo.content.trim() === '') return;

        todos.push(todo);
        saveTodos();

        e.target.reset();
        displayTodos();
    });

    // Simpan nama ke localStorage
    nameInput.value = localStorage.getItem('name') || '';
    nameInput.addEventListener('change', (e) => {
        localStorage.setItem('name', e.target.value);
    });

    // Tampilkan todos saat load
    displayTodos();
});
