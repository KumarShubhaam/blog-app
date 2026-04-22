interface ButtonProps {
 text?: string
 className?: string
}

function Button({text='click here', className=""}: ButtonProps) {

  return (
    <>
    <button className={`border rounded-full py-2 px-4 bg-black text-center text-white w-fit min-w-26 cursor-pointer + ${className}`}>{text}</button>
    </>
  )
}

export default Button;