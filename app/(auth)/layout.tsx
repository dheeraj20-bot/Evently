const Layout = ({children}:{children:React.ReactNode})=>{
    return (
        <div className=" w-full bg-primary-50  bg-dotted-pattern bg-cover bg-fixed bg-center flex-center min-h-screen">
            {children}
        </div>
    )
}

export default Layout