const MainContainer = ({ children } : React.PropsWithChildren) => {

    return (
        <main className="flex flex-1 h-screen">
            <section className="relative flex flex-col w-full max-w-940 mx-auto p-15 max-sm:p-10">
                {children}
            </section>
        </main>
    )
}

export default MainContainer;