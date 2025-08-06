const LoadingPage = () => {

    return (
        <div className="w-screen h-screen flex justify-center items-center gap-4 pb-100 bg-slate-50">
           <h1 className="text-5xl text-slate-900" >Loading</h1>
           <span className="animate-spin h-9 w-9 border-4 border-indigo-500 border-t-transparent rounded-full mt-2.5"></span>

        </div>
    )

}

export { LoadingPage }