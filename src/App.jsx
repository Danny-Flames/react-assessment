import React from 'react';
import { Provider } from 'react-redux';
import { ConfigProvider } from 'antd';
import { DndContext, DragOverlay, closestCenter } from '@dnd-kit/core';
import { store } from './store/store';
import FormBuilder from './components/FormBuilder/FormBuilder';
import './App.css';

const theme = {
  token: {
    colorPrimary: '#035F5B',
    borderRadius: 6,
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
  },
};

function App() {
  return (
    <Provider store={store}>
      <ConfigProvider theme={theme}>
        <div className="app">
          <FormBuilder />
        </div>
      </ConfigProvider>
    </Provider>
  );
}

export default App;