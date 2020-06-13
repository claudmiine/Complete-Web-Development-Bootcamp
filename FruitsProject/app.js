const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/fruitsDB", { useNewUrlParser: true , useUnifiedTopology: true });


const fruitSchema = new mongoose.Schema ({
    name: {
        type: String,
        required: [true, "Please, insert a name."]
    },
    rating: {
        type:Number,
        min: 1,
        max: 10
    },
    review: String
});

const Fruit = mongoose.model("Fruit", fruitSchema);

const fruit = new Fruit ({
        score: 7,
        review :"Pretty peaches!!"
});

//fruit.save();



const personSchema = new mongoose.Schema({
    name: String,
    age: Number,
    favouriteFruit: fruitSchema
});

const Person = mongoose.model("Person", personSchema);

const awokado = new Fruit({
    name:"Awokado",
    score: 9,
    review: "Yummy fruit!"
})
awokado.save();

/*const person = new Person ({
    name: "John",
    age: 32,
    favouriteFruit: awokado
});*/

//person.save();
/*
const kiwi = new Fruit({
    name: "Kiwi",
    score: 10,
    review: "Best fruit!"
});
const banana = new Fruit({ 
    name: "Banana",
    score: 7,
    review: "Lovely fruit!"
});

Fruit.insertMany( [kiwi, banana] , function(err) {
    if (err) {
        console.log(err);
    } else {
        console.log("Succesfully saved all the fruits.");
    }
});
   */
Fruit.find(function(err, fruits) {
    if (err) {
        console.log(err);
    } else {
        mongoose.connection.close();   //automatically closing connection.

        fruits.forEach(function(fruit) {
            console.log(fruit.name);
        })
    }
});

Person.updateOne({ name: "John"}, {favouriteFruit: awokado}, function(err) {
    if (err) {
        console.log(err)
    } else {
        console.log("Succesfully updated the document!")
    }

})

Fruit.deleteMany({_id: {
$in:[
    "5ee3f39cf3536d11816d2ea0",
    "5ee3f3b6c26c2211877b44d4",
]
 }}, function (err, result){
     if (err){
        console.log(err)
     } else {
         console.log(result)
     }
 })
 
/*Person.deleteMany({name: {
    $in:[
        "John"
    ]
     }}, function (err){
         if (err){
            console.log(err)
         } else {
             console.log("Succesfully deleted all documents!")
         }
     })
     */