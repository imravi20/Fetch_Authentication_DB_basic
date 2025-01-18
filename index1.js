const mongoose = require("mongoose");
mongoose.connect("mongodb://127.0.0.1:27017/test");

const Cat = mongoose.model("Cat", { name: String });

const kitty = new Cat({ name: "Zildjian" });
kitty.save().then(() => console.log("meow"));

/*const mongoose = require("mongoose");
mongoose.connect(
  "mongodb+srv://user:user@cluster0.obafnmt.mongodb.net/Cohort2?retryWrites=true&w=majority"   //not working -url
);

const User = mongoose.model("User", { name: String });
const user = new User({ name: "Rabi" });
user.save().then(() => console.log("meow"));
*/
