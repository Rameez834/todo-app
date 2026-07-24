import { useEffect, useState } from "react";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { v4 as uuidv4 } from 'uuid';
import NavBar from "./components/NavBar";

const App = () => {

  const [todo, setTodo] = useState('')
  const [todos, setTodos] = useState(()=>{
    const todosString = localStorage.getItem("todos")
    if(todosString){
      return JSON.parse(todosString)
    }
    return []
  })
  useEffect(() => {
    localStorage.setItem("todos",JSON.stringify(todos))
  }, [todos])
  
  const [error, setError] = useState(true)
  const [showFinished, setShowFinished] = useState(false)
  const handleChange = (e) =>{
    setTodo(e.target.value)
  }
    const handleAdd = () =>{
      if(todo.trim().length<=3){
        setError(true)
        return;
      }else{
        setTodos([...todos,{id:uuidv4(),todo,isCompleted:false}])
    setTodo('')
    setError(false)
      }
    
  }
    const handleDelete = (item) =>{
    const newTodos = todos.filter((t)=>{
      return item.id !== t.id
    })
    setTodos(newTodos)
  }
    const handleEdit = (item) =>{
      setTodo(item.todo)
      const newTodos = todos.filter((t)=>{
      return item.id !== t.id
    })
    setTodos(newTodos)
  }
  const handleCheckBox = (id) =>{
    const index = todos.findIndex((item)=>{
      return item.id === id 
    }) 
    const newTodos = [...todos]
    newTodos[index].isCompleted = !newTodos[index].isCompleted
    setTodos(newTodos)
  } 
  const totalTodos = todos.length;
  const completedTodos = todos.filter(item => item.isCompleted).length
  const progress = todos.length ===0 ? 0:(completedTodos/totalTodos)*100
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 to-slate-200">
        <NavBar/>
      <div className="flex flex-col items-center px-4 py-10">
        <div className="bg-white w-full max-w-2xl rounded-2xl shadow-xl p-6">

          <div>
            <h1 className="text-3xl font-bold text-slate-800">
              My Todos
            </h1>

            <div className="bg-gray-300 h-3 mt-3 w-full rounded-full">
              <div
                className="bg-green-500 h-3 rounded-full"
                style={{ width: `${progress}%` }}
              ></div>
            </div>

            <div className="mt-4">
              <p>{completedTodos} out of {totalTodos}</p>
            </div>
          </div>

          <div className="mt-10">
            <div className="flex gap-3">
              <input onChange={handleChange} value={todo}
                type="text"
                placeholder="What needs to be done?"
                className="flex-1 border border-slate-300 rounded-xl px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
              />

              <button onClick={handleAdd} className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-5 rounded-xl transition">
                Add
              </button>
            </div>

            {error &&(<p className="text-xs text-amber-600 mt-1.5 ml-1">
              Task must be more than 3 characters
            </p>)}
          </div>

          <div className="mt-8">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-slate-700">
                Your Todos
              </h2>

              <label className="flex items-center gap-2 text-sm text-slate-500 cursor-pointer select-none">
                <input onChange= {()=>setShowFinished(!showFinished)}
                  type="checkbox"
                  className="w-4 h-4 accent-indigo-600 cursor-pointer"
                />
                Show finished
              </label>
            </div>
            {todos.length === 0 && (
              <div className="mt-4 text-gray-400">
              <p>No todos yet, Add one above</p>
            </div>
            )}
            
           {todos.filter((item)=>{
           return  showFinished || !item.isCompleted
           })
           .map((item)=>{
            return <div className="mt-4 space-y-3">
              <div className="flex items-start gap-3 bg-slate-50 hover:bg-slate-100 border border-slate-100 p-4 rounded-xl transition">
                <input
                onChange={()=>handleCheckBox(item.id)}
                checked={item.isCompleted}
                  type="checkbox"
                  className="w-5 h-5 mt-0.5 accent-indigo-600 cursor-pointer self-center shrink-0"
                />
               
                <p className={`text-slate-700 break-words min-w-0 flex-1 self-center ${item.isCompleted?"line-through":""}`}>
                  {item.todo}
                </p>

                <div className="flex gap-2 shrink-0">
                  <button onClick={()=>handleEdit(item)}
                    aria-label="Edit"
                    className="w-9 h-9 flex items-center justify-center bg-white border border-slate-200 hover:border-indigo-400 hover:text-indigo-600 text-slate-500 rounded-lg transition"
                  >
                    <FaEdit />
                  </button>

                  <button onClick={()=>handleDelete(item)}
                    aria-label="Delete"
                    className="w-9 h-9 flex items-center justify-center bg-white border border-slate-200 hover:border-red-400 hover:text-red-600 text-slate-500 rounded-lg transition"
                  >
                    <MdDelete />
                  </button>
                </div>
              </div>
            </div>
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;