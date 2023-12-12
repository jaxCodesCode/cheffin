class IRecipe {
  constructor(id, name, description, serves, ingredients, steps) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.serves = serves;
    this.ingredients = ingredients;
    this.steps = steps;
  }
}

export default IRecipe;