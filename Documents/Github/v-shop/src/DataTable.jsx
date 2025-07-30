import React, { useRef } from "react";

const Container = ({ children }) => <div style={{ padding: "20px" }}>{children}</div>;
const Button = ({ onClick, children }) => (
  <button onClick={onClick} style={{ marginLeft: "8px" }}>{children}</button>
);

export default function DataTable({ data, onDelete, onSearch }) {
  const sRef = useRef();

  const handleSearch = () => {
    const keyword = sRef.current.value;
    onSearch(keyword); // parent handles the filtering logic
  };

  return (
    <Container>
      <div style={{ marginBottom: "10px" }}>
        <input type="text" placeholder="Search..." ref={sRef} />
        <Button onClick={handleSearch}>Search</Button>
      </div>

      <table border="1" cellPadding="4">
        <thead>
          <tr>
            <th></th>
            <th>ID</th>
            <th>Name</th>
            <th>Price</th>
            <th>Quantity</th>
          </tr>
        </thead>
        <tbody>
          {data.map(item => (
            <tr key={item.id}>
              <td>
                <button onClick={() => onDelete(item.id)}>Delete</button>
              </td>
              <td>{item.id}</td>
              <td>{item.name}</td>
              <td>{item.price}</td>
              <td>{item.quantity}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </Container>
  );
}
