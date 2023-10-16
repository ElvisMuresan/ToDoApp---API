const passport = require("passport");
const ToDoModel = require("./models/ToDoModel");
const UserModel = require("./models/UserModel");
const debug = require("debug")("app");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

module.exports.getToDo = async (req, res) => {
  const toDo = await ToDoModel.find();
  res.send(toDo);
};

module.exports.logout = async (req, res) => {
  req.logout((err) => {
    if (err) {
      console.error("Eroare la deconectare:", err);
      return res.status(500).json({ error: "Eroare la deconectare" });
    }
    res.redirect("/");
    debug("utilizator deconectat cu succes");
  });
};

module.exports.saveToDo = async (req, res) => {
  const { position, title, description, checked } = req.body;
  ToDoModel.create({ position, title, description, checked }).then((data) => {
    debug(`Added Successfully...`);
    debug(data);
    res.send(data);
  });
};

function generateToken(user) {
  return jwt.sign({ userId: user._id }, "your-secret-key", {
    expiresIn: "1h",
  });
}

module.exports.loginAuth = async (req, res) => {
  const { email, password } = req.body;
  const user = await UserModel.findOne({ email });

  if (!user || !(await user.comparePassword(password))) {
    return res.status(401).json({ error: "Invalid credentials" });
  }

  const token = generateToken(user);
  res.json({ token });
};

module.exports.signUpAuth = async (req, res) => {
  const { email, password } = req.body;
  const existingUser = await UserModel.findOne({ email });
  if (existingUser) {
    return res.status(400).json({ error: "User already exists" });
  }

  // Hash parola înainte de a o stoca
  const hashedPassword = await bcrypt.hash(password, 10);

  // Creează un nou utilizator în baza de date
  const newUser = new UserModel({ email, password: hashedPassword });
  await newUser.save();

  // Generează un token JWT pentru autentificare
  const token = generateToken(newUser);
  res.json({ token });
};

module.exports.updateToDo = async (req, res) => {
  const { _id } = req.params;
  const { title, description } = req.body;
  ToDoModel.findByIdAndUpdate(_id, { title, description })
    .then(() => res.send("Updated Susscesfully..."))
    .catch((err) => debug(err));
};

module.exports.checkToDo = async (req, res) => {
  const { _id } = req.params;
  const { checked } = req.body;
  ToDoModel.findByIdAndUpdate(_id, { checked })
    .then(() => res.send("Updated Susscesfully..."))
    .catch((err) => debug(err));
};

module.exports.moveUpToDo = async (req, res) => {
  const { _id } = req.params;
  const currentToDo = await ToDoModel.findById(_id);
  const aboveToDo = await ToDoModel.findOne({
    position: currentToDo.position - 1,
  });

  if (aboveToDo) {
    const tempTitle = currentToDo.title;
    const tempDescription = currentToDo.description;

    currentToDo.title = aboveToDo.title;
    currentToDo.description = aboveToDo.description;

    aboveToDo.title = tempTitle;
    aboveToDo.description = tempDescription;

    await currentToDo.save();
    await aboveToDo.save();
  }
  res.send("Moved Up Successfully...");
};

module.exports.moveDownToDo = async (req, res) => {
  const { _id } = req.params;
  const currentToDo = await ToDoModel.findById(_id);
  const belowToDo = await ToDoModel.findOne({
    position: currentToDo.position + 1,
  });

  if (belowToDo) {
    const tempTitle = currentToDo.title;
    const tempDescription = currentToDo.description;

    currentToDo.title = belowToDo.title;
    currentToDo.description = belowToDo.description;

    belowToDo.title = tempTitle;
    belowToDo.description = tempDescription;

    await currentToDo.save();
    await belowToDo.save();
  }
  res.send("Moved Down Successfully...");
};

module.exports.deleteToDo = async (req, res) => {
  const { _id } = req.params;

  try {
    const deletedToDo = await ToDoModel.findByIdAndDelete(_id);
    if (!deletedToDo) {
      return res.status(404).json({ error: "ToDo nu a fost găsit." });
    }

    const todosToUpdate = await ToDoModel.find({
      position: { $gt: deletedToDo.position },
    });

    for (const todo of todosToUpdate) {
      todo.position -= 1;
      await todo.save();
    }

    res.send("ToDo șters cu succes și pozițiile actualizate.");
  } catch (error) {
    console.error("Eroare la ștergerea ToDo-ului", error);
    res.status(500).json({ error: "Eroare la ștergerea ToDo-ului" });
  }
};

module.exports.deleteAllToDos = async (req, res) => {
  try {
    await ToDoModel.deleteMany({});
    res
      .status(204)
      .json({ message: "Toate ToDo-urile au fost șterse cu succes." });
  } catch (error) {
    console.error("Eroare la ștergerea ToDo-urilor", error);
    res.status(500).json({ error: "Eroare la ștergerea ToDo-urilor" });
  }
};
