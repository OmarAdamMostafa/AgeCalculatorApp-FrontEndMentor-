import Arrow from './assets/images/icon-arrow.svg'
import { useForm } from 'react-hook-form'
import { useState, useEffect } from 'react'
import moment from 'moment'

function App() {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm()
  const dateInfo = ['years', 'months', 'days']
  const currDate = {
    day: new Date().getDate(),
    month: new Date().getMonth() + 1,
    year: new Date().getFullYear(),
  }
  const [windowSize, setWindowSize] = useState()
  const [outputAge, setOutputAge] = useState({
    years: '--',
    months: '--',
    days: '--',
  })

  const calculateAge = (data) => {
    // Years
    outputAge.years = currDate.year - Number(data.year)

    // Months
    if (currDate.month >= Number(data.month)) {
      outputAge.months = currDate.month - Number(data.month)
    } else {
      outputAge.years--
      outputAge.months = 12 + currDate.month - Number(data.month)
    }

    // Days
    if (currDate.day >= Number(data.day)) {
      outputAge.days = currDate.day - Number(data.day)
    } else {
      outputAge.months--
      outputAge.days = 31 + currDate.day - Number(data.day)

      if (outputAge.months < 0) {
        outputAge.months = 11
        outputAge.years--
      }
    }
  }

  const onSubmit = (data) => {
    if (data.day.length == 1) {
      data.day = '0' + data.day
    }
    if (data.month.length == 1) {
      data.month = '0' + data.month
    }

    var inputDate = moment(`${data.year}-${data.month}-${data.day}`)
    var currentDate = `${currDate.year}-${currDate.month}-${currDate.day}`
    //Checking if date is still yet to come
    if (inputDate.diff(currentDate) > 0) {
      setError('day', { type: 'custom', message: 'Must be a valid day' })
      setError('month', { type: 'custom', message: 'Must be a valid month' })
      setError('year', { type: 'custom', message: 'Must be a valid year' })
    } else {
      //Checking if date is valid
      if (!inputDate.isValid()) {
        setError('day', { type: 'custom', message: 'Must be a valid day' })
      } else {
        calculateAge(data)
      }
    }
  }

  useEffect(() => {
    // Handler to call on window resize
    function handleResize() {
      // Set window width/height to state
      setWindowSize(window.innerWidth)
    }
    // Add event listener
    window.addEventListener('resize', handleResize)
    // Call handler right away so state gets updated with initial window size
    handleResize()
    console.log(windowSize)
    // Remove event listener on cleanup
    return () => window.removeEventListener('resize', handleResize)
  }, [windowSize])

  return (
    <main>
      {/* MAIN BOX */}
      <div className='w-full h-screen bg-slate-200 flex justify-center items-center font-poppins'>
        {/* SECONDARY BOX THAT SEPERATES INPUT AND OUTPUT */}
        <div className=' w-[90%] h-[500px] desktop:w-3/5 desktop:h-[600px] rounded-t-3xl rounded-bl-3xl rounded-br-[8rem] bg-white flex flex-col justify-start items-center py-14 '>
          {/* INPUT SIDE */}
          <form
            onSubmit={handleSubmit(onSubmit)}
            className='flex flex-col w-full justify-center'
          >
            {/* FORM */}
            <div className='flex items-center justify-center desktop:justify-start desktop:ml-14'>
              {/* EACH INPUT */}
              <div className='grid grid-cols-3 gap-3 desktop:gap-6 w-5/6 desktop:w-[80%]'>
                <div className='flex flex-col gap-2 '>
                  <label
                    className={`text-gray-500 text-sm font-bold tracking-[0.15rem] ${
                      errors.day && 'focus:text-red-500 text-red-500'
                    }`}
                  >
                    {'DAY'}
                  </label>
                  <input
                    type='number'
                    className={`border border-gray-300 rounded-md py-3 px-3 desktop:px-5 placeholder-gray-500 text-xl desktop:text-3xl font-bold 
                    ${
                      errors.day &&
                      'focus:border-red-500 focus:ring-red-500 border-red-500'
                    }`}
                    placeholder={'DD'}
                    {...register('day', {
                      required: 'Day is Required',
                      pattern: {
                        value: /^[0-9]+[0-9]*$/,
                        message: 'Must be a valid day',
                      },
                      min: {
                        value: 1,
                        message: 'Must be a valid day',
                      },
                      max: {
                        value: 31,
                        message: 'Must be a valid day',
                      },
                    })}
                  />
                  {errors.day && (
                    <p className='text-red-500 text-xs italic'>
                      {errors.day.message}
                    </p>
                  )}
                </div>
                <div className='flex flex-col gap-2 '>
                  <label
                    className={`text-gray-500 text-sm font-bold tracking-[0.15rem] ${
                      errors.month && 'focus:text-red-500 text-red-500'
                    }`}
                  >
                    {'MONTH'}
                  </label>
                  <input
                    type='number'
                    className={`border border-gray-300 rounded-md py-3 px-3 desktop:px-5 placeholder-gray-500 text-xl desktop:text-3xl font-bold ${
                      errors.month &&
                      'focus:border-red-500 focus:ring-red-500 border-red-500'
                    }`}
                    placeholder={'MM'}
                    {...register('month', {
                      required: 'Month is Required',
                      pattern: {
                        value: /^[0-9]+[0-9]*$/,
                        message: 'Must be a valid month',
                      },
                      min: {
                        value: 1,
                        message: 'Must be a valid month',
                      },
                      max: {
                        value: 12,
                        message: 'Must be a valid month',
                      },
                    })}
                  />
                  {errors.month && (
                    <p className='text-red-500 text-xs italic'>
                      {errors.month.message}
                    </p>
                  )}
                </div>
                <div className='flex flex-col gap-2 '>
                  <label
                    className={`text-gray-500 text-sm font-bold tracking-[0.15rem] ${
                      errors.year && 'focus:text-red-500 text-red-500'
                    }`}
                  >
                    {'YEAR'}
                  </label>
                  <input
                    type='number'
                    className={`border border-gray-300 rounded-md py-3 px-3 desktop:px-5 placeholder-gray-500 text-xl desktop:text-3xl font-bold ${
                      errors.year &&
                      'focus:border-red-500 focus:ring-red-500 border-red-500'
                    }`}
                    placeholder={'YYYY'}
                    {...register('year', {
                      required: 'Year is Required',
                      pattern: {
                        value: /^[1-9]+[0-9]*$/,
                        message: 'Must be a valid year',
                      },
                      max: {
                        value: currDate.year,
                        message: 'Must be a valid year',
                      },
                    })}
                  />
                  {errors.year && (
                    <p className='text-red-500 text-xs italic'>
                      {errors.year.message}
                    </p>
                  )}
                </div>
              </div>
            </div>
            {/* HORIZONTAL LINE & BUTTON */}
            <div className='mt-14 flex justify-center items-center relative  desktop:mt-5 desktop:justify-start'>
              <hr
                className={`w-[90%] desktop:w-[77%] desktop:ml-14 ${
                  windowSize >= '1024' ? '' : 'absolute'
                }`}
              />
              <button
                type='submit'
                className={`${windowSize >= '1024' ? '' : 'absolute'} `}
              >
                <img
                  src={Arrow}
                  alt='Arrow'
                  className='w-[52px] h-[52px] bg-[#854dff] rounded-full p-3 desktop:w-[80px] desktop:h-[80px] desktop:p-5'
                />
              </button>
            </div>
          </form>
          {/* OUTPUT SIDE */}
          <div className='flex flex-col justify-start items-center text-[52px] leading-[1] font-black w-5/6 mt-16 gap-3 desktop:text-[85px] desktop:mt-4'>
            {dateInfo.map((info, index) => {
              return (
                <div
                  className='flex justify-start
                  gap-2 items-center w-full italic desktop:gap-5'
                  key={index}
                >
                  <h1 className='text-[#854dff]'>
                    {info == 'years' && outputAge.years}
                    {info == 'months' && outputAge.months}
                    {info == 'days' && outputAge.days}
                  </h1>
                  <p>{info}</p>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </main>
  )
}

export default App
