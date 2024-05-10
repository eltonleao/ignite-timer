import { Play } from 'phosphor-react'
import { set, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as zod from 'zod'
import {
  CountDownContainer,
  FormContainer,
  HomeContainer,
  MinutesAmountInput,
  Separator,
  StartCountDownButton,
  TaskInput,
} from './styles'
import { useState } from 'react'

const newCycleFormSchema = zod.object({
  task: zod.string().min(1, 'A tarefa não pode ser vazia'),
  minutesAmout: zod
    .number()
    .min(5, 'O tempo deve ser entre 5 e 60')
    .max(60, 'O tempo deve ser entre 5 e 60'),
})

// interface NewCycleFormData {
//   task: string
//   minutesAmout: number
// }

type NewCycleFormData = zod.infer<typeof newCycleFormSchema>

interface Cycle {
  id: string
  task: string
  minutesAmout: number
}

export function Home() {
  const [cycles, setCycles] = useState<Cycle[]>([])
  const [activeCycleId, setActiveCycleId] = useState<string | null>(null)

  const { register, handleSubmit, watch, reset } = useForm<NewCycleFormData>({
    resolver: zodResolver(newCycleFormSchema),
    defaultValues: {
      task: '',
      minutesAmout: 0,
    },
  })

  function handleCreateNewCycle(data: NewCycleFormData) {
    console.log(data)
    const id = String(new Date().getTime())
    const newCycle: Cycle = {
      id,
      task: data.task,
      minutesAmout: data.minutesAmout,
    }

    setCycles((state: Cycle[]) => [...state, newCycle])
    setActiveCycleId(id)
    reset()
  }

  const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId)
  console.log('🚀 ~ Home ~ activeCycle:', activeCycle)

  const task = watch('task')
  const isSubmitDisabled = !task

  return (
    <HomeContainer>
      <form onSubmit={handleSubmit(handleCreateNewCycle)}>
        <FormContainer>
          <label htmlFor="task">Vou trabalhar em</label>
          <TaskInput
            id="task"
            list="task-suggestions"
            placeholder="Dê um nome para o seu projeto"
            {...register('task')}
          />

          <datalist id="task-suggestions">
            <option value="Projeto 1"></option>
            <option value="Projeto 2"></option>
            <option value="lorem"></option>
          </datalist>

          <label htmlFor="minutesAmout">durante</label>
          <MinutesAmountInput
            type="number"
            id="minutesAmout"
            placeholder="00"
            step={5}
            min={5}
            max={60}
            {...register('minutesAmout', {
              valueAsNumber: true,
            })}
          />

          <span>minutos.</span>
        </FormContainer>

        <CountDownContainer>
          <span>0</span>
          <span>0</span>
          <Separator>:</Separator>
          <span>0</span>
          <span>0</span>
        </CountDownContainer>

        <StartCountDownButton type="submit" disabled={isSubmitDisabled}>
          <Play size={24} />
          Começar
        </StartCountDownButton>
      </form>
    </HomeContainer>
  )
}
