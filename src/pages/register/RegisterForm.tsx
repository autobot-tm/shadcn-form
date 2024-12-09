import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { useEffect, useState } from 'react'
import CustomPasswordStrength from './CustomPasswordStrength'
import { passwordStrength } from 'check-password-strength'
import { Loader2 } from 'lucide-react'

interface IRegisterForm {
  name: string
  address: string
  phone: string
  email: string
  password: string
}

type Strength = 0 | 1 | 2 | 3

const formSchema = z.object({
  name: z
    .string()
    .min(2, { message: 'Name must be at least 2 characters.' })
    .max(50, { message: 'Name cannot exceed 50 characters.' }),
  address: z
    .string()
    .min(1, { message: 'Address is required' })
    .max(100, { message: 'Address cannot exceed 100 characters.' }),
  phone: z
    .string()
    .regex(
      /^[+]*([0-9]{1,4})?[-.\s]?\(?([0-9]{1,4})?\)?[-.\s]?[0-9]{1,4}[-.\s]?[0-9]{1,4}$/,
      { message: 'Please enter a valid phone number.' }
    )
    .min(10, { message: 'Phone number must be at least 10 digits.' }),
  email: z.string().email({ message: 'Invalid email address' }),
  password: z
    .string()
    .min(6, { message: 'Password must be at least 6 characters' })
    .refine((val) => /[A-Z]/.test(val), {
      message: 'Password must contain at least one uppercase letter',
    })
    .refine((val) => /[!@#$%^&*(),.?":{}|<>]/.test(val), {
      message: 'Password must contain at least one special character',
    })
    .refine((val) => /[a-z]/.test(val), {
      message: 'Password must contain at least one lowercase letter',
    }),
})

const RegisterForm = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false)
  const [strength, setStrength] = useState<Strength>(0)
  const [isLoading, setIsLoading] = useState<boolean>(false)

  // get form data when load page
  const data = JSON.parse(localStorage.getItem('formData') || '{}')

  const form = useForm<IRegisterForm>({
    mode: 'onChange',
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: data.name || '',
      address: data.address || '',
      phone: data.phone || '',
      email: data.email || '',
      password: data.password || '',
    },
  })

  const password = form.watch('password')

  function onSubmit(values: IRegisterForm) {
    try {
      if (values) {
        setIsLoading(true)
      }
    } catch (error) {
      console.log(error)
    } finally {
      setTimeout(() => {
        form.reset()
        setIsLoading(false)
      }, 2000)
    }
  }

  // saved form data
  useEffect(() => {
    const formValues = form.getValues()
    const formData = { ...formValues, password: '' }
    localStorage.setItem('formData', JSON.stringify(formData))
  }, [form])

  useEffect(() => {
    if (!password) {
      setStrength(0)
    }
    if (password) {
      const strengthValue = passwordStrength(password).id as Strength
      setStrength(strengthValue)
    }
  }, [password])

  return (
    <Form {...form}>
      <h1 className='text-3xl mb-8 font-bold'>Registration Form</h1>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
        <FormField
          control={form.control}
          name='name'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder='Enter your name' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='address'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Address</FormLabel>
              <FormControl>
                <Input placeholder='Enter your address' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='phone'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Phone</FormLabel>
              <FormControl>
                <Input placeholder='Enter your phone number' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='email'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder='Enter your email' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='password'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <div className='relative'>
                  <Input
                    {...field}
                    type={showPassword ? 'text' : 'password'}
                    placeholder='Enter your password'
                  />
                  <button
                    type='button'
                    className='absolute inset-y-0 right-0 px-3 text-gray-500'
                    onClick={() => setShowPassword((prev: boolean) => !prev)}
                  >
                    {showPassword ? '🙈' : '👁️'}
                  </button>
                </div>
              </FormControl>
              {field.value && <CustomPasswordStrength strength={strength} />}
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type='submit' className='mt-10'>
          {isLoading ? <Loader2 className='animate-spin' /> : 'Submit'}
        </Button>
      </form>
    </Form>
  )
}

export default RegisterForm
