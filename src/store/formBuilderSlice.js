import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";

const initialState = {
  formTitle: "Student Leave Request Form (Sydney Campus)",
  formId: "FID 1234 5668 9869",
  sections: [],
  history: [],
  historyIndex: -1,
  selectedElement: null,
};

const formBuilderSlice = createSlice({
  name: "formBuilder",
  initialState,
  reducers: {
    addSection: (state) => {
      const newSection = {
        id: uuidv4(),
        title: `Section ${state.sections.length + 1}`,
        required: false,
        groups: [],
      };
      state.sections.push(newSection);

      // Add to history
      state.history = state.history.slice(0, state.historyIndex + 1);
      state.history.push(JSON.parse(JSON.stringify(state.sections)));
      state.historyIndex = state.history.length - 1;
    },

    updateSectionTitle: (state, action) => {
      const { sectionId, title } = action.payload;
      const section = state.sections.find((s) => s.id === sectionId);
      if (section) {
        section.title = title;
      }
    },

    removeSection: (state, action) => {
      state.sections = state.sections.filter((s) => s.id !== action.payload);

      // Add to history
      state.history = state.history.slice(0, state.historyIndex + 1);
      state.history.push(JSON.parse(JSON.stringify(state.sections)));
      state.historyIndex = state.history.length - 1;
    },

    addGroup: (state, action) => {
      const { sectionId } = action.payload;
      const section = state.sections.find((s) => s.id === sectionId);
      if (section) {
        const newGroup = {
          id: uuidv4(),
          title: `Group Title ${section.groups.length + 1}`,
          required: false,
          fields: [],
        };
        section.groups.push(newGroup);

        // Add to history
        state.history = state.history.slice(0, state.historyIndex + 1);
        state.history.push(JSON.parse(JSON.stringify(state.sections)));
        state.historyIndex = state.history.length - 1;
      }
    },

    updateGroupTitle: (state, action) => {
      const { sectionId, groupId, title } = action.payload;
      const section = state.sections.find((s) => s.id === sectionId);
      if (section) {
        const group = section.groups.find((g) => g.id === groupId);
        if (group) {
          group.title = title;
        }
      }
    },

    removeGroup: (state, action) => {
      const { sectionId, groupId } = action.payload;
      const section = state.sections.find((s) => s.id === sectionId);
      if (section) {
        section.groups = section.groups.filter((g) => g.id !== groupId);

        // Add to history
        state.history = state.history.slice(0, state.historyIndex + 1);
        state.history.push(JSON.parse(JSON.stringify(state.sections)));
        state.historyIndex = state.history.length - 1;
      }
    },

    addField: (state, action) => {
      const { sectionId, groupId, fieldType } = action.payload;
      console.log("Redux: Adding field", { sectionId, groupId, fieldType });

      const section = state.sections.find((s) => s.id === sectionId);
      if (section) {
        const group = section.groups.find((g) => g.id === groupId);
        if (group) {
          const newField = {
            id: uuidv4(),
            type: fieldType,
            label: getDefaultLabel(fieldType),
            required: false,
            fullWidth: false,
            options:
              fieldType === "checkbox"
                ? ["Mr", "Mrs", "Alhaji", "Dr"]
                : fieldType === "radio"
                ? ["Yes", "No"]
                : fieldType === "select"
                ? ["Option 1", "Option 2"]
                : [],
            placeholder:
              fieldType === "text" || fieldType === "email"
                ? `Enter ${getDefaultLabel(fieldType)}`
                : "",
          };

          group.fields.push(newField);
          console.log(
            "Redux: Field added successfully. Group now has",
            group.fields.length,
            "fields"
          );

          // Add to history
          state.history = state.history.slice(0, state.historyIndex + 1);
          state.history.push(JSON.parse(JSON.stringify(state.sections)));
          state.historyIndex = state.history.length - 1;
        } else {
          console.error("Redux: Group not found", groupId);
        }
      } else {
        console.error("Redux: Section not found", sectionId);
      }
    },

    updateField: (state, action) => {
      const { sectionId, groupId, fieldId, updates } = action.payload;
      const section = state.sections.find((s) => s.id === sectionId);
      if (section) {
        const group = section.groups.find((g) => g.id === groupId);
        if (group) {
          const field = group.fields.find((f) => f.id === fieldId);
          if (field) {
            Object.assign(field, updates);
          }
        }
      }
    },

    removeField: (state, action) => {
      const { sectionId, groupId, fieldId } = action.payload;
      const section = state.sections.find((s) => s.id === sectionId);
      if (section) {
        const group = section.groups.find((g) => g.id === groupId);
        if (group) {
          group.fields = group.fields.filter((f) => f.id !== fieldId);

          // Add to history
          state.history = state.history.slice(0, state.historyIndex + 1);
          state.history.push(JSON.parse(JSON.stringify(state.sections)));
          state.historyIndex = state.history.length - 1;
        }
      }
    },

    reorderFields: (state, action) => {
      const { sectionId, groupId, oldIndex, newIndex } = action.payload;
      const section = state.sections.find((s) => s.id === sectionId);
      if (section) {
        const group = section.groups.find((g) => g.id === groupId);
        if (group) {
          const [removed] = group.fields.splice(oldIndex, 1);
          group.fields.splice(newIndex, 0, removed);
        }
      }
    },

    setSelectedElement: (state, action) => {
      state.selectedElement = action.payload;
    },

    undo: (state) => {
      if (state.historyIndex > 0) {
        state.historyIndex -= 1;
        state.sections = JSON.parse(
          JSON.stringify(state.history[state.historyIndex])
        );
      }
    },

    redo: (state) => {
      if (state.historyIndex < state.history.length - 1) {
        state.historyIndex += 1;
        state.sections = JSON.parse(
          JSON.stringify(state.history[state.historyIndex])
        );
      }
    },

    saveToLocalStorage: (state) => {
      localStorage.setItem(
        "paxform-builder",
        JSON.stringify({
          formTitle: state.formTitle,
          formId: state.formId,
          sections: state.sections,
        })
      );
    },

    loadFromLocalStorage: (state) => {
      const saved = localStorage.getItem("paxform-builder");
      if (saved) {
        const data = JSON.parse(saved);
        state.formTitle = data.formTitle || state.formTitle;
        state.formId = data.formId || state.formId;
        state.sections = data.sections || [];
      }
    },
  },
});

function getDefaultLabel(fieldType) {
  switch (fieldType) {
    case "text":
      return "Text Input";
    case "email":
      return "Email Address";
    case "radio":
      return "Do you have residency?";
    case "checkbox":
      return "Salutation";
    case "file":
      return "Photo";
    case "select":
      return "Select Option";
    default:
      return "Field";
  }
}

export const {
  addSection,
  updateSectionTitle,
  removeSection,
  addGroup,
  updateGroupTitle,
  removeGroup,
  addField,
  updateField,
  removeField,
  reorderFields,
  setSelectedElement,
  undo,
  redo,
  saveToLocalStorage,
  loadFromLocalStorage,
} = formBuilderSlice.actions;

export default formBuilderSlice.reducer;
