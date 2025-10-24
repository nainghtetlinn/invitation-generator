import { useState } from 'react'

import InvitationInput from './components/InvitationInput'
import GroupsInput from './components/GroupsInput'
import type { Groups, Invitation } from './schema'

const steps = [
  {
    title: 'Groups',
    component: GroupsInput,
  },
  {
    title: 'Invitation Details',
    component: InvitationInput,
  },
]

function App() {
  const [step, setStep] = useState(0)
  const next = () => setStep(prev => prev + 1)
  const prev = () => setStep(prev => prev - 1)

  const [data, setData] = useState<{ invitation: Invitation; groups: Groups }>()

  const StepComponent = steps[step].component

  return (
    <main className='container mx-auto'>
      <h1 className='text-center text-2xl font-bold text-base-content py-4'>
        Generate Invitation
      </h1>

      <section className='flex justify-center mb-6'>
        <ul className='steps'>
          {steps.map((s, i) => (
            <li
              key={s.title}
              className={`step ${step == i ? 'step-primary' : ''}`}
            >
              {s.title}
            </li>
          ))}
        </ul>
      </section>

      <section className='max-w-[400px] mx-auto px-2'>
        <StepComponent />
      </section>
    </main>
  )
}

export default App
