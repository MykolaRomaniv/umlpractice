/* eslint-disable camelcase */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable no-param-reassign */
/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable no-plusplus */
/* eslint-disable no-return-assign */
import * as React from 'react'
import {
  DiagramComponent,
  // Diagram,
  ShapeAnnotationModel,
  NodeModel,
  ConnectorModel,
  UmlClassifierShapeModel,
  UmlEnumerationMemberModel,
  TextStyleModel,
  ShapeStyleModel,
  AssociationFlow,
  Multiplicity,
  ClassifierShape,
} from '@syncfusion/ej2-react-diagrams'
import { ToolbarComponent } from '@syncfusion/ej2-react-navigations'
import { UploaderComponent } from '@syncfusion/ej2-react-inputs'
import Typography from '@material-ui/core/Typography'
import Container from '@material-ui/core/Container'
import Button from '@material-ui/core/Button'
import { WithStyles, withStyles } from '@material-ui/core/styles'
import { enableRipple } from '@syncfusion/ej2-base'
import TextField from '@material-ui/core/TextField'
import { RouteComponentProps } from 'react-router-dom'
import { connect, ConnectedProps } from 'react-redux'
import { bindActionCreators, Dispatch } from 'redux'
import classnames from 'classnames'

import { deepEqual } from 'app/services/utils'
import { ReduxState } from 'app/types'
import { AllAction } from 'app/store/action'
import userActions from 'app/store/user/actions'
import Aggregation_Ico from '../../../../assets/Aggregation_Ico.png'
import Association_Ico from '../../../../assets/Association_Ico.png'
import Composition_Ico from '../../../../assets/Composition_Ico.png'
import Dependency_Ico from '../../../../assets/Dependency_Ico.png'
import Extension_Ico from '../../../../assets/Extension_Ico.png'
// import Extension_Ico from '../../../../assets/Extension_Ico'

import materialCss from './materialCss'
import styles from './styles.module.scss'

enableRipple(true)

let diagramInstance: DiagramComponent | null

const createConnection = (
  id: string,
  relationship: ClassifierShape,
  associationType?: AssociationFlow,
  multiplicityType?: Multiplicity,
  onSuccess?: (connector: ConnectorModel) => void,
): ConnectorModel => {
  const connector: ConnectorModel = {
    id,
    // Define connector start and end points
    sourcePoint: { x: 100, y: 100 },
    targetPoint: { x: 200, y: 200 },
    type: 'Straight',
    shape: {
      type: 'UmlClassifier',
      relationship,
      // Define type of association
      // association: 'Directional',
      associationType,
      multiplicity: {
        type: multiplicityType,
      },
    },
  }
  onSuccess?.(connector)
  return connector
}

// create class Property
const createProperty = (name: string, type: string): object => ({ name, type })

// create class Methods
const createMethods = (name: string, type: string): object => ({ name, type })

const createEnumMember = (
  name: string,
  value: string,
  isSeparator?: boolean,
  style?: ShapeStyleModel | TextStyleModel,
): UmlEnumerationMemberModel => {
  return { name, value, isSeparator, style }
}

// Create class Diagram shapes.
const createClass = (
  id: string,
  offsetX: number,
  offsetY: number,
  name: string,
  style?: TextStyleModel,
  onSuccess?: (node: NodeModel) => void,
): NodeModel => {
  const node: NodeModel = {}
  node.id = id
  node.offsetX = offsetX
  node.offsetY = offsetY
  node.shape = {
    type: 'UmlClassifier',
    classShape: {
      name,
      attributes: [createProperty('property', 'type')],
      methods: [createMethods('method', 'returnType')],
      style,
    },
    classifier: 'Class',
  } as UmlClassifierShapeModel
  onSuccess?.(node)
  return node
}

const createInterface = (
  id: string,
  offsetX: number,
  offsetY: number,
  name: string,
  style?: TextStyleModel,
  onSuccess?: (node: NodeModel) => void,
) => {
  const node: NodeModel = {}
  node.id = id
  node.offsetX = offsetX
  node.offsetY = offsetY
  node.shape = {
    type: 'UmlClassifier',
    interfaceShape: {
      name,
      attributes: [createProperty('property', 'type')],
      methods: [createMethods('method', 'returnType')],
      style,
      isSeparator: true,
    },
    classifier: 'Interface',
  } as UmlClassifierShapeModel
  onSuccess?.(node)
  return node
}

const createEnumeration = (
  id: string,
  offsetX: number,
  offsetY: number,
  name: string,
  style?: TextStyleModel,
  onSuccess?: (node: NodeModel) => void,
) => {
  const node: NodeModel = {}
  node.id = id
  node.offsetX = offsetX
  node.offsetY = offsetY
  node.shape = {
    type: 'UmlClassifier',
    enumerationShape: {
      name,
      members: [createEnumMember('Name', 'Value')],
      style,
    },
    classifier: 'Enumeration',
  } as UmlClassifierShapeModel
  onSuccess?.(node)
  return node
}

const openPalette = () => {
  const paletteSpace = document.getElementById('palette-space')
  const isMobile = window.matchMedia('(max-width:550px)').matches
  if (isMobile) {
    if (!paletteSpace?.classList.contains('sb-mobile-palette-open')) {
      paletteSpace?.classList.add('sb-mobile-palette-open')
    } else {
      paletteSpace.classList.remove('sb-mobile-palette-open')
    }
  }
}

const download = (data: string | undefined) => {
  if (data) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    if (window.navigator.msSaveBlob) {
      const blob = new Blob([data], { type: 'data:text/json;charset=utf-8,' })
      window.navigator.msSaveOrOpenBlob(blob, 'Diagram.json')
    } else {
      const dataStr = `data:text/json;charset=utf-8,${encodeURIComponent(data)}`
      const a = document.createElement('a')
      a.href = dataStr
      a.download = 'Diagram.json'
      document.body.appendChild(a)
      a.click()
      a.remove()
    }
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const getDiagram = (data: string | undefined): any => {
  if (data) {
    const diagramObj = JSON.parse(data)
    // console.log(diagramObj.connectors)
    // console.log(diagramObj.nodes)
    return diagramObj
  }
  return null
}

// Load the diagraming object.
const loadDiagram = (event: ProgressEvent<FileReader>) => {
  if (event?.target?.result) {
    diagramInstance?.loadDiagram(event.target.result as string)
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const onUploadSuccess = (args: any) => {
  const file1 = args.file
  const file = file1.rawFile
  const reader = new FileReader()
  reader.readAsText(file)
  reader.onloadend = loadDiagram
}

// const compareConnection = (
//   firstConnection: ConnectorModel,
//   secondConnection: ConnectorModel,
// ) => {
//   return (
//     firstConnection.type === secondConnection.type &&
//     deepEqual(firstConnection.shape, secondConnection.shape)
//   )
// }

// const compareWithEtalon = (): boolean => {}

const mapStateToProps = (state: ReduxState) => ({
  userType: state.user.userData?.type,
  currentTask: state.user.currentTask,
})

const mapDispatchToProps = (dispatch: Dispatch<AllAction>) => ({
  actions: bindActionCreators(userActions, dispatch),
})

const reduxConnector = connect(mapStateToProps, mapDispatchToProps)

type IProps = RouteComponentProps &
  WithStyles<typeof materialCss> &
  ConnectedProps<typeof reduxConnector>

interface IState {
  points: number
  nodesCounter: number
  connectorCount: number
  nodes: NodeModel[]
  connectors: ConnectorModel[]
  description: string
  taskName: string
  // correctNodes: number
}

class UMLClassDiagram extends React.PureComponent<IProps, IState> {
  constructor(props: IProps) {
    super(props)
    this.state = {
      points: 0,
      nodesCounter: 0,
      connectorCount: 0,
      nodes: [],
      connectors: [],
      description: '',
      taskName: '',
      // correctNodes: 0,
    }
  }

  onGoBack = () => {
    const { history } = this.props
    history.goBack()
  }

  getMaxPoints = () => {
    const { currentTask } = this.props
    return currentTask
      ? currentTask.nodes.length + currentTask.connectors.length
      : 1
  }

  // compareNodes = (): number => {
  //   const { nodes } = this.state
  //   const { currentTask } = this.props
  //   if (currentTask) {
  //     let etalonNodes = [...currentTask.nodes]
  //     let correctNodes = 0
  //     nodes.forEach((userNode) => {
  //       const foundNode = etalonNodes.find((taskNode) =>
  //         deepEqual(taskNode.shape, userNode.shape),
  //       )
  //       if (foundNode) {
  //         etalonNodes = etalonNodes.filter((node) => node.id !== foundNode.id)
  //         correctNodes += 1
  //       }
  //     })
  //     return correctNodes
  //   }
  //   return 0
  // }

  compare = (type: 'nodes' | 'connectors'): number => {
    const { connectors, nodes } = this.state
    const { currentTask } = this.props
    if (currentTask) {
      const comparator: Array<NodeModel | ConnectorModel> =
        type === 'nodes' ? nodes : connectors
      let etalon: Array<NodeModel | ConnectorModel> =
        type === 'nodes' ? [...currentTask.nodes] : [...currentTask.connectors]
      let correctAnswers = 0
      comparator.forEach((userAnswer) => {
        const found = etalon.find((taskAnswer) =>
          deepEqual(taskAnswer.shape, userAnswer.shape),
        )
        if (found) {
          etalon = etalon.filter((el) => el.id !== found.id)
          correctAnswers += 1
        }
      })
      return correctAnswers
    }
    return 0
  }

  onSendResult = () => {
    const { userType, actions } = this.props
    const { description, taskName, nodes, connectors } = this.state
    const diagram = getDiagram(diagramInstance?.saveDiagram())
    // console.log('diagramInstance?.connectors', diagramInstance?.connectors)
    // console.log(
    //   'diagramInstance?.getConnectorObject',
    //   diagramInstance?.getConnectorObject(connectors[0].id || ''),
    // )
    if (userType === 'student') {
      const correctPoints = this.compare('nodes') + this.compare('connectors')
      // console.log(
      //   '🚀 ~ file: index.tsx ~ line 348 ~ UMLClassDiagram ~ this.compareNodes()',
      //   this.compare('nodes'),
      // )
      // console.log(
      //   '🚀 ~ file: index.tsx ~ line 350 ~ UMLClassDiagram ~ this.compareConnectors()',
      //   this.compare('connectors'),
      // )

      this.setState({ points: correctPoints })
    } else {
      // TODO pass correct object
      actions.createTask({
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        taskData: diagram as any,
        description,
        taskName,
        type: 'Class',
        nodes,
        connectors,
      })
    }
  }

  getNewNodeId = () => {
    const { nodesCounter } = this.state
    this.setState((prevState) => ({
      nodesCounter: prevState.nodesCounter + 1,
    }))
    return `node${nodesCounter}`
  }

  getNewConnectorId = () => {
    const { connectorCount } = this.state
    this.setState((prevState) => ({
      connectorCount: prevState.connectorCount + 1,
    }))
    return `connector${connectorCount}`
  }

  addNode = (node: NodeModel) => {
    this.setState((prevState) => ({ nodes: [...prevState.nodes, node] }))
    return node
  }

  addConnector = (connector: ConnectorModel) => {
    this.setState((prevState) => ({
      connectors: [...prevState.connectors, connector],
    }))
    return connector
  }

  onDescriptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ description: event.target.value })
  }

  onTaskNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ taskName: event.target.value })
  }

  render() {
    const { classes, userType, currentTask } = this.props
    const { points, description, taskName } = this.state

    return (
      <div>
        <div className="control-section">
          <ToolbarComponent
            id="toolbar_diagram"
            style={{ width: '100%', height: '10%', marginTop: '10px' }}
            clicked={(args) => {
              if (args?.item.text === 'New') {
                diagramInstance?.clear()
              } else if (args?.item.text === 'Load') {
                document
                  ?.getElementsByClassName('e-file-select-wrap')[0]
                  ?.querySelector('button')
                  ?.click()
              } else if (args?.item.id === 'palette-icon') {
                openPalette()
              } else {
                download(diagramInstance?.saveDiagram())
              }
            }}
            items={[
              {
                id: 'palette-icon',
                prefixIcon: 'e-ddb-icons2 e-toggle-palette',
                align: 'Right',
              },
              {
                text: 'New',
                tooltipText: 'New',
                prefixIcon: 'e-diagram-icons e-diagram-new',
              },
              { type: 'Separator' },
              {
                text: 'Save',
                tooltipText: 'Save',
                prefixIcon: 'e-diagram-icons e-diagram-save',
              },
              { type: 'Separator' },
              {
                text: 'Load',
                tooltipText: 'Load',
                prefixIcon: 'e-diagram-icons e-diagram-open',
              },
            ]}
          />
          <div className={styles.contentWrapper}>
            <div className={styles.palette}>
              <div className={styles.paletteSection}>
                {/* TODO refactor */}
                <button
                  id="class"
                  aria-label="Btn"
                  type="button"
                  className={classnames([styles.btn])}
                  onClick={() => {
                    diagramInstance?.add(
                      this.addNode(
                        createClass(this.getNewNodeId(), 100, 100, 'ClassName'),
                      ),
                    )
                  }}
                >
                  <div>{'Class'}</div>
                </button>
                <button
                  id="interface"
                  aria-label="Btn"
                  type="button"
                  className={styles.btn}
                  onClick={() => {
                    diagramInstance?.add(
                      this.addNode(
                        createInterface(
                          this.getNewNodeId(),
                          100,
                          100,
                          'InterfaceName',
                        ),
                      ),
                    )
                  }}
                >
                  <div>{'Interface'}</div>
                </button>
                <button
                  id="enumeration"
                  aria-label="Btn"
                  type="button"
                  className={styles.btn}
                  onClick={() => {
                    diagramInstance?.add(
                      this.addNode(
                        createEnumeration(
                          this.getNewNodeId(),
                          100,
                          100,
                          'EnumName',
                        ),
                      ),
                    )
                  }}
                >
                  <div>{'Enum'}</div>
                </button>
              </div>
              <div className={styles.paletteSection}>
                <button
                  id="association"
                  aria-label="Btn"
                  type="button"
                  className={styles.btn}
                  onClick={() => {
                    diagramInstance?.add(
                      this.addConnector(
                        createConnection(
                          this.getNewConnectorId(),
                          'Association',
                        ),
                      ),
                    )
                  }}
                >
                  <img
                    style={{ width: '100%', height: '100%' }}
                    alt="img"
                    src={Association_Ico}
                  />
                </button>
                <button
                  id="aggregation"
                  aria-label="Btn"
                  type="button"
                  className={styles.btn}
                  onClick={() => {
                    diagramInstance?.add(
                      this.addConnector(
                        createConnection(
                          this.getNewConnectorId(),
                          'Aggregation',
                        ),
                      ),
                    )
                  }}
                >
                  <img
                    style={{ width: '100%', height: '100%' }}
                    alt="img"
                    src={Aggregation_Ico}
                  />
                </button>
                <button
                  id="composition"
                  aria-label="Btn"
                  type="button"
                  className={styles.btn}
                  onClick={() => {
                    diagramInstance?.add(
                      this.addConnector(
                        createConnection(
                          this.getNewConnectorId(),
                          'Composition',
                        ),
                      ),
                    )
                  }}
                >
                  <img
                    style={{ width: '100%', height: '100%' }}
                    alt="img"
                    src={Composition_Ico}
                  />
                </button>
                <button
                  id="dependency"
                  aria-label="Btn"
                  type="button"
                  className={styles.btn}
                  onClick={() => {
                    diagramInstance?.add(
                      this.addConnector(
                        createConnection(
                          this.getNewConnectorId(),
                          'Dependency',
                        ),
                      ),
                    )
                  }}
                >
                  <img
                    style={{ width: '100%', height: '100%' }}
                    alt="img"
                    src={Dependency_Ico}
                  />
                </button>
                <button
                  id="inheritance"
                  aria-label="Btn"
                  type="button"
                  className={styles.btn}
                  onClick={() => {
                    diagramInstance?.add(
                      this.addConnector(
                        createConnection(
                          this.getNewConnectorId(),
                          'Inheritance',
                        ),
                      ),
                    )
                  }}
                >
                  <img
                    style={{ width: '100%', height: '100%' }}
                    alt="img"
                    src={Extension_Ico}
                  />
                </button>
              </div>
            </div>
            <DiagramComponent
              id="diagram"
              width="85%"
              height="700px"
              ref={(diagram) => (diagramInstance = diagram)}
              // Sets the default values of a node
              getNodeDefaults={(obj: NodeModel) => {
                obj.style = { fill: '#26A0DA', strokeColor: 'white' }
                return obj
              }}
              // Sets the default values of a connector
              getConnectorDefaults={(connector: ConnectorModel) => {
                return connector
              }}
              // set an label style for nodes
              setNodeTemplate={(node: NodeModel) => {
                if (node.annotations && node.annotations.length > 0) {
                  for (let i = 0; i < node.annotations.length; i++) {
                    const annotation: ShapeAnnotationModel = node.annotations[i]
                    if (annotation && annotation.style) {
                      annotation.style.color = 'white'
                    }
                  }
                }
              }}
            />
          </div>
          <div className={styles.uploaderComponent}>
            <UploaderComponent
              type="file"
              id="fileupload"
              asyncSettings={{
                saveUrl:
                  'https://aspnetmvc.syncfusion.com/services/api/uploadbox/Save',
                removeUrl:
                  'https://aspnetmvc.syncfusion.com/services/api/uploadbox/Remove',
              }}
              success={onUploadSuccess}
            />
          </div>
        </div>

        <Container maxWidth="sm" className={styles.taskDescription}>
          <Typography variant="h3" gutterBottom>
            {'Опис завдання'}
          </Typography>
          {userType === 'student' ? (
            <Typography variant="body1">{currentTask?.description}</Typography>
          ) : (
            <TextField
              id="outlined-multiline-static"
              label="Опис"
              multiline
              rows={4}
              placeholder="Опис завдання"
              variant="outlined"
              value={description}
              onChange={this.onDescriptionChange}
              className={classes.descriptionTextField}
            />
          )}
          {userType === 'student' ? (
            <Typography variant="subtitle2" className={classes.points}>
              {`Оцінка ${((points * 100) / this.getMaxPoints()).toFixed(0)}%`}
            </Typography>
          ) : (
            <TextField
              id="outlined-multiline-static"
              label="Назва"
              placeholder="Назва завдання"
              variant="outlined"
              value={taskName}
              onChange={this.onTaskNameChange}
              className={classes.descriptionTextField}
            />
          )}
          <div className={styles.buttonWrapper}>
            <Button
              variant="contained"
              color="primary"
              onClick={this.onSendResult}
            >
              {'Відправити'}
            </Button>
            <Button variant="contained" color="default" onClick={this.onGoBack}>
              {'Повернутись'}
            </Button>
          </div>
        </Container>
      </div>
    )
  }
}

export default reduxConnector(withStyles(materialCss)(UMLClassDiagram))
