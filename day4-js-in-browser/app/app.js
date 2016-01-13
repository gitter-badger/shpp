function App() {

    this.SHOW_ALL_FILTER = 'all';
    this.SHOW_ACTIVE_FILTER = 'active';
    this.SHOW_COMPLETED_FILTER = 'completed';

    this.filter = this.SHOW_ALL_FILTER;

    this.view = {
        body: document.querySelector('#body'),
        taskCreateForm: document.querySelector('#taskCreateForm'),
        selectAllCheckbox: document.querySelector('#selectAll'),
        newTaskField: document.querySelector('#newTaskName'),
        tasksList: document.querySelector('#tasksList'),
        remainingItems: document.querySelector('.remaining-items span'),
        removeAllCompleted: document.querySelector('.remove-all-completed'),
        filterShowAll: document.querySelector('.filter-show-all'),
        filterShowActive: document.querySelector('.filter-show-active'),
        filterShowCompleted: document.querySelector('.filter-show-completed')
    };

    this.tasks = [];

    window.addEventListener("beforeunload", this.saveData.bind(this));

    this.view.taskCreateForm.on('submit', this.onCreateFormSubmit.bind(this));
    this.view.selectAllCheckbox.on('change', this.toggleTasks.bind(this));
    this.view.removeAllCompleted.on('click', this.removeAllCompleted.bind(this));

    this.view.filterShowAll.on('click', this.showAllTasks.bind(this));
    this.view.filterShowActive.on('click', this.showActiveTasks.bind(this));
    this.view.filterShowCompleted.on('click', this.showCompletedTasks.bind(this));

    this.loadData();

    this.initRouter();

    Event.on('task:remove', this.onTaskRemoved.bind(this));
    Event.on('task:state:change', this.applyTasksFilter.bind(this));
    Event.command.on('recountRemainingItems', this.recountRemainingItems.bind(this));

    this.applyTasksFilter();
}

App.prototype.loadData = function () {
    var data = Storage.get('data');
    var self = this;
    if (data && data.forEach) {
        data.forEach(function (item) {
            self.addNewTask(item.name, item.completed);
        });
    }
};

App.prototype.saveData = function (e) {
    var data = [];
    this.tasks.forEach(function (item) {
        data.push({
            name: item.name,
            completed: item.completed
        });
    });
    Storage.set('data', data);
    console.log('saved');
    return true;
};

App.prototype.initRouter = function () {
    if (Route.path() === '/all') {
        this.filter = this.SHOW_ALL_FILTER;
    } else if (Route.path() === '/completed') {
        this.filter = this.SHOW_COMPLETED_FILTER;
    } else if (Route.path() === '/active') {
        this.filter = this.SHOW_ACTIVE_FILTER;
    }
};

App.prototype.applyTasksFilter = function () {

    this.view.filterShowAll.classList.remove('active');
    this.view.filterShowActive.classList.remove('active');
    this.view.filterShowCompleted.classList.remove('active');

    if (this.filter === this.SHOW_ALL_FILTER) {
        this.view.filterShowAll.classList.add('active');
        this.tasks.forEach(function (item) {
            item.view.me.show();
        });
    }

    if (this.filter === this.SHOW_ACTIVE_FILTER) {
        this.view.filterShowActive.classList.add('active');
        this.tasks.forEach(function (item) {
            if (!item.completed) {
                item.view.me.show();
            } else {
                item.view.me.hide();
            }
        });
    }

    if (this.filter === this.SHOW_COMPLETED_FILTER) {
        this.view.filterShowCompleted.classList.add('active');
        this.tasks.forEach(function (item) {
            if (item.completed) {
                item.view.me.show();
            } else {
                item.view.me.hide();
            }
        });
    }

};

App.prototype.showAllTasks = function () {
    this.filter = this.SHOW_ALL_FILTER;
    this.applyTasksFilter();
    Route.path('/all');
};

App.prototype.showActiveTasks = function () {
    this.filter = this.SHOW_ACTIVE_FILTER;
    this.applyTasksFilter();
    Route.path('/active');
};

App.prototype.showCompletedTasks = function () {
    this.filter = this.SHOW_COMPLETED_FILTER;
    this.applyTasksFilter();
    Route.path('/completed');
};

App.prototype.onTaskRemoved = function (task) {
    var self = this;
    this.tasks.forEach(function (item, key) {
        if (item === task) {
            self.tasks.splice(key, 1);
        }
    });
};

App.prototype.removeAllCompleted = function () {

    var self = this;

    for (var i = 0; i < self.tasks.length; i++) {
        var item = self.tasks[i];
        if (!!item.completed) {
            item.getElement().remove();
            self.tasks.splice(i, 1);
            i--;
        }
    }

};

App.prototype.recountRemainingItems = function () {
    var remainingItems = 0;

    this.tasks.forEach(function (item) {
        remainingItems += !item.completed;
    });

    this.view.remainingItems.html(remainingItems || 0);

};

App.prototype.toggleTasks = function () {

    var self = this;

    function isAllTasksSelected() {
        var isAllSelected = true;
        self.tasks.forEach(function (task) {
            if (!task.completed) {
                isAllSelected = false;
            }
        });
        return isAllSelected;
    }

    function changeAll(value) {
        self.tasks.forEach(function (task) {
            task.completed = !!value;
        });
    }

    if (
        this.view.selectAllCheckbox.checked && isAllTasksSelected() ||
        this.view.selectAllCheckbox.checked && !isAllTasksSelected()
    ) {
        changeAll(true);
    } else {
        changeAll(false);
    }

    this.applyTasksFilter();

    Event.command.execute('recountRemainingItems');

};

App.prototype.onCreateFormSubmit = function (e) {
    var name = this.view.newTaskField.val();

    if (!name) {
        return;
    }

    this.addNewTask(name);

    this.view.newTaskField.val('');

    e.preventDefault();

    return false;
};

App.prototype.addNewTask = function (name, completed) {
    var task = new Todo(name, !!completed);
    this.tasks.push(task);

    this.view.tasksList.appendNode(task.getElement());
    this.view.newTaskField.val('');

    if (this.filter === this.SHOW_COMPLETED_FILTER) {
        task.view.me.hide();
    }

    Event.command.execute('recountRemainingItems');

    //hack for checkboxes
    $('.ui.checkbox').checkbox();
};

window.onload = function () {
    new App();
};