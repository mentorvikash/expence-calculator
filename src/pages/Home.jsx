import React, { useState } from "react";
import { useFormik } from "formik";
import * as yup from 'yup';
import ExpenseForm from "../component/ExpenceForm";

function Home() {
  const [expenseData, setExpenseData] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);

  const formik = useFormik({
    initialValues: {
      expense: "",
      amount: ""
    },
    validationSchema: yup.object({
      expense: yup.string().required("Required"),
      amount: yup.string().required("Required")
    }),
    onSubmit: values => {
      if (editingIndex !== null) {
        const updatedExpenses = [...expenseData];
        updatedExpenses[editingIndex] = values;
        setExpenseData(updatedExpenses);
        setEditingIndex(null);
      } else {
        setExpenseData([...expenseData, values]);
      }
      formik.handleReset();
    }
  });

  const handleDelete = (targetIndex) => {
    const filteredList = expenseData.filter((_, index) => index !== targetIndex);
    setExpenseData(filteredList);
  };

  const handleEdit = (index) => {
    const expenseToEdit = expenseData[index];
    formik.setValues(expenseToEdit);
    setEditingIndex(index);
  };

  return (
    <div>
      <div className="w-full sticky top-2 text-center bg-black p-2">
        <h1 className="heading text-2xl font-semibold text-white">Expense Tracker</h1>
      </div>
      <div className="p-5">
        <ExpenseForm formik={formik} isEditing={editingIndex !== null} />
      </div>
      <hr />
      <div className="tracker mx-5 mt-4">
        <h2 className="text-2xl underline font-semibold">Tracker:</h2>
        <ul className="flex flex-col gap-y-2 mt-3">
          {expenseData.length > 0 ? (
            expenseData.map((el, index) => (
              <li className="grid grid-cols-4 custom-grid" key={el.expense + index}>
                <span className="capitalize">{el.expense}</span>
                <span>${el.amount}</span>
                <button onClick={() => handleEdit(index)} className="bg-green-500 px-2 py-1 text-sm font-bold rounded w-fit">
                  Edit
                </button>
                <button onClick={() => handleDelete(index)} className="bg-red-500 px-2 py-1 text-sm font-bold rounded w-fit">
                  Delete
                </button>
              </li>
            ))
          ) : (
            <li className="text-gray-700 self-center">No Data Found</li>
          )}
        </ul>
      </div>
    </div>
  );
}

export default Home;