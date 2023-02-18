import fileSystem, { promises as fs } from 'fs';
// import db from "../../db/user.json"


interface User {
  id: number;
  name: string;
  email: string;
}

type Data=  User[]

export class JSONDatabase {
  private filepath: string;

  constructor(filename: string) {
    this.filepath = "../../user.json";
    this.connectDB();
  }

  async connectDB () {
    // fileSystem.rmSync(this.filepath)
    const db = fileSystem.existsSync(this.filepath)
    if(db){
      console.log(db)
      console.log("db exists")
    }
    else{
      await fs.writeFile(this.filepath, JSON.stringify([]))
    }

}

  async createUser(user: User) {
    try {
      const data = await fs.readFile(this.filepath, 'utf8');
    
      const users = JSON.parse(data);
      users.push(user);
      console.log(users)
      await fs.writeFile(this.filepath, JSON.stringify(users));
      
      return user;
    } catch (err) {
      console.log(err)
    }
    
  }
    

  async getUser(id: number): Promise<User> {
    const data = await fs.readFile(this.filepath, 'utf8');
    const users: Data = JSON.parse(data);
    const user = users.find((user) => user.id === id);
    if (user) {
      return user;
    } else {
      throw new Error('User not found');
    }
  }

  async updateUser(id: number, updatedUser: Partial<User>): Promise<User> {
    const data = await fs.readFile(this.filepath, 'utf8');
    const users: Data = JSON.parse(data);
    const userIndex = users.findIndex((user) => user.id === id);
    if (userIndex >= 0) {
      users[userIndex] = { ...users[userIndex], ...updatedUser };
      await fs.writeFile(this.filepath, JSON.stringify({ users }));
      return users[userIndex];
    } else {
      throw new Error('User not found');
    }
  }

  async deleteUser(id: number): Promise<{ message: string }> {
    const data = await fs.readFile(this.filepath, 'utf8');
    const users : Data = JSON.parse(data);
    const filteredUsers = users.filter((user) => user.id !== id);
    await fs.writeFile(this.filepath, JSON.stringify({ users: filteredUsers }));
    return { message: 'User deleted successfully' };
  }
}
