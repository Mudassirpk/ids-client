export default function FrontendServicesStatus() {
    return <section className={"w-[800px] mx-auto"}>
        <h2
        className="mt-4 font-semibold text-xl bg-blue-700 text-white rounded-lg px-4 py-2">
        Status of Frontend Services
    </h2>
        <div className="flex flex-col">
            <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
                    <div className="overflow-hidden">
                        <table className="min-w-full text-left text-sm font-light">
                            <thead className="border-b font-medium dark:border-neutral-500">
                            <tr className="text-lg">
                                <th scope="col" className="px-6 py-4">
                                    S No.
                                </th>
                                <th scope="col" className="px-6 py-4">
                                    Service Name
                                </th>
                                <th scope="col" className="px-6 py-4">
                                    Status
                                </th>
                                <th scope="col" className="px-6 py-4">
                                    Service ID
                                </th>
                                <th scope="col" className="px-6 py-4">
                                    Path
                                </th>
                            </tr>
                            </thead>
                            <tbody>

                            <tr className="border-b dark:border-neutral-500 text-lg text-black">
                                <td className="whitespace-nowrap px-6 py-4 font-medium">
                                    1
                                </td>
                                <td className="whitespace-nowrap px-6 py-4">
                                    2
                                </td>
                                <td>
                                    3
                                </td>
                                <td className="whitespace-nowrap px-6 py-4">
                                    4
                                </td>
                                <td className="whitespace-nowrap px-6 py-4">
                                    5
                                </td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </section>
}