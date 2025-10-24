import { zodResolver } from '@hookform/resolvers/zod'
import dayjs from 'dayjs'
import { useForm } from 'react-hook-form'
import { departments, years } from '../constants'
import { invitationSchema, type Invitation } from '../schema'

const InvitationInput = () => {
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<Invitation>({ resolver: zodResolver(invitationSchema) })

  const onSubmit = (data: Invitation) => {
    console.log(data)
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className='space-y-4 flex flex-col items-center'
    >
      <label className={`w-full select ${errors.department && 'select-error'}`}>
        <span className='label'>Department</span>
        <select
          defaultValue='Select department'
          onChange={e => {
            const department = departments.find(a => a.short == e.target.value)
            if (department) setValue('department', department)
          }}
        >
          <option disabled>Select department</option>
          {departments.map(d => (
            <option
              key={d.short}
              value={d.short}
            >
              {d.long}
            </option>
          ))}
        </select>
      </label>
      <label className={`w-full select ${errors.year && 'select-error'}`}>
        <span className='label'>School year</span>
        <select
          defaultValue='Select school year'
          onChange={e => {
            const year = years.find(a => a.number == +e.target.value)
            if (year) setValue('year', year)
          }}
        >
          <option disabled>Select school year</option>
          {years.map(y => (
            <option
              key={y.number}
              value={y.number}
            >
              {y.text.toUpperCase()} YEAR
            </option>
          ))}
        </select>
      </label>
      <label
        className={`w-full input ${errors.schedule?.date && 'input-error'}`}
      >
        <span className='label'>Date</span>
        <input
          type='date'
          onChange={e => {
            const date = e.target.valueAsDate
            if (date) {
              setValue('schedule.date', dayjs(date).format('DD.MM.YYYY'))
              setValue('schedule.day', dayjs(date).format('dddd'))
              setValue(
                'academic.start',
                dayjs(date).subtract(1, 'year').format('YYYY')
              )
              setValue('academic.end', dayjs(date).format('YYYY'))
            }
          }}
        />
      </label>
      <label
        className={`w-full input ${errors.schedule?.time && 'input-error'}`}
      >
        <span className='label'>Time</span>
        <input
          type='time'
          onChange={e => {
            const timeString = e.target.value
            if (timeString) {
              const dateTime = `${dayjs().format('YYYY-MM-DD')}T${timeString}`
              setValue('schedule.time', dayjs(dateTime).format('hh:mm A'))
            }
          }}
        />
      </label>
      <label
        className={`w-full input ${errors.schedule?.place && 'input-error'}`}
      >
        <span className='label'>Place</span>
        <input
          type='text'
          placeholder='Eg. IT Seminar Room'
          {...register('schedule.place')}
        />
      </label>

      <div>
        <button className='btn btn-primary'>Next</button>
      </div>
    </form>
  )
}

export default InvitationInput
