import { useState, useEffect } from 'react';
import axios from 'axios';

function CustomerList() {
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    const loadCustomers = async () => {
      try {
        const response = await axios.get('/v1/customers');
        setCustomers(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    loadCustomers();
  }, []);

  return (
    <div className="customer-list">
      <ol>
        {customers.map((customer) => (
          <li key={customer.id}>{customer.email}</li>
        ))}
      </ol>
    </div>
  );
}

export default CustomerList;