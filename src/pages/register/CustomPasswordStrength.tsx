interface Props {
  strength: 0 | 1 | 2 | 3
}

const CustomPasswordStrength: React.FC<Props> = ({ strength }) => {
  return (
    <div className='flex gap-1'>
      {Array.from({ length: strength + 1 }).map((_, index) => (
        <div
          key={index}
          className={`h-1 w-[25%] ${
            strength === 0
              ? 'bg-red-500'
              : strength === 1
              ? 'bg-yellow-500'
              : strength === 2
              ? 'bg-blue-500'
              : 'bg-green-500 grow'
          }`}
        ></div>
      ))}
    </div>
  )
}

export default CustomPasswordStrength
