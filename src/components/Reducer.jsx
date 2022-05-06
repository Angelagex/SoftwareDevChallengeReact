function reducer(state, action) {
  switch (action.type) {
    case "get-modules":
      const stateWithAllModules = {
        ...state,
        listOfModules: action.payload,
      };
      return stateWithAllModules;
    case "get-tasks":
      const stateWithAllTasks = {
        ...state,
        listOfTasks: action.payload,
      };
      return stateWithAllTasks;
    case "add-module":
      const newModule = action.payload;
      const newListofModules = [...state.listOfModules, newModule];

      const newStateOfModules = {
        ...state,
        listOfModules: newListofModules,
      };
      return newStateOfModules;
    case "add-task":
      const newTask = action.payload;
      const newListofTasks = [...state.listOfTasks, newTask];

      const newStateOfTasks = {
        ...state,
        listOfTasks: newListofTasks,
      };
      return newStateOfTasks;
    case "remove-module":
      const newListOfModulesWithoutPayloadModule = state.listOfModules.filter(
        (module) => module.id !== action.payload.id
      );
      const newStateWithModuleDeleted = {
        ...state,
        listOfModules: newListOfModulesWithoutPayloadModule,
      };
      return newStateWithModuleDeleted;
    case "remove-task":
      const newListOfTasksWithoutPayloadTask = state.listOfTasks.filter(
        (task) => task.id !== action.payload.id
      );
      const newStateWithTaskDeleted = {
        ...state,
        listOfTasks: newListOfTasksWithoutPayloadTask,
      };
      return newStateWithTaskDeleted;
    case "update-module":
      const newListOfModule = state.listOfModule.map((module) =>
        module.id === action.payload.id ? action.payload : module
      );
      const newListOfModuleChanged = {
        ...state,
        listOfModule: newListOfModule,
      };
      return newListOfModuleChanged;
    case "update-task":
      const newListOfTasks = state.listOfTasks.map((task) =>
        task.id === action.payload.id ? action.payload : task
      );
      const newListOfTaskChanged = {
        ...state,
        listOfTask: newListOfTasks,
      };
      return newListOfTaskChanged;
  }
}

export default reducer;
