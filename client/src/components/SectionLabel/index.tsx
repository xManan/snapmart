interface SectionLabelProps {
    label: string
}

function SectionLabel({ label }: SectionLabelProps) {
    return (
        <div className="flex items-center gap-4">
            <p className="text-sm text-gray-600 tracking-wider whitespace-nowrap">{ label }</p>
            <div className="bg-gray-300 w-full h-[1px]"></div>
        </div>
    )
}

export default SectionLabel
