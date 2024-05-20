'use client';

import clsx from "clsx";
import { ArrowLeft, ArrowRight, ImportIcon, LucideImport, MoreVertical, MoreVerticalIcon, Search, SidebarCloseIcon } from "lucide-react";
import Link from "next/link";
import { BiSolidFileImport } from "react-icons/bi";
import AddFaceDialog from "./add.face.dialog";
import SearchComponent from "./search.component";
import { IoAddCircle } from "react-icons/io5";
import ImportFaceDialog from "./import.face.dialog";
import { useState, useEffect } from "react";

async function fetchFaces(
    page: number,
    limit: number,
    search: string,
    clientId?: string
) {

    const res = await fetch(
        `http://localhost:3000/api/faces?page=${page}&limit=${limit}&search=${search}&client_id=${clientId}`,
    )
    if (!res.ok) {
        return {
            data: [],
            meta: {
                page: 1,
                limit: 10,
                totalPages: 1,
                total: 0,
            },
        }
    }
    const data = await res.json()
    return data
}

type FaceTableProps = {
    page: number
    limit: number
    search: string
    clientId?: string
}

export default async function FaceTable(props: FaceTableProps) {

    // const data = await fetchFaces(props.page, props.limit, props.search, props.clientId)

    const [data, setData] = useState<any>({ data: [], meta: { page: 1, limit: 10, totalPages: 1, total: 0 } })

    useEffect(() => {
        fetchFaces(props.page, props.limit, props.search, props.clientId).then((data) => {
            setData(data)
        })
    }, [props.page, props.limit, props.search, props.clientId])

    return (
        <section className="container px-4 mx-auto">
            <div className="sm:flex sm:items-center sm:justify-between">
                <div>
                    <div className="flex items-center gap-x-3">
                        <h2 className="text-lg font-medium text-gray-800 dark:text-white">
                            Faces
                        </h2>
                    </div>
                    <p className="mt-1 text-sm text-gray-500 dark:text-gray-300">
                        These are the faces that have been indexed by the system.
                    </p>
                </div>
                <div className="flex items-center mt-4 gap-x-3">
                    <ImportFaceDialog />

                    <AddFaceDialog />
                </div>
            </div>
            <SearchComponent page={props.page} limit={props.limit} clientId={props.clientId} />
            <div className="flex flex-col mt-6">
                <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                        <div className="overflow-hidden border border-gray-200 dark:border-gray-700 md:rounded-lg">
                            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                                <thead className="bg-gray-50 dark:bg-gray-800">
                                    <tr>
                                        <th
                                            scope="col"
                                            className="py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                                        >
                                            <button className="flex items-center gap-x-3 focus:outline-none">
                                                <span>Id</span>
                                            </button>
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-12 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                                        >
                                            Username
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                                        >
                                            KNN Indexing
                                        </th>
                                        <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                            Actions
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200 dark:divide-gray-700 dark:bg-gray-900">

                                    {
                                        data.data.map((user: any) => (
                                            <tr key={user.id}>
                                                <td className="px-4 py-4 text-sm font-medium whitespace-nowrap">
                                                    <div>
                                                        <h2 className="font-medium text-gray-800 dark:text-white ">
                                                            {user.id}
                                                        </h2>
                                                    </div>
                                                </td>
                                                <td className="px-12 py-4 text-sm font-medium whitespace-nowrap">
                                                    <div>
                                                        <h2 className="font-medium text-gray-800 dark:text-white ">
                                                            {user.user_name}
                                                        </h2>
                                                    </div>
                                                </td>
                                                <td className="px-4 py-4 text-sm whitespace-nowrap">
                                                    <div>
                                                        <h2 className="font-medium text-gray-800 dark:text-white ">
                                                            {user.knn_indexing}
                                                        </h2>
                                                    </div>
                                                </td>
                                                <td className="px-4 py-4 text-sm whitespace-nowrap">
                                                    <button className="px-1 py-1 text-gray-500 transition-colors duration-200 rounded-lg dark:text-gray-300 hover:bg-gray-100">
                                                        <MoreVerticalIcon className="w-5 h-5" />
                                                    </button>
                                                </td>
                                            </tr>
                                        ))
                                    }

                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
            <div className="mt-6 sm:flex sm:items-center sm:justify-between ">
                <div className="text-sm text-gray-500 dark:text-gray-400">
                    Page{" "}
                    <span className="font-medium text-gray-700 dark:text-gray-100">
                        {props.page} of {data.meta.totalPages}
                    </span>
                </div>
                <div className="flex items-center mt-4 gap-x-4 sm:mt-0">
                    <Link
                        href={
                            props.page === 1 || props.page === 0
                                ? "#"
                                : `/dashboard/faces?page=${props.page - 1}&limit=${props.limit}&search=${props.search}&client_id=${props.clientId}`
                        }
                        className={
                            clsx(
                                "flex items-center justify-center w-1/2 px-5 py-2 text-sm text-gray-700 capitalize transition-colors duration-200 bg-white border rounded-md sm:w-auto gap-x-2",
                                {
                                    "hover:bg-gray-100 dark:bg-gray-900 dark:text-gray-200 dark:border-gray-700 dark:hover:bg-gray-800": props.page === 1 || props.page === 0,
                                }
                            )
                        }
                    >
                        <ArrowLeft className="w-5 h-5 rtl:-scale-x-100" />
                        <span>previous</span>
                    </Link>
                    <Link
                        href={
                            props.page === data.meta.totalPages
                                ? "#"
                                :
                                `/dashboard/faces?page=${props.page + 1}&limit=${props.limit}&search=${props.search}&client_id=${props.clientId}`
                        }
                        className="flex items-center justify-center w-1/2 px-5 py-2 text-sm text-gray-700 capitalize transition-colors duration-200 bg-white border rounded-md sm:w-auto gap-x-2 hover:bg-gray-100 dark:bg-gray-900 dark:text-gray-200 dark:border-gray-700 dark:hover:bg-gray-800"
                    >
                        <span>Next</span>
                        <ArrowRight className="w-5 h-5 rtl:-scale-x-100" />
                    </Link>
                </div>
            </div>
        </section>

    );
}
