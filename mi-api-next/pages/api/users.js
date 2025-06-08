let users = [
  { id: 1, name: "Osmar Ancco", email: "osmar@example.com", age: 25 },
  { id: 2, name: "Alfredo Murillo", email: "alfredo@example.com", age: 30 },
];

export default function handler(req, res) {
  const { id } = req.query;

  // GET: Listar todos los usuarios
  if (req.method === "GET") {
    return res.status(200).json(users);
  }

  // POST: Agregar un nuevo usuario
  if (req.method === "POST") {
    const { name, email, age } = req.body;
    if (!name || !email || !age) {
      return res.status(400).json({ message: "Todos los campos son requeridos" });
    }
    const newUser = {
      id: users.length ? users[users.length - 1].id + 1 : 1,
      name,
      email,
      age,
    };
    users.push(newUser);
    return res.status(201).json(newUser);
  }

  // PUT: Actualizar usuario por id (solo campos enviados)
  if (req.method === "PUT") {
    const { id, ...fields } = req.body;
    const user = users.find((u) => u.id === parseInt(id));
    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }
    Object.assign(user, fields);
    return res.status(200).json(user);
  }

  // DELETE: Eliminar usuario por id
  if (req.method === "DELETE") {
    const { id } = req.body;
    const userIndex = users.findIndex((u) => u.id === parseInt(id));
    if (userIndex === -1) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }
    users.splice(userIndex, 1);
    return res.status(200).json({ message: "Usuario eliminado" });
  }

  res.status(405).json({ message: "Método no permitido" });
}