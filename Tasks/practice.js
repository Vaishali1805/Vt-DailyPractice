const users = [
  { id: 1, name: "Alice", age: 25, active: true },
  { id: 2, name: "Bob", age: 30, active: false },
  { id: 3, name: "Charlie", age: 28, active: true },
  { id: 4, name: "David", age: 22, active: false },
];

// Ques1:  Create a new array that contains only the names of the users in uppercase. 

const arr1 = users.map((user) => user.name.toUpperCase())
const arr2 = users.map(({name}) => name.toUpperCase())      //destructure a specific field in the map

// console.log("arr: ",arr1)
// console.log("arr: ",arr2)

const arr = users.map(({name, age}) => {        //destructure two or more fields using the map
    return { name, age }
})
// console.log("arr: ",arr)

// Ques2:  Create a new array containing objects with only id and name of each user. Print a message for each user

const ans = users.map(({id, name}) => {
    // console.log("message: ",`Hello ${name}`);
    return { id, name };
});
const ans2 = users.map(({id, name}) => {
    let message = `Hello ${name}`;
    return { id, name, message };
})

// console.log("ans: ",ans);
// console.log("ans2: ",ans2);

// Ques3: Print the age of each user in the format: Example: "Alice is 25 years old" 

// const ans3 = users.map(({name,age}) => console.log(`${name} is ${age} years old`));

//Ques4: Create a new array containing only the active users. 

const ans4 = users.filter((user) => user.active)
// console.log("ans4: ",ans4);

//Ques5: Create a new array containing users who are older than 25.

const ans5 = users.filter((user) => user.age>25)
// console.log("ans5: ",ans5);

//Ques6: Find the user whose name is "Charlie" and print their details.

const ans6 = users.filter((user) => user.name === "Charlie");
// console.log("ans6: ",ans6);

//Ques7: Check if at least one user is inactive.

const ans7 = users.some((user) => !user.active)
// console.log("ans7: ",ans7)

//Ques8: Check if all users are older than 20. 

const ans8 = users.every((user) => user.age > 20)
// console.log("ans8: ",ans8);

//Ques9: Create a new array of names of active users in uppercase
const ans9 = users.map(({name,active}) => {
    if(active)
        return name.toUpperCase();
}).filter(Boolean)
console.log("ans9: ",ans9)