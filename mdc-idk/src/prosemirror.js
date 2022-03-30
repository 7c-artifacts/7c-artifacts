import { EditorState, TextSelection } from "prosemirror-state"
import { EditorView } from "prosemirror-view"
import { Schema, DOMParser, DOMSerializer } from "prosemirror-model"
import { schema } from "./schema"
import { addListNodes } from "prosemirror-schema-list"
import { exampleSetup } from "./customSetup"

if (document.querySelector("#editor")) {
  // Mix the nodes from prosemirror-schema-list into the basic schema to
  // create a schema with list support.
  const mySchema = new Schema({
    nodes: addListNodes(schema.spec.nodes, "paragraph block*", "block"),
    marks: schema.spec.marks
  })

  window.view = new EditorView(document.querySelector("#editor"), {
    state: EditorState.create({
      doc: DOMParser.fromSchema(mySchema).parse(document.querySelector("#content")),
      plugins: exampleSetup({ schema: mySchema })
    })
  })
}