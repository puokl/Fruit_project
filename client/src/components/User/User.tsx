import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import axios from "axios";

interface FormData {
  inspector_name: string;
  fruit: string;
}
const CreateUser: React.FC = () => {
  const { register, handleSubmit, reset } = useForm<FormData>();
  const [message, setMessage] = useState<string>("");

  const onSubmit: SubmitHandler<FormData> = async (data: {
    inspector_name: string;
    fruit: string;
  }) => {
    try {
      await axios.post("http://localhost:5000/api/users", {
        inspector_name: data.inspector_name,
        fruit: data.fruit,
      });

      setMessage("User added successfully.");
      reset(); // Reset the form fields after successful submission
    } catch (error) {
      console.error("Error:", error);
      setMessage("Failed to add user.");
    }
  };

  return (
    <div>
      <h2>Add User</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label>
            Inspector Name:
            <input
              type="text"
              {...register("inspector_name", { required: true })}
            />
          </label>
        </div>
        <div>
          <label>
            Fruit:
            <input type="text" {...register("fruit", { required: true })} />
          </label>
        </div>
        <button type="submit">Add User</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default CreateUser;
