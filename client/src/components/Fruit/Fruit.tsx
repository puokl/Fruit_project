import { useState, ChangeEvent, FormEvent } from "react";
import axios from "axios";

interface AddFruitProps {}

const CreateFruit: React.FC<AddFruitProps> = () => {
  const [name, setName] = useState<string>("");
  const [color, setColor] = useState<string>("");
  const [message, setMessage] = useState<string>("");

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      await axios.post("http://localhost:5000/fruits", {
        name,
        color,
      });

      setMessage("User added successfully.");
      setName("");
      setColor("");
    } catch (error) {
      console.error("Error:", error);
      setMessage("Failed to add user.");
    }
  };

  const handleNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const handleColorChange = (event: ChangeEvent<HTMLInputElement>) => {
    setColor(event.target.value);
  };

  return (
    <div>
      <h1>Add Fruit</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            Name:
            <input type="text" value={name} onChange={handleNameChange} />
          </label>
        </div>
        <div>
          <label>
            Color:
            <input type="text" value={color} onChange={handleColorChange} />
          </label>
        </div>
        <button type="submit">Add Fruit</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default CreateFruit;
