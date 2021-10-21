export const getTodos = key => {

    const value = localStorage.getItem(key);
    let todoItems = [];

    try {
      const parsedJSON = JSON.parse(value);
      if (Array.isArray(parsedJSON)) {
        todoItems = parsedJSON;
      }
    } catch(e) {
      console.log(e)
    }

    return todoItems;
  }

  export const saveTodos = (key, data) =>  localStorage.setItem(key, JSON.stringify(data))