/* eslint-disable no-bitwise */
/* eslint-disable no-plusplus */
/* eslint-disable no-return-assign */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-param-reassign */
/* eslint-disable @typescript-eslint/ban-ts-comment */
import './styles.css'
import * as React from 'react'
import {
  SymbolPaletteComponent,
  DiagramComponent,
  Node,
  NodeModel,
  UmlClassifierShapeModel,
  NodeConstraints,
  ConnectorModel,
  // ConnectorModel,
} from '@syncfusion/ej2-react-diagrams'
import { ToolbarComponent } from '@syncfusion/ej2-react-navigations'
import { UploaderComponent } from '@syncfusion/ej2-react-inputs'
import SampleBase from '../sample-base'

let diagramInstance: DiagramComponent | null

// Load the diagraming object.
function loadDiagram(event: any) {
  diagramInstance?.loadDiagram(event.target.result)
}

function onUploadSuccess(args: any) {
  const file1 = args.file
  const file = file1.rawFile
  const reader = new FileReader()
  reader.readAsText(file)
  reader.onloadend = loadDiagram
}

// save the diagram object in json data.
function download(data: any) {
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
// create and add ports for Node.
// function getPorts(obj: any) {
//   const ports = [
//     { id: 'port1', shape: 'Circle', offset: { x: 0, y: 0.5 } },
//     { id: 'port2', shape: 'Circle', offset: { x: 0.5, y: 1 } },
//     { id: 'port3', shape: 'Circle', offset: { x: 1, y: 0.5 } },
//     { id: 'port4', shape: 'Circle', offset: { x: 0.5, y: 0 } },
//   ]
//   const additionalports = [
//     { id: 'port2', shape: 'Circle', offset: { x: 0.5, y: 1 } },
//     { id: 'port4', shape: 'Circle', offset: { x: 0.5, y: 0 } },
//   ]
//   if (obj.id === 'Data') {
//     return additionalports
//   }

//   return ports
// }
function openPalette() {
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

// create class Property
function createProperty(name: string, type: string): Record<string, unknown> {
  return { name, type }
}

// create class Methods
function createMethods(name: string, type: string): Record<string, unknown> {
  return { name, type }
}

// Create class Diagram shapes.
function createNode(
  id: string,
  offsetX: number,
  offsetY: number,
  className: string,
): NodeModel {
  const node: NodeModel = {}
  node.id = id
  node.offsetX = offsetX
  node.offsetY = offsetY
  node.shape = {
    type: 'UmlClassifier',
    classShape: {
      name: className,
      attributes: [createProperty('property', 'type')],
      methods: [createMethods('method', 'returnType')],
    },
    classifier: 'Class',
  } as UmlClassifierShapeModel
  return node
}
// Create a connector.
// function createConnector(
//   id: string,
//   sourceID: string,
//   targetID: string,
// ): ConnectorModel {
//   const connector: ConnectorModel = {}
//   connector.id = id
//   connector.sourceID = sourceID
//   connector.targetID = targetID
//   return connector
// }

// Initializes the nodes for the diagram
const nodes: NodeModel[] = [
  {
    id: 'Start',
    height: 50,
    width: 100,
    offsetX: 250,
    offsetY: 60,
    shape: { type: 'Flow', shape: 'Terminator' },
    annotations: [
      {
        content: 'Start',
      },
    ],
    style: { fill: '#d0f0f1', strokeColor: '#797979' },
  },
  {
    id: 'Alarm',
    height: 50,
    width: 100,
    offsetX: 250,
    offsetY: 160,
    shape: { type: 'Flow', shape: 'Process' },
    annotations: [
      {
        content: 'Alarm Rings',
      },
    ],
    style: { fill: '#fbfdc5', strokeColor: '#797979' },
  },
  {
    id: 'Ready',
    height: 80,
    width: 100,
    offsetX: 250,
    offsetY: 260,
    shape: { type: 'Flow', shape: 'Decision' },
    annotations: [
      {
        content: 'Ready to Get Up?',
        margin: { top: 10, left: 10, right: 10, bottom: 10 },
      },
    ],
    style: { fill: '#c5efaf', strokeColor: '#797979' },
  },
  {
    id: 'Climb',
    height: 50,
    width: 100,
    offsetX: 250,
    offsetY: 370,
    shape: { type: 'Flow', shape: 'Process' },
    annotations: [
      {
        content: 'Climb Out of Bed',
      },
    ],
    style: { fill: '#fbfdc5', strokeColor: '#797979' },
  },
  {
    id: 'End',
    height: 50,
    width: 100,
    offsetX: 250,
    offsetY: 460,
    shape: { type: 'Flow', shape: 'Terminator' },
    annotations: [
      {
        content: 'End',
      },
    ],
    style: { fill: '#d0f0f1', strokeColor: '#797979' },
  },
  {
    id: 'Relay',
    height: 50,
    width: 100,
    offsetX: 450,
    offsetY: 160,
    shape: { type: 'Flow', shape: 'Delay' },
    annotations: [
      {
        content: 'Relay',
      },
    ],
    style: { fill: '#f8eee5', strokeColor: '#797979' },
  },
  {
    id: 'Hit',
    height: 50,
    width: 100,
    offsetX: 450,
    offsetY: 260,
    shape: { type: 'Flow', shape: 'Process' },
    annotations: [
      {
        content: 'Hit Snooze Button',
        margin: { top: 10, left: 10, right: 10, bottom: 10 },
      },
    ],
    style: { fill: '#fbfdc5', strokeColor: '#797979' },
  },
]

const interval = [
  1,
  9,
  0.25,
  9.75,
  0.25,
  9.75,
  0.25,
  9.75,
  0.25,
  9.75,
  0.25,
  9.75,
  0.25,
  9.75,
  0.25,
  9.75,
  0.25,
  9.75,
  0.25,
  9.75,
]
const gridlines = {
  lineColor: '#e0e0e0',
  lineIntervals: interval,
}
// Initializes the connector for the diagram
const connectors = [
  {
    id: 'connector1',
    sourceID: 'Start',
    targetID: 'Alarm',
  },
  { id: 'connector2', sourceID: 'Alarm', targetID: 'Ready' },
  {
    id: 'connector3',
    sourceID: 'Ready',
    targetID: 'Climb',
    annotations: [{ content: 'Yes', style: { fill: 'white' } }],
  },
  { id: 'connector4', sourceID: 'Climb', targetID: 'End' },
  {
    id: 'connector5',
    sourceID: 'Ready',
    targetID: 'Hit',
    annotations: [{ content: 'No', style: { fill: 'white' } }],
  },
  { id: 'connector6', sourceID: 'Hit', targetID: 'Relay' },
  { id: 'connector7', sourceID: 'Relay', targetID: 'Alarm' },
]
// Initialize the flowshapes for the symbol palatte
const flowshapes: NodeModel[] = [
  { id: 'Terminator', shape: { type: 'Flow', shape: 'Terminator' } },
  { id: 'Process', shape: { type: 'Flow', shape: 'Process' } },
  { id: 'Decision', shape: { type: 'Flow', shape: 'Decision' } },
  { id: 'Document', shape: { type: 'Flow', shape: 'Document' } },
  {
    id: 'PreDefinedProcess',
    shape: { type: 'Flow', shape: 'PreDefinedProcess' },
  },
  { id: 'PaperTap', shape: { type: 'Flow', shape: 'PaperTap' } },
  { id: 'DirectData', shape: { type: 'Flow', shape: 'DirectData' } },
  { id: 'SequentialData', shape: { type: 'Flow', shape: 'SequentialData' } },
  { id: 'Sort', shape: { type: 'Flow', shape: 'Sort' } },
  { id: 'MultiDocument', shape: { type: 'Flow', shape: 'MultiDocument' } },
  { id: 'Collate', shape: { type: 'Flow', shape: 'Collate' } },
  { id: 'SummingJunction', shape: { type: 'Flow', shape: 'SummingJunction' } },
  { id: 'Or', shape: { type: 'Flow', shape: 'Or' } },
  { id: 'InternalStorage', shape: { type: 'Flow', shape: 'InternalStorage' } },
  { id: 'Extract', shape: { type: 'Flow', shape: 'Extract' } },
  { id: 'ManualOperation', shape: { type: 'Flow', shape: 'ManualOperation' } },
  { id: 'Merge', shape: { type: 'Flow', shape: 'Merge' } },
  {
    id: 'OffPageReference',
    shape: { type: 'Flow', shape: 'OffPageReference' },
  },
  {
    id: 'SequentialAccessStorage',
    shape: { type: 'Flow', shape: 'SequentialAccessStorage' },
  },
  { id: 'Annotation', shape: { type: 'Flow', shape: 'Annotation' } },
  { id: 'Annotation2', shape: { type: 'Flow', shape: 'Annotation2' } },
  { id: 'data', shape: { type: 'Flow', shape: 'Data' } },
  { id: 'Card', shape: { type: 'Flow', shape: 'Card' } },
  { id: 'Delay', shape: { type: 'Flow', shape: 'Delay' } },
]
const bpmnShapes: NodeModel[] = [
  {
    id: 'Start',
    width: 35,
    height: 35,
    shape: {
      type: 'Bpmn',
      shape: 'Event',
      event: { event: 'Start' },
    },
  },
  {
    id: 'NonInterruptingIntermediate',
    width: 35,
    height: 35,
    shape: {
      type: 'Bpmn',
      shape: 'Event',
      event: { event: 'NonInterruptingIntermediate' },
    },
  },
  {
    id: 'End',
    width: 35,
    height: 35,
    offsetX: 665,
    offsetY: 230,
    shape: {
      type: 'Bpmn',
      shape: 'Event',
      event: { event: 'End' },
    },
  },
  {
    id: 'Task',
    width: 35,
    height: 35,
    offsetX: 700,
    offsetY: 700,
    shape: {
      type: 'Bpmn',
      shape: 'Activity',
      activity: {
        activity: 'Task',
      },
    },
  },
  {
    id: 'Transaction',
    width: 35,
    height: 35,
    offsetX: 300,
    offsetY: 100,
    constraints: NodeConstraints.Default | NodeConstraints.AllowDrop,
    shape: {
      type: 'Bpmn',
      shape: 'Activity',
      activity: {
        activity: 'SubProcess',
        subProcess: {
          type: 'Transaction',
          transaction: {
            cancel: { visible: false },
            failure: { visible: false },
            success: { visible: false },
          },
        },
      },
    },
  },
  {
    id: 'Task_Service',
    width: 35,
    height: 35,
    offsetX: 700,
    offsetY: 700,
    shape: {
      type: 'Bpmn',
      shape: 'Activity',
      activity: {
        activity: 'Task',
        task: { type: 'Service' },
      },
    },
  },
  {
    id: 'Gateway',
    width: 35,
    height: 35,
    offsetX: 100,
    offsetY: 100,
    shape: { type: 'Bpmn', shape: 'Gateway', gateway: { type: 'Exclusive' } },
  },
  {
    id: 'DataObject',
    width: 35,
    height: 35,
    offsetX: 500,
    offsetY: 100,
    shape: {
      type: 'Bpmn',
      shape: 'DataObject',
      dataObject: { collection: false, type: 'None' },
    },
  },
  {
    id: 'subProcess',
    width: 520,
    height: 250,
    offsetX: 355,
    offsetY: 230,
    constraints: NodeConstraints.Default | NodeConstraints.AllowDrop,
    shape: {
      shape: 'Activity',
      type: 'Bpmn',
      activity: {
        activity: 'SubProcess',
        subProcess: {
          type: 'Transaction',
          collapsed: false,
          processes: [],
          transaction: {
            cancel: { visible: false },
            failure: { visible: false },
            success: { visible: false },
          },
        },
      },
    },
  },
]

// @ts-ignore
const bpmnConnectors: ConnectorModel[] = [
  { id: 'connector1', sourceID: 'start', targetID: 'subProcess' },
  {
    id: 'connector2',
    sourceID: 'subProcess',
    sourcePortID: 'success',
    targetID: 'end',
  },
  {
    id: 'connector3',
    sourceID: 'subProcess',
    sourcePortID: 'failure',
    targetID: 'hazardEnd',
    type: 'Orthogonal',
    segments: [{ type: 'Orthogonal', length: 50, direction: 'Bottom' }],
    annotations: [
      {
        id: 'connector3Label2',
        content: 'Booking system failure',
        offset: 0.5,
        style: { fill: 'white' },
      },
    ],
  },
  {
    id: 'connector4',
    sourceID: 'subProcess',
    sourcePortID: 'cancel',
    targetID: 'cancelledEnd',
    type: 'Orthogonal',
    segments: [{ type: 'Orthogonal', length: 50, direction: 'Bottom' }],
  },
  {
    id: 'connector5',
    sourceID: 'processesStart',
    targetID: 'service',
    type: 'Orthogonal',
  },
  { id: 'connector6', sourceID: 'service', targetID: 'processesTask' },
  {
    id: 'connector7',
    sourceID: 'processesTask',
    targetID: 'processesEnd',
    type: 'Orthogonal',
  },
  {
    id: 'connector8',
    sourceID: 'compensation',
    targetID: 'user',
    type: 'Orthogonal',
    shape: {
      type: 'Bpmn',
      flow: 'Association',
      association: 'Directional',
    },
    style: {
      strokeDashArray: '2,2',
    },
    segments: [
      { type: 'Orthogonal', length: 30, direction: 'Bottom' },
      { type: 'Orthogonal', length: 80, direction: 'Right' },
    ],
  },
  {
    id: 'connector9',
    sourceID: 'error',
    targetID: 'subProcessesEnd',
    type: 'Orthogonal',
    annotations: [
      {
        id: 'connector9Label2',
        content: 'Cannot charge card',
        offset: 0.5,
        style: { fill: 'white', color: 'black' },
      },
    ],
    segments: [{ type: 'Orthogonal', length: 50, direction: 'Bottom' }],
  },
]
// Initializes connector symbols for the symbol palette
// @ts-ignore
const connectorSymbols = [
  {
    id: 'Link1',
    type: 'Orthogonal',
    sourcePoint: { x: 0, y: 0 },
    targetPoint: { x: 40, y: 40 },
    targetDecorator: {
      shape: 'Arrow',
      style: { strokeColor: '#757575', fill: '#757575' },
    },
    style: { strokeWidth: 2, strokeColor: '#757575' },
  },
  {
    id: 'link2',
    type: 'Orthogonal',
    sourcePoint: { x: 0, y: 0 },
    targetPoint: { x: 40, y: 40 },
    style: { strokeWidth: 2, strokeColor: '#757575' },
    targetDecorator: { shape: 'None' },
  },
  {
    id: 'Link3',
    type: 'Straight',
    sourcePoint: { x: 0, y: 0 },
    targetPoint: { x: 40, y: 40 },
    targetDecorator: {
      shape: 'Arrow',
      style: { strokeColor: '#757575', fill: '#757575' },
    },
    style: { strokeWidth: 2, strokeColor: '#757575' },
  },
  {
    id: 'link4',
    type: 'Straight',
    sourcePoint: { x: 0, y: 0 },
    targetPoint: { x: 40, y: 40 },
    style: { strokeWidth: 2, strokeColor: '#757575' },
    targetDecorator: { shape: 'None' },
  },
  {
    id: 'link5',
    type: 'Bezier',
    sourcePoint: { x: 0, y: 0 },
    targetPoint: { x: 40, y: 40 },
    style: { strokeWidth: 2, strokeColor: '#757575' },
    targetDecorator: { shape: 'None' },
  },
]
const SAMPLE_CSS = `
  .e-upload {
    display: none;
  }

  #palette-icon {
    display: none;
  }

  @media (max-width: 550px) {
      #palette-icon {
          display: inline-flex;
      }
  }
`
export default class Serialization extends SampleBase {
  render(): JSX.Element {
    return (
      <div className="control-pane">
        <style>{SAMPLE_CSS}</style>
        <button
          id="btn"
          aria-label="Btn"
          type="button"
          onClick={() => {
            diagramInstance?.add(createNode(Date(), 100, 100, 'ClassName'))
          }}
          style={{ display: 'none' }}
        />
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
          <div style={{ width: '100%', height: '80%' }}>
            <div id="palette-space" className="sb-mobile-palette">
              <SymbolPaletteComponent
                id="symbolpalette"
                expandMode="Multiple"
                palettes={[
                  {
                    id: 'flow',
                    expanded: true,
                    symbols: flowshapes,
                    iconCss: 'e-diagram-icons1 e-diagram-flow',
                    title: 'Flow Shapes',
                  },
                  {
                    id: 'Bpmn',
                    expanded: true,
                    symbols: bpmnShapes,
                    iconCss: 'e-diagram-icons1 e-diagram-Bpmn',
                    title: 'Bpmn Shapes',
                  },
                  {
                    id: 'connectors',
                    expanded: true,
                    symbols: connectorSymbols,
                    iconCss: 'e-diagram-icons1 e-diagram-connector',
                    title: 'Connectors',
                  },
                  // {
                  //   id: 'bpmnConnectors',
                  //   expanded: true,
                  //   symbols: bpmnConnectors,
                  //   iconCss: 'e-diagram-icons1 e-diagram-connector',
                  //   title: 'BPMN Connectors',
                  // },
                ]} // set default value for Node.
                getNodeDefaults={(symbol: any) => {
                  symbol.style.strokeColor = '#757575'
                  if (
                    symbol.id === 'Terminator' ||
                    symbol.id === 'Process' ||
                    symbol.id === 'Delay'
                  ) {
                    symbol.width = 80
                    symbol.height = 40
                  } else if (
                    symbol.id === 'Decision' ||
                    symbol.id === 'Document' ||
                    symbol.id === 'PreDefinedProcess' ||
                    symbol.id === 'PaperTap' ||
                    symbol.id === 'DirectData' ||
                    symbol.id === 'MultiDocument' ||
                    symbol.id === 'Data'
                  ) {
                    symbol.width = 50
                    symbol.height = 40
                  } else {
                    symbol.width = 50
                    symbol.height = 50
                  }
                }}
                symbolMargin={{ left: 15, right: 15, top: 15, bottom: 15 }}
                getSymbolInfo={(_symbol: any) => {
                  return { fit: true }
                }}
                width="100%"
                height="700px"
                symbolHeight={60}
                symbolWidth={60}
              />
            </div>

            <div id="diagram-space" className="sb-mobile-diagram">
              <DiagramComponent
                id="diagram"
                ref={(diagram) => (diagramInstance = diagram)}
                width="100%"
                height="645px"
                nodes={nodes}
                snapSettings={{
                  horizontalGridlines: gridlines,
                  verticalGridlines: gridlines,
                }}
                connectors={connectors}
                getConnectorDefaults={(args: any, _diagram: any) => {
                  args.targetDecorator.height = 5
                  args.targetDecorator.width = 5
                  args.style.strokeColor = '#797979'
                  args.targetDecorator.style = {
                    fill: '#797979',
                    strokeColor: '#797979',
                  }
                  return args
                }}
                getNodeDefaults={(obj: NodeModel) => {
                  if (obj.shape?.type === 'UmlClassifier') {
                    obj.style = { fill: '#26A0DA', strokeColor: 'white' }
                  }
                  return obj
                }}
                // Sets the Node style for DragEnter element.
                dragEnter={(args) => {
                  const obj = args?.element
                  if (obj instanceof Node) {
                    const ratio = 100 / obj.width
                    obj.width = 100
                    obj.height *= ratio
                  }
                }}
                setNodeTemplate={(node: any) => {
                  if (node.annotations && node.annotations.length > 0) {
                    for (let i = 0; i < node.annotations.length; i++) {
                      const annotation = node.annotations[i]
                      if (annotation && annotation.style) {
                        if (node?.shape?.type === 'Basic') {
                          annotation.style.color = 'white'
                        } else {
                          annotation.style.color = 'black'
                        }
                      }
                    }
                  }
                }}
              />
            </div>
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
      </div>
    )
  }
}
