interface InputWithErrProps {
    error: string
    onChange: (e: any) => void
    placeholder: string
}

function InputWithErr({ error, onChange, placeholder }: InputWithErrProps) {
    return (
        <div className="relative">
            <input onChange={onChange} className="rounded-xl" type="text" placeholder={placeholder} />
            { error && <p className="absolute text-sm text-center text-red-500">{error}</p> }
        </div>
    )
}

export default InputWithErr
