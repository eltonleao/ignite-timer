import { Play } from 'phosphor-react'
import { useForm } from 'react-hook-form'
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

export function Home() {
  const { register, handleSubmit, watch } = useForm<NewCycleFormData>({
    resolver: zodResolver(newCycleFormSchema),
    defaultValues: {
      task: '',
      minutesAmout: 0,
    },
  })

  function handleCreateNewCycle(data: unknown) {
    console.log(data)
  }

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

        <StartCountDownButton type="submit" disabled={!isSubmitDisabled}>
          <Play size={24} />
          Começar
        </StartCountDownButton>
      </form>
    </HomeContainer>
  )
}
