import { Button, Stack } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import AddBudgetModel from "./components/AddBudgetModel";
import BudgetCard from "./components/BudgetCard";
import UncategorizedBudgetCard from "./components/UncategorizedBudgetCard";
import TotalBudgetCard from "./components/TotalBudgetCard";
import AddExpenseModel from "./components/AddExpenseModel ";
import ViewExpensesModel from "./components/ViewExpensesModel";
import { useState } from "react";

import {UNCATEGORIZED_BUDGET_ID, useBudgets} from "./contexts/BudgetsContext"

function App() {
  const [showAddBudgetModel, setShowAddBudgetModel] = useState(false)
  const [showAddExpenseModel, setShowAddExpenseModel] = useState(false)
  const [addExpenseModelBudgetId, setAddExpenseModelBudgetId] = useState()
  const [viewExpenseModelBudgetId, setviewExpenseModelBudgetId] = useState()
  const { budgets, getBudgetExpenses } = useBudgets()

  function openAddExpenseModel(budgetId){
    setShowAddExpenseModel(true)
    setAddExpenseModelBudgetId(budgetId)
  }
  return (
    <>
      <Container className="my-4">
        <Stack direction="horizontal" gap="2" className="mb-4">
          <h1 className="me-auto">Budgets</h1>
          <Button variant="primary" onClick={() => setShowAddBudgetModel(true)}>  Add Budget</Button>
          <Button variant="outline-primary" onClick={openAddExpenseModel}>Add Expense</Button>
        </Stack>
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeate(auto-fill,minmac(300px,1fr))",
          gap: "1rem",
          alignItems: "flex-start"
        }}
        >
          {budgets.map(budget => {
            const amount = getBudgetExpenses(budget.id).reduce(
              (total, expense) => total + expense.amount,
              0
            )
            return (
            <BudgetCard
              key={budget.id}
              name={budget.name}
              amount={amount}
              max={budget.max} 
              onAddExpenseClick={()=> openAddExpenseModel(budget.id)}
              onViewExpensesClick={()=> setviewExpenseModelBudgetId(budget.id)}
              />
            )
          })}
          <UncategorizedBudgetCard 
          onAddExpenseClick={openAddExpenseModel}
          onViewExpensesClick={()=> setviewExpenseModelBudgetId(UNCATEGORIZED_BUDGET_ID)}
          />
          <TotalBudgetCard/>
        </div>
      </Container>

      <AddBudgetModel 
      show={showAddBudgetModel} 
      handleClose={() => setShowAddBudgetModel(false)} />

      <AddExpenseModel 
      show={showAddExpenseModel} 
      defaultBudgetId= {addExpenseModelBudgetId}
      handleClose={() => setShowAddExpenseModel(false)} 
      />
      <ViewExpensesModel 
      budgetId = {viewExpenseModelBudgetId} 
      defaultBudgetId= {addExpenseModelBudgetId}
      handleClose={() => setviewExpenseModelBudgetId()} 
      />
    </>
  )
}

export default App;

// import { Button, Stack } from "react-bootstrap"
// import Container from "react-bootstrap/Container"
// import AddBudgetModel from "./components/AddBudgetModel"
// import AddExpenseModel from "./components/AddExpenseModel "
// import ViewExpensesModel from "./components/ViewExpensesModel"
// import BudgetCard from "./components/BudgetCard"
// import UncategorizedBudgetCard from "./components/UncategorizedBudgetCard"
// import TotalBudgetCard from "./components/TotalBudgetCard"
// import { useState } from "react"
// import { UNCATEGORIZED_BUDGET_ID, useBudgets } from "./contexts/BudgetsContext"

// function App() {
//   const [showAddBudgetModel, setShowAddBudgetModel] = useState(false)
//   const [showAddExpenseModel, setShowAddExpenseModel] = useState(false)
//   const [viewExpensesModelBudgetId, setViewExpensesModelBudgetId] = useState()
//   const [addExpenseModelBudgetId, setAddExpenseModelBudgetId] = useState()
//   const { budgets, getBudgetExpenses } = useBudgets()

//   function openAddExpenseModel(budgetId) {
//     setShowAddExpenseModel(true)
//     setAddExpenseModelBudgetId(budgetId)
//   }

//   return (
//     <>
//       <Container className="my-4">
//         <Stack direction="horizontal" gap="2" className="mb-4">
//           <h1 className="me-auto">Budgets</h1>
//           <Button variant="primary" onClick={() => setShowAddBudgetModel(true)}>
//             Add Budget
//           </Button>
//           <Button variant="outline-primary" onClick={openAddExpenseModel}>
//             Add Expense
//           </Button>
//         </Stack>
//         <div
//           style={{
//             display: "grid",
//             gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
//             gap: "1rem",
//             alignItems: "flex-start",
//           }}
//         >
//           {budgets.map(budget => {
//             const amount = getBudgetExpenses(budget.id).reduce(
//               (total, expense) => total + expense.amount,
//               0
//             )
//             return (
//               <BudgetCard
//                 key={budget.id}
//                 name={budget.name}
//                 amount={amount}
//                 max={budget.max}
//                 onAddExpenseClick={() => openAddExpenseModel(budget.id)}
//                 onViewExpensesClick={() =>
//                   setViewExpensesModelBudgetId(budget.id)
//                 }
//               />
//             )
//           })}
//           <UncategorizedBudgetCard
//             onAddExpenseClick={openAddExpenseModel}
//             onViewExpensesClick={() =>
//               setViewExpensesModelBudgetId(UNCATEGORIZED_BUDGET_ID)
//             }
//           />
//           <TotalBudgetCard />
//         </div>
//       </Container>
//       <AddBudgetModel
//         show={showAddBudgetModel}
//         handleClose={() => setShowAddBudgetModel(false)}
//       />
//       <AddExpenseModel
//         show={showAddExpenseModel}
//         defaultBudgetId={addExpenseModelBudgetId}
//         handleClose={() => setShowAddExpenseModel(false)}
//       />
//       <ViewExpensesModel
//         budgetId={viewExpensesModelBudgetId}
//         handleClose={() => setViewExpensesModelBudgetId()}
//       />
//     </>
//   )
// }

// export default App