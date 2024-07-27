import React, { useState } from "react";
import { useFormik, Formik } from "formik";
import * as yup from 'yup'

function Home() {
  const [expenceData, setexpenceData] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);


  const formik = useFormik({
    initialValues: {
      "expence": "",
      "amount": ""
    },
    validationSchema: yup.object({
      expence: yup.string().required("Required"),
      amount: yup.string().required("Required")
    }),
    onSubmit: values => {
      if (editingIndex !== null) {
        const updatedExpenses = [...expenceData];
        updatedExpenses[editingIndex] = values;
        setexpenceData(updatedExpenses);
        setEditingIndex(null);
      } else {
        setexpenceData([...expenceData, values]);
      }
      formik.handleReset();
    }
  })

  const handleDelete = (targetIndex) => {
    const filterlist = expenceData.filter((data, index) => index !== targetIndex)
    setexpenceData(filterlist)
  }

  const handleEdit = (index) => {
    const expenseToEdit = expenceData[index];
    formik.setValues(expenseToEdit);
    setEditingIndex(index);
  };

  return (
    <div>
      <div className="w-full sticky top-2 text-center bg-black p-2" >
        <h1 className="heading text-2xl font-semibold text-white ">Expence Tracker</h1>
      </div>
      <div className="p-5">
        <form className="flex flex-col gap-2" onSubmit={formik.handleSubmit}>
          <div className="flex">
            <span className="text-sm border-2 rounded-1 px-4 py-2 bg-gray-300 whitespace-nowrap" >Expence Type: </span>
            <input type="text" id="expence" name="expence" value={formik.values.expence} onChange={formik.handleChange} onBlur={formik.handleBlur}
              placeholder="expense" className="border-2 rounded px-4 py2 w-full " />
          </div>
          {
            formik.touched.expence && formik.errors.expence ? (<div className="text-red-500 text-xs">{formik.errors.expence}</div>) : null
          }
          <div className="flex" >
            <span className="text-sm border-2 rounded-1 bg-gray-300 px-4 py-2 whitespace-nowrap" >Amount: </span>
            <input type="text" id="amount" name="amount" value={formik.values.amount} onChange={formik.handleChange} onBlur={formik.handleBlur}
              placeholder="enter amount" className="border-2 rounded px-4 w-full" />
          </div>
          {
            formik.touched.amount && formik.errors.amount ? (<div className="text-red-500 text-xs">{formik.errors.amount}</div>) : null
          }

          <button type="submit" className="border w-full sm:w-fit py-2 px-4 bg-black text-white self-center rounded hover:bg-gray-300">Add Expence</button>
        </form>
      </div>
      <hr />
      <div className="tracker mx-5 mt-4">
        <h2 className="text-2xl underline font-semibold"> Tracker: </h2>
        <ul className="flex flex-col gap-y-2 mt-3">
          {
            expenceData.length > 0 ? expenceData?.map((el, index) => (
              <li className="grid grid-cols-4 custom-grid" key={el.expence + index}>
                <span className="capitalize" >{el?.expence}</span>
                <span>${el?.amount}</span>
                <button onClick={() => handleEdit(index)} className="bg-green-500 px-2 py-1 text-sm font-bold rounded w-fit ">Edit</button>
                <button onClick={() => handleDelete(index)} className="bg-red-500 px-2 py-1 text-sm font-bold rounded w-fit ">Delete</button>
              </li>
            ))
              :
              <li className="text-gray-700 self-center">
                No Data Found
              </li>
          }
        </ul>
      </div>
    </div>
  );
}

export default Home;
