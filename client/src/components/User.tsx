import { useState, ChangeEvent, FormEvent } from "react";
import axios from "axios";
import { z, ZodError } from "zod";

const usernameSchema = z
  .string()
  .nonempty({ message: "Username is required." })
  .min(1)
  .max(50);

const CreateUser: React.FC = () => {
  const [username, setUsername] = useState<string>("");
  const [role, setRole] = useState<string>("user");
  const [message, setMessage] = useState<string>("");
  const [error, setError] = useState<string>("");

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      usernameSchema.parse(username);
      //   setError("");
      await axios.post("http://localhost:5000/api/users", {
        username,
        role,
      });

      setMessage("User added successfully.");
      setUsername("");
      setRole("user");
    } catch (error: any) {
      if (error instanceof ZodError) {
        console.log("error", error);
        setError(error.errors[0].message);
      } else {
        console.error("Error:", error);
        setMessage("Failed to add user.");
      }
    }
  };

  const handleUsernameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
  };

  const handleRoleChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setRole(event.target.value);
  };

  return (
    <div>
      <h2>Add User</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            Username:
            <input
              type="text"
              value={username}
              onChange={handleUsernameChange}
            />
          </label>
        </div>
        <div>
          <label>
            Role:
            <select value={role} onChange={handleRoleChange}>
              <option value="user">User</option>
              <option value="admin">Admin</option>
              <option value="worker">Worker</option>
            </select>
          </label>
        </div>
        <button type="submit">Add User</button>
      </form>
      {error && <p>{error}</p>}
      {message && <p>{message}</p>}
    </div>
  );
};

export default CreateUser;
