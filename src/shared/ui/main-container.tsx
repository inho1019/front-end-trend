const MainContainer = ({ children } : React.PropsWithChildren) => {

    return (
        <main className="flex flex-1 h-screen">
            <section className="flex flex-col w-full max-w-940 mx-auto p-15">
                {children}
            </section>
        </main>
    )
}

export default MainContainer;