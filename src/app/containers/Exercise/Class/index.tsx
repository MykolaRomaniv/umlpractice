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
import { RouteComponentProps } from 'react-router-dom'

import { deepEqual } from 'app/services/utils'
import styles from './styles.module.scss'
import materialCss from './materialCss'

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

const getDiagram = (data: string | undefined) => {
  if (data) {
    const diagramObj = JSON.parse(data)
    console.log(diagramObj.connectors)
    console.log(diagramObj.nodes)
  }
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
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
const compareNodes = (firstNode: NodeModel, secondNode: NodeModel): boolean => {
  if (firstNode.shape && secondNode.shape) {
    return deepEqual(firstNode.shape, secondNode.shape)
  }
  return false
}

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
const compareConnection = (
  firstConnection: ConnectorModel,
  secondConnection: ConnectorModel,
) => {
  return (
    firstConnection.type === secondConnection.type &&
    deepEqual(firstConnection.shape, secondConnection.shape)
  )
}

// const compareWithEtalon = (): boolean => {}

type IProps = RouteComponentProps & WithStyles<typeof materialCss>

interface IState {
  points: number
  nodesCounter: number
  connectorCount: number
  nodes: NodeModel[]
  connectors: ConnectorModel[]
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
    }
  }

  onGoBack = () => {
    const { history } = this.props
    history.goBack()
  }

  onCheckResult = () => {
    getDiagram(diagramInstance?.saveDiagram())
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

  render() {
    const { classes } = this.props
    const { points } = this.state

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
                  className={styles.btn}
                  onClick={() => {
                    diagramInstance?.add(
                      createClass(
                        this.getNewNodeId(),
                        100,
                        100,
                        'ClassName',
                        undefined,
                        this.addNode,
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
                      createInterface(
                        this.getNewNodeId(),
                        100,
                        100,
                        'InterfaceName',
                        undefined,
                        this.addNode,
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
                      createEnumeration(
                        this.getNewNodeId(),
                        100,
                        100,
                        'EnumName',
                        undefined,
                        this.addNode,
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
                  <div>{'Association'}</div>
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
                  <div>{'Aggregation'}</div>
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
                  <div>{'Composition'}</div>
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
                  <div>{'Dependency'}</div>
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
                  <div>{'Inheritance'}</div>
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
          <Typography variant="body1">
            {
              'Великий і скучний опис завдання. \n Lorem, ipsum dolor sit amet consectetur adipisicing elit. Explicabo, quae inventore. Animi cum rerum veniam, eius repudiandae, excepturi.'
            }
          </Typography>
          <Typography variant="subtitle2" className={classes.points}>
            {`Оцінка ${points}/5`}
          </Typography>
          <div className={styles.buttonWrapper}>
            <Button
              variant="contained"
              color="primary"
              onClick={this.onCheckResult}
            >
              {'Здати'}
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

export default withStyles(materialCss)(UMLClassDiagram)
