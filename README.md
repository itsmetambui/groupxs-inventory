# GroupXS test - with React / Typescript / Redux

- This project is host at: [groupxs.netlify.com](groupxs.netlify.com)
- Below is the main points that'll help reviewers to better go through the project 👍.

### It was bootstrapped with [Create React App](https://github.com/facebook/create-react-app) and uses:

[Typescript](https://github.com/microsoft/TypeScript) because it's 2020  
[React Router](https://github.com/ReactTraining/react-router) to handle client side routing  
[Redux](https://github.com/reduxjs/react-redux) to handle State Management, with [Redux-thunk](https://github.com/reduxjs/redux-thunk) middleware for async stuff  
[Redux-toolkit](https://redux-toolkit.js.org/) to reduce Redux boilerplate  
[Ant Design](https://github.com/ant-design/ant-design) for its very complete set of components  
[Styled Components](https://github.com/styled-components/styled-components) to extend Ant's default component styling  
[TailwindCSS](https://github.com/tailwindcss/tailwindcss) to elegantly handle the rest of your app's UI  
[Axios](https://github.com/axios/axios) as a proper Http client  
[Prettier](https://github.com/prettier/prettier) because it's just too helpful

### Features I've implemented:

- Add new material with type, price, unit, and barcode.
- Update a material
- Delete a material
- Checkin an amount of material to an inventory.
- Checkout an amount of material out of an inventory.
- Get all available materials: This is actually stored in localstorage with redux-persist. And this can be done with an action with redux-thunk in production.

## Features I haven't implemented:
Following features are missing since I didn’t think of multiple inventories beforehand (thank you Nicolai for cleared that up).

- Add new inventory with its name, nominal/min/max stock.
- Get all inventories.
- Update an inventory information (name, nominal/min/max stock)
- Delete an inventory.
- Transfer material’s stock between inventory.
- Validation and confirmation.

## Propose solution:
- Introducing a new slice to the redux store, called inventories, and it stores an object represent all the inventories (normalized from an array).
```typescript
type Material = {
  price: number
  type: string
  unit: string
  barCode: string
}

type Inventory = {
  id: string,
  name: string,
  nominal: number,
  min: number,
  max: number,
  materials: Material[]
}

type Inventories = {
  [key: string]: Inventory
}
```
- A create inventory button, that show a modal with inputs to create new inventory. When submit will dispatch an action with thunk middleware and add key value pair to above object.
- Display all managed inventories in a table, and display support actions for each row.
- Edit/Delete an inventory can be implemented by dispatch an action to update/remove the key from above object.
- Add a select box to select focused inventory, detail information and its stocked materials will be display in another table.
- Add a new button called Transfer to each row, when clicked, show an input to enter the amount to transfer and a select box to choose what inventory should be transfered to.
- When submit, dispatch an action to query for the material in each inventory and update the stock accordingly. In addition to this, we can normalize the materials properties for faster query.
- Should add validation for inventory's min, max, nominal when transfering, checkin, or checkout.

Please comment if I missed any required features.

### That's it, thank you for reading, happy hacking 🎉

