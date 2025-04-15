export function Avatar({name} : {name : string}) {
    return(
        <div className="relative inline-flex items-center justify-center w-9 h-9 overflow-hidden bg-gray-400 rounded-full dark:bg-gray-600 cursor-pointer">
    <span className="font-medium text-gray-800">{name[0]}</span>
</div>
    )
}