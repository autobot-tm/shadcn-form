import RegisterForm from '@/pages/register/RegisterForm'

const RegisterPage = () => {
  return (
    <div className='w-full flex flex-col items-center justify-center'>
      <div className='min-w-[500px] border border-gray-300 px-12 py-6 rounded-md bg-white'>
        <RegisterForm />
      </div>
    </div>
  )
}

export default RegisterPage
