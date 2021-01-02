declare interface IExerciseItem {
  name: string
  deadline: string | Date
  type: 'Class' | 'BPMN' | 'Flow'
}
