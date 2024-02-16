import {useEffect, useState} from "react";

export default function Repos() {
    const [repos, setRepos] = useState<string[]>([])

    useEffect(() => {
        async function getRepos() {
            const res = await fetch('http://localhost:3001/github/get-repos')
            if (res.status === 200) {
                const j_res = await res.json()
                setRepos(j_res)
            }
        }

        getRepos()
    }, []);

    return <main className={"w-full"}>
        <h1 className={"text-2xl font-bold text-white bg-blue-700 px-4 py-2 rounded-lg max-w-max m-4"}>All Repos</h1>
        <div className={"w-full px-4"}>


            <div className="relative  overflow-x-auto">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" className="px-6 py-3">
                            S No.
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Name
                        </th>
                    </tr>
                    </thead>
                    <tbody>
                    {repos.map((repo:string,index:number)=>{
                        return <tr key={repo} className="bg-white text-white border-b dark:bg-gray-800 dark:border-gray-700">
                            <th scope="row"
                                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                {index+1}
                            </th>
                            <td className="px-6 py-4">
                                {repo}
                            </td>
                        </tr>
                    })}

                    </tbody>
                </table>
            </div>

        </div>
    </main>
}