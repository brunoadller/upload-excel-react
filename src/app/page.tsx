"use client"

const Home = () => {
  return(
    <div className="w-full h-[100vh] bg-sky-950 flex  justify-center p-5">
      <form className="flex flex-col gap-3 items-center justify-center ">
        <input type="file" className="bg-slate-800 text-sm font-bold px-4 py-2 rounded-2xl cursor-pointer"  required/>
        <button>UPLOAD</button>
      </form>
    </div>
  )
}

export default Home;