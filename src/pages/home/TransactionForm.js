import { useState, useEffect } from "react";
import { useFirestore } from "../../hooks/useFirestore";

export default function TransactionForm({ uid }) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [duration, setDuration] = useState(0);
  const { addDocument, response } = useFirestore("tasks");

  const handleSubmit = (e) => {
    e.preventDefault();
    addDocument({
      uid,
      name,
      description,
      duration,
      subtask: [],
    });
  };

  // reset the form fields
  useEffect(() => {
    if (response.success) {
      setName("");
      setAmount("");
      setDescription("");
      setDuration("");
    }
  }, [response.success]);

  return (
    <>
      <h3>Add a Transaction</h3>
      <form onSubmit={handleSubmit}>
        <label>
          <span>Transaction name:</span>
          <input
            type="text"
            required
            onChange={(e) => setName(e.target.value)}
            value={name}
          />
        </label>
        <label>
          <span>Amount ($):</span>
          <input
            type="number"
            required
            cols="30"
            rows="5"
            onChange={(e) => setDescription(e.target.value)}
            value={description}
          />
        </label>
        <label>
          <span>Duration (hr):</span>
          <input
            type="number"
            required
            min="0"
            max="24"
            onChange={(e) => setDuration(e.target.value)}
            value={duration}
          />
        </label>
        <button>Break Down Task</button>
      </form>
    </>
  );
}
