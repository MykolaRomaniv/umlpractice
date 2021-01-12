declare type ExerciseType = 'Class' | 'BPMN' | 'Flow'
declare interface IExerciseItem {
  name: string
  deadline?: string | Date
  type: ExerciseType
  buttonText?: string
}
