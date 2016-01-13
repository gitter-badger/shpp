function Todo(name, completed) {

    this._name = name;
    this._completed = completed || false;

    Object.defineProperty(this, 'completed', {
        set: this._setCompleted,
        get: this._getCompleted
    });

    Object.defineProperty(this, 'name', {
        set: this._setName,
        get: this._getName
    });

    this.createDOMElement();

    var el = this.getElement();

    this.view = {
        me: el,
        text: el.querySelector('.text'),
        task: el.querySelector('.task'),
        remove: el.querySelector('.remove-item-btn'),
        taskName: el.querySelector('.text span'),
        textField: el.querySelector('.text-field'),
        textForm: el.querySelector('.text-field form'),
        checkbox: el.querySelector('input[type=checkbox]'),
        textFieldInput: el.querySelector('.text-field input[type=text]')
    };

    this.view.text.on('dblclick', this.enterEditMode.bind(this));
    this.view.checkbox.on('change', this.onCheckboxChange.bind(this));
    this.view.textFieldInput.on('blur', this.enterViewMode.bind(this, false));
    this.view.textForm.on('submit', this.enterViewMode.bind(this, true));
    this.view.remove.on('click', this.remove.bind(this));
}

Todo.prototype.remove = function () {
    this.getElement().remove();
    Event.emit('task:remove', this);
    Event.command.execute('recountRemainingItems');
};

Todo.prototype.enterViewMode = function (saveChanges, event) {
    if (saveChanges) {
        this.name = this.view.textFieldInput.value;
    }
    this.view.text.classList.remove('hidden');
    this.view.textField.classList.add('hidden');

    event.preventDefault();
    return false;
};

Todo.prototype.enterEditMode = function () {
    this.view.textFieldInput.value = this.name;
    this.view.text.classList.add('hidden');
    this.view.textField.classList.remove('hidden');
    this.view.textFieldInput.focus();
};

Todo.prototype._setCompleted = function (state) {
    this._completed = !!state;
    this.view.checkbox.checked = this.completed;
    if (state) {
        this.view.task.classList.add('completed');
    } else {
        this.view.task.classList.remove('completed');
    }
    Event.command.execute('recountRemainingItems');
    return state;
};
Todo.prototype._getCompleted = function () {
    return this._completed;
};

Todo.prototype._setName = function (value) {
    this._name = value;
    this.view.taskName.innerHTML = this._name;
};
Todo.prototype._getName = function () {
    return this._name;
};

Todo.prototype.onCheckboxChange = function () {
    this.completed = !!this.view.checkbox.checked;
    Event.emit('task:state:change');
};

Todo.prototype.createDOMElement = function () {
    var el = document.createElement('div');
    el.innerHTML = this.template();
    this.element = el;
};

Todo.prototype.template = function () {
    return '<div class="fields task ' + (!!this.completed ? 'completed' : '' ) + '">' +
        '<div class="one wide field my-checkbox">' +
        '<div class="ui checkbox">' +
        '<input type="checkbox" tabindex="0" class="hidden completed" ' + (!!this.completed ? 'checked="checked"' : '') + '>' +
        '<label></label>' +
        '</div>' +
        '</div>' +
        '<div class="taskname fifteen wide field">' +
        '<div class="text">' +
        '<span>' + this.name + '</span>' +
        '<i class="remove icon remove-item-btn"></i>' +
        '</div>' +
        '<div class="text-field hidden">' +
        '<form>' +
        '<input type="text" placeholder="Task Name">' +
        '</form>' +
        '</div>' +
        '</div>' +
        '</div>';
};

Todo.prototype.getElement = function () {
    return this.element;
};