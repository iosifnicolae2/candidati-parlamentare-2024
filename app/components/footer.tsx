import Link from "next/link";

export const Footer = () => {
    return (
        <div className={'mx-auto text-center mt-8 mb-3'}>
            <Link
                href={"https://ro.wikipedia.org/wiki/Sondaje_de_opinie_pentru_alegerile_parlamentare_din_Rom%C3%A2nia,_2024"}
                target={"_blank"}
                className={'flex flex-row items-center align-middle font-medium text-blue-600 dark:text-blue-500 hover:underline'}
            >
                Sondaje de opinie alegeri parlamentare 2024
                <svg className="w-4 h-4 ms-2 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                     fill="none" viewBox="0 0 14 10">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                          d="M1 5h12m0 0L9 1m4 4L9 9"/>
                </svg>
            </Link>
        </div>
    )
}