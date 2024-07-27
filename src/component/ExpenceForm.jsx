export default function ExpenseForm({ formik, isEditing }) {
    const { values, handleChange, handleBlur, touched, errors, handleSubmit } = formik;
    
    return (
      <form className="flex flex-col gap-2" onSubmit={handleSubmit}>
        <div className="flex">
          <span className="text-sm border-2 rounded-1 px-4 py-2 bg-gray-300 whitespace-nowrap">Expense Type: </span>
          <input
            type="text"
            id="expense"
            name="expense"
            value={values.expense}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="expense"
            className="border-2 rounded px-4 py-2 w-full"
          />
        </div>
        {touched.expense && errors.expense ? (
          <div className="text-red-500 text-xs">{errors.expense}</div>
        ) : null}
        <div className="flex">
          <span className="text-sm border-2 rounded-1 bg-gray-300 px-4 py-2 whitespace-nowrap">Amount: </span>
          <input
            type="text"
            id="amount"
            name="amount"
            value={values.amount}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="enter amount"
            className="border-2 rounded px-4 w-full"
          />
        </div>
        {touched.amount && errors.amount ? (
          <div className="text-red-500 text-xs">{errors.amount}</div>
        ) : null}
        <button type="submit" className="border w-full sm:w-fit py-2 px-4 bg-black text-white self-center rounded hover:bg-gray-300">
          {isEditing ? "Update Expense" : "Add Expense"}
        </button>
      </form>
    );
  }
  