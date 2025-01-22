import SliderButton, { SliderButtonProps } from "@/components/SliderButton"

function NextSliderButton({ onClick }: SliderButtonProps) {
    return (
        <SliderButton onClick={onClick}>
            <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5 text-white dark:text-gray-800 sm:h-6 sm:w-6" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7"></path>
            </svg>
        </SliderButton>
    )
}

export default NextSliderButton
