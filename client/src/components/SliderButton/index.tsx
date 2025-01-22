export interface SliderButtonProps extends React.PropsWithChildren {
    onClick: () => void,
}

function SliderButton({onClick, children}: SliderButtonProps) {
    return (
        <button onClick={onClick} className="group" type="button">
            <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-gray-800/30 group-hover:bg-gray-800/60 group-focus:ring-gray-800/70 sm:h-10 sm:w-10">
                {children}
            </span>
        </button>
    )
}

export default SliderButton
