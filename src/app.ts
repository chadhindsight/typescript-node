import express, { Application, Request, Response, NextFunction } from "express";
import { Person, getNextIdFromCollection } from "./idHelpder";

const PORT = 4000;

// Dummy data
const data: Person[] = [
    {
        name: "Marc",
        age: 45,
        id: 1
    },
    {
        name: "Matthew",
        age: 23,
        id: 2
    },
    {
        name: "Cole",
        age: 32,
        id: 3
    },
    {
        name: "Melony",
        age: 39,
        id: 4
    }
];

// Specify the type of express thing being used
const app: Application = express();

app.use(express.json());

app.get('/', (req: Request, res: Response, next: NextFunction) => {
    res.send(data);
})

app.get("/:id", (req, res) => {
    //ID we're looking for parsed from our URL parameter, with base 10
    const personID = parseInt(req.params.id, 10);
    // For every 'person' in 'data', only return the person whose ID matches parameter
    const specificPerson = data.find(person => person.id === personID);
    // Respond with our specific person with the correct ID
    res.send(specificPerson);
})

// "put" handler, to replace entire section of data without updating
app.put("/:id", (req, res) => {
    const personID = parseInt(req.params.id, 10);

    console.log(`Current ID is ${personID}`);
    const personIndex = data.findIndex(person => person.id === personID);
    const newPerson = {
        ...req.body,
        id: personID
    }
    // set the entry at this specific index to be newPerson
    data[personIndex] = newPerson;
    res.send(newPerson);
})

// create a new entry
app.post("/", (req: Request, res: Response) => {
    const newEntry = {
        ...req.body,
        id: getNextIdFromCollection(data)
    }
    data.push(newEntry);
    // Respond with the new entry
    res.send(newEntry)

})

// Delete entry
app.delete("/:id", (req, res) => {
    // Get ID, find index
    const personID = parseInt(req.params.id, 10);
    const personIndex = data.findIndex(person => person.id === personID);

    data.splice(personIndex, 1);
    // Message send
    res.send({ message: "Person Deleted Successfully!" });
})

app.listen(PORT, () => console.log(`Server bussin on port ${PORT}`));