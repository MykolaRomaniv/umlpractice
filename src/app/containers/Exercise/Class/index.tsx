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

import SampleBase from '../sample-base'
import styles from './styles.module.scss'

let diagramInstance: DiagramComponent | null

// Create a connector.
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const createConnector = (
  id: string,
  sourceID: string,
  targetID: string,
): ConnectorModel => {
  const connector: ConnectorModel = {}
  connector.id = id
  connector.sourceID = sourceID
  connector.targetID = targetID
  return connector
}

const createConnection = (
  id: string,
  relationship: ClassifierShape,
  associationType?: AssociationFlow,
  multiplicityType?: Multiplicity,
): ConnectorModel => ({
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
})

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
  return node
}

const createInterface = (
  id: string,
  offsetX: number,
  offsetY: number,
  name: string,
  style?: TextStyleModel,
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
  return node
}

const createEnumeration = (
  id: string,
  offsetX: number,
  offsetY: number,
  name: string,
  style?: TextStyleModel,
) => {
  const node: NodeModel = {}
  node.id = id
  node.offsetX = offsetX
  node.offsetY = offsetY
  node.shape = {
    type: 'UmlClassifier',
    enumerationShape: {
      name,
      members: [
        createEnumMember('Name', 'Value'),
        { name: 'AAA', value: 'QQQ' },
      ],
      style,
    },
    classifier: 'Enumeration',
  } as UmlClassifierShapeModel
  return node
}

const connectors: ConnectorModel[] = [
  // createConnector('connect1', 'Patient', 'Person'),
]

export default class UMLClassDiagram extends SampleBase {
  // eslint-disable-next-line class-methods-use-this
  rendereComplete() {
    diagramInstance?.fitToPage()
  }

  render() {
    return (
      <div className="control-section">
        <div className={styles.contentWrapper}>
          <div className={styles.palette}>
            <div className={styles.paletteSection}>
              <button
                id="class"
                aria-label="Btn"
                type="button"
                className={styles.btn}
                onClick={() => {
                  diagramInstance?.add(
                    createClass(Date(), 100, 100, 'ClassName'),
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
                    createInterface(Date(), 100, 100, 'InterfaceName'),
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
                    createEnumeration(Date(), 100, 100, 'EnumName'),
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
                  diagramInstance?.add(createConnection(Date(), 'Association'))
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
                  diagramInstance?.add(createConnection(Date(), 'Aggregation'))
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
                  diagramInstance?.add(createConnection(Date(), 'Composition'))
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
                  diagramInstance?.add(createConnection(Date(), 'Dependency'))
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
                  diagramInstance?.add(createConnection(Date(), 'Inheritance'))
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
            connectors={connectors}
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
      </div>
    )
  }
}
